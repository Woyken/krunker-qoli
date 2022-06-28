import { clonePrototypesFunctionsAndBindToInstanceTree } from './fixedPrototype';

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

export default customWindow;
