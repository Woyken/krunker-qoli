import Typography from '@suid/material/Typography';
import { useNavigate, useSearchParams } from 'solid-app-router';
import { type Accessor, createEffect, createSignal, onCleanup, For } from 'solid-js';
import localWindow from '../../../userScript/utils/localWindowCopy';
import createScopedLogger from '../../../userScript/utils/logger';
import SettingsList from '../userScriptSettings/settingsList';
import useOnBeforeUnloadCloseWindows from './useOnBeforeUnloadCloseWindows';
import useRemoveClosedWindows from './useRemoveClosedWindows';

const logger = createScopedLogger('[WindowManagerPage]');

export interface SavedManagedWindow {
    wnd: Window;
    openedUrl: string;
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
    console.log('currentKrunkerUrl', currentKrunkerUrl);
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
        // eslint-disable-next-line no-console
        console.log('broadcast received', e.data);
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
        logger.log('onOpenKrunker', managedWindows());
        const firstWnd = managedWindows()[0];
        if (firstWnd) {
            logger.log('onOpenKrunker firstWnd', firstWnd);
            firstWnd.wnd.location.href = krunkerUrl;
            firstWnd.wnd.focus();
            return;
        }
        logger.log('before onOpenKrunker open called');
        const wnd = localWindow.open(krunkerUrl, 'krunker', `width=${window.innerWidth},height=${window.innerHeight}`);
        if (isCleanedUp) {
            // TODO wow, this is surprising. While window is being opened, broadcast message can be received, and looks like current thread is paused until broadcast message is handled
            wnd?.close();
            return;
        }
        logger.log('onOpenKrunker opened', wnd);
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
            <For each={managedWindows()}>
                {(managedWindow) => (
                    <Typography variant="body2" component="div" onclick={() => managedWindow.wnd.focus()}>
                        {managedWindow.openedUrl}
                    </Typography>
                )}
            </For>
        </>
    );
}
