import { createEffect } from 'solid-js';
import isOpenedInChildWindow from '../../shared/hooks/isOpenedInChildWindow';

export default function useOpenInNewWindow() {
    createEffect(() => {
        if (!isOpenedInChildWindow()) {
            // TODO
            // idea:
            // if not in new window
            // redirect to my custom page with hash containing encoded Krunker url
            // Broadcast message "new window just opened" with this Krunker url to hopefully hit a "master page"
            // Wait for response a little bit
            // If received "consumed" message from "master page" just close current window. (redirect to about:blank) or show some blank page saying to close this tab
            // If don't receive message, treat yourself as a "master page" and track broadcasts
            // If you receive "new window just opened" immediately post message back "consumed" to indicate that the page that just sent it can safely close
            //     After that make current handled opened window redirect to url in that message
            // call gameWindow.focus() after each redirect
            //
            //
            //
            // Investigation:
            // From my testing BroadcastChannel message sending back and forth takes 1-4ms. So timeout of 100ms would be plenty of time (at least in firefox)
            // TODO test with chrome, https://stackoverflow.com/questions/59940161/is-javascripts-broadcast-channel-limited-to-one-received-message-per-second
        }
    });
}
