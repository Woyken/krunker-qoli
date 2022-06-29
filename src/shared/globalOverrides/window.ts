/* eslint-disable @typescript-eslint/no-explicit-any */
import { clonePrototypesFunctionsAndBindToInstanceTree, defineAndBindFunctionsFrom } from './fixedPrototype';

const customWindow = {
    opener: window.opener,
    location: {
        get href(): string {
            return window.location.href;
        },
        set href(value: string) {
            window.location.href = value;
        },
    },
};

clonePrototypesFunctionsAndBindToInstanceTree(customWindow as any, window, window);
clonePrototypesFunctionsAndBindToInstanceTree(customWindow.location as any, window.location, window.location);
defineAndBindFunctionsFrom(customWindow.location, window.location);
defineAndBindFunctionsFrom(customWindow, window);

export default customWindow;
