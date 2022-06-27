import Typography from '@suid/material/Typography';
import { useNavigate, useSearchParams } from 'solid-app-router';
import { type Accessor, createEffect, createSignal, onCleanup, For } from 'solid-js';
import localWindow from '../../../userScript/utils/localWindowCopy';
import SettingsList from '../userScriptSettings/settingsList';
import { useExposeSettingsCommunication } from '../userScriptSettings/settingsWindowsInCommunication';
import useOnBeforeUnloadCloseWindows from './useOnBeforeUnloadCloseWindows';
import { useRemoveClosedWindows } from './useRemoveClosedWindows';

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
    const [windowsWithComm, setWindowsWithComm] = createSignal<SavedManagedWindowWithCommunication[]>([]);
    createEffect(() => {
        const newWindows = windows().filter((w) => !windowsWithComm().find((wc) => wc.wnd === w.wnd));
        const removedWindows = windowsWithComm().filter((wc) => !windows().find((w) => w.wnd === wc.wnd));
        removedWindows.forEach((w) => w.exposedCommunication.unsubscribeAll());
        if (newWindows.length === 0 && removedWindows.length === 0) return;
        const existingWindows = windowsWithComm().filter((wc) => !windows().find((w) => w.wnd === wc.wnd));
        const newWindowsWithComm = newWindows.map<SavedManagedWindowWithCommunication>((w) => ({
            ...w,
            exposedCommunication: useExposeSettingsForSavedManagedWindow(w),
        }));
        setWindowsWithComm([...existingWindows, ...newWindowsWithComm]);
    });

    return windowsWithComm;
}

function useBroadcastWindowManager() {
    const [searchParams, setSearchParams] = useSearchParams<WindowManagerPageRouteParams>();
    const currentKrunkerUrl = searchParams.redirectKrunkerUrl;
    setSearchParams({ redirectKrunkerUrl: undefined });
    const [isManager, setIsManager] = createSignal(true);
    const ret: {
        onOpenKrunker?: (url: string) => void;
        isManager: Accessor<boolean>;
    } = {
        onOpenKrunker: undefined,
        isManager,
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
        switch (e.data.type) {
            case 'new window opened': {
                // TODO consume target, focus existing window, redirect existing or create new window to e.data.krunkerUrl;
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
                // TODO consume this window.
                setIsManager(false);
                // alert('aaaaaaaaaaaaaaa this should be removed');
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
    const navigate = useNavigate();
    const manager = useBroadcastWindowManager();
    const [managedWindows, setManagedWindows] = createSignal<SavedManagedWindow[]>([]);
    useRemoveClosedWindows(managedWindows, setManagedWindows);
    useOnBeforeUnloadCloseWindows(managedWindows);
    const managedWindowsWithComm = useExposeSettingsForSavedManagedWindowsWithComm(managedWindows);
    let isCleanedUp = false;
    onCleanup(() => {
        isCleanedUp = true;
    });

    createEffect(() => {
        if (manager.isManager()) return;
        navigate('/closeThisWindow', { replace: true });
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
        manager.onOpenKrunker = undefined;
    });

    return (
        <>
            <Typography variant="h2" component="div" gutterBottom>
                Krunker Qoli window manager
            </Typography>
            <Typography variant="h4" component="div" gutterBottom>
                Settings
            </Typography>
            <SettingsList />
            <Typography variant="body1" component="div" gutterBottom>
                TODO Display list of connected Krunker windows Provide settings fetching API for all of them
            </Typography>
            <For each={managedWindowsWithComm()}>
                {(managedWindow) => (
                    <Typography variant="body2" component="div" onclick={() => managedWindow.wnd.focus()}>
                        {managedWindow.openedUrl} ({managedWindow.exposedCommunication.communicatorState()})
                    </Typography>
                )}
            </For>
        </>
    );
}
