const customWindow = {
    open: window.open.bind(window),
    addEventListener: window.addEventListener.bind(window),
    removeEventListener: window.removeEventListener.bind(window),
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),
    opener: window.opener,
    location: {
        get href(): string {
            return window.location.href;
        },
        set href(value: string) {
            window.location.href = value;
        },
        assign: window.location.assign.bind(window.location),
        reload: window.location.reload.bind(window.location),
        replace: window.location.replace.bind(window.location),
        toString: window.location.toString.bind(window.location),
    },
};

export default customWindow;
