import Button from '@suid/material/Button';
import Typography from '@suid/material/Typography';
import { useNavigate, useSearchParams } from 'solid-app-router';
import { type Accessor, createEffect, createSignal, onCleanup, For, Show } from 'solid-js';
import localWindow from '../../../userScript/utils/localWindowCopy';
import createScopedLogger from '../../../userScript/utils/logger';
import SettingsList from '../userScriptSettings/settingsList';
import { useExposeSettingsCommunication } from '../userScriptSettings/settingsWindowsInCommunication';
import useOnBeforeUnloadCloseWindows from './useOnBeforeUnloadCloseWindows';
import { useRemoveClosedWindows } from './useRemoveClosedWindows';

const logger = createScopedLogger('[WindowManagerPage]');

export interface SavedManagedWindow {
    wnd: Window;
    openedUrl: string;
}

interface SavedManagedWindowWithCommunication extends SavedManagedWindow {
    exposedCommunication: ReturnType<typeof useExposeSettingsCommunication>;
}

type BroadcastWindowManagerMessage =
    | {
          type: 'new window opened';
          krunkerUrl: string;
          sourceWindowId: string;
      }
    | {
          type: 'new window consume';
          targetWindowId: string;
      };

const currentWindowId = `${window.location.href}*${Math.random()}`;

// http://localhost:3000/krunker-qoli/#/windowManager?redirectKrunkerUrl=https://google.com
type WindowManagerPageRouteParams = {
    redirectKrunkerUrl?: string;
};

function useExposeSettingsForSavedManagedWindow(savedManagedWindow: SavedManagedWindow) {
    const exposedCommunication = useExposeSettingsCommunication(savedManagedWindow.wnd);
    return exposedCommunication;
}

function useExposeSettingsForSavedManagedWindowsWithComm(windows: Accessor<SavedManagedWindow[]>) {
    let currentSavedManagedWindowsWithCommunication: SavedManagedWindowWithCommunication[] = [];
    const [windowsWithComm, setWindowsWithComm] = createSignal<SavedManagedWindowWithCommunication[]>([]);
    createEffect(() => {
        logger.log('useExposeSettingsForSavedManagedWindowsWithComm effect', windows());

        const newWindows = windows().filter(
            (w) => !currentSavedManagedWindowsWithCommunication.find((wc) => wc.wnd === w.wnd)
        );
        const removedWindows = currentSavedManagedWindowsWithCommunication.filter(
            (wc) => !windows().find((w) => w.wnd === wc.wnd)
        );
        removedWindows.forEach((w) => w.exposedCommunication.unsubscribeAll());
        if (newWindows.length === 0 && removedWindows.length === 0) return;
        const existingWindows = currentSavedManagedWindowsWithCommunication.filter(
            (wc) => !windows().find((w) => w.wnd === wc.wnd)
        );
        logger.log('newWindows', newWindows, 'removedWindows', removedWindows, 'existingWindows', existingWindows);
        if (
            existingWindows.length < currentSavedManagedWindowsWithCommunication.length ||
            newWindows.length > 0 ||
            removedWindows.length > 0
        ) {
            const existingWithRemoved = existingWindows
                .filter((e) => !removedWindows.some((r) => r.wnd === e.wnd))
                .map((w) => ({
                    ...w,
                    exposedCommunication: useExposeSettingsForSavedManagedWindow(w),
                }));
            const newWindowsWithComm = newWindows.map<SavedManagedWindowWithCommunication>((w) => ({
                ...w,
                exposedCommunication: useExposeSettingsForSavedManagedWindow(w),
            }));
            currentSavedManagedWindowsWithCommunication = [...existingWithRemoved, ...newWindowsWithComm];
            setWindowsWithComm(currentSavedManagedWindowsWithCommunication);
        }
    });

    return windowsWithComm;
}

function useBroadcastWindowManager() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams<WindowManagerPageRouteParams>();
    const currentKrunkerUrl = searchParams.redirectKrunkerUrl;
    setSearchParams({ redirectKrunkerUrl: undefined });
    const ret: {
        onOpenKrunker?: (url: string) => void;
    } = {
        onOpenKrunker: undefined,
    };

    const broadcast = new BroadcastChannel('window manager');
    onCleanup(broadcast.close.bind(broadcast));

    // eslint-disable-next-line no-console
    if (currentKrunkerUrl) {
        const newWindowMessage: BroadcastWindowManagerMessage = {
            type: 'new window opened',
            sourceWindowId: currentWindowId,
            krunkerUrl: currentKrunkerUrl,
        };
        broadcast.postMessage(newWindowMessage);

        Promise.resolve().then(() => {
            ret.onOpenKrunker?.(currentKrunkerUrl);
        });
    }

    function handleMessage(e: MessageEvent<BroadcastWindowManagerMessage>) {
        logger.log('handleMessage', e);
        switch (e.data.type) {
            case 'new window opened': {
                // this callback will be defined in parent scope
                ret.onOpenKrunker?.(e.data.krunkerUrl);

                const message: BroadcastWindowManagerMessage = {
                    type: 'new window consume',
                    targetWindowId: e.data.sourceWindowId,
                };
                broadcast.postMessage(message);
                break;
            }
            case 'new window consume': {
                if (e.data.targetWindowId !== currentWindowId) break;
                navigate('/closeThisWindow', { replace: true });
                break;
            }
            default:
                break;
        }
    }
    broadcast.addEventListener('message', handleMessage);
    onCleanup(() => broadcast.removeEventListener('message', handleMessage));
    return ret;
}

// Potential redirection page, or promotes itself to manager
// Start listening for other window messages
export default function WindowManagerPage() {
    const manager = useBroadcastWindowManager();
    const [managedWindows, setManagedWindows] = createSignal<SavedManagedWindow[]>([]);
    useRemoveClosedWindows(managedWindows, setManagedWindows);
    useOnBeforeUnloadCloseWindows(managedWindows);
    const managedWindowsWithComm = useExposeSettingsForSavedManagedWindowsWithComm(managedWindows);
    let isCleanedUp = false;
    onCleanup(() => {
        isCleanedUp = true;
    });

    // eslint-disable-next-line solid/reactivity
    manager.onOpenKrunker = (krunkerUrl) => {
        const firstWnd = managedWindows()[0];
        if (firstWnd) {
            firstWnd.wnd.location.href = krunkerUrl;
            firstWnd.wnd.focus();
            return;
        }
        const wnd = localWindow.open(krunkerUrl, 'krunker', `width=${window.innerWidth},height=${window.innerHeight}`);
        if (isCleanedUp) {
            // wow, this is surprising. While window is being opened, broadcast message can be received, and looks like current thread is paused until broadcast message is handled
            wnd?.close();
            return;
        }
        if (!wnd) throw alert('Enable popups for this to work!');
        setManagedWindows([...managedWindows(), { wnd, openedUrl: krunkerUrl }]);
    };
    onCleanup(() => {
        logger.log('onCleanup, onOpenKrunker = undefined');
        manager.onOpenKrunker = undefined;
    });

    function handleOpenKrunker() {
        manager.onOpenKrunker?.('https://krunker.io/');
    }

    return (
        <>
            <Typography variant="h2" component="div" gutterBottom>
                Krunker Qoli window manager
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
                Settings
            </Typography>
            <SettingsList />
            <Typography variant="h4" component="div" gutterBottom>
                Running Krunker instances
            </Typography>
            <For each={managedWindowsWithComm()}>
                {(managedWindow) => (
                    <Button onclick={() => managedWindow.wnd.focus()}>
                        {managedWindow.exposedCommunication.krunkerUrl()} (
                        {managedWindow.exposedCommunication.communicatorState()})
                    </Button>
                )}
            </For>
            <Show when={managedWindowsWithComm().length === 0}>
                <Button onclick={handleOpenKrunker}>Open Krunker</Button>
            </Show>
        </>
    );
}
