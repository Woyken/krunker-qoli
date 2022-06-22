const localWindow = {
    open: window.open.bind(window),
    addEventListener: window.addEventListener.bind(window),
    removeEventListener: window.removeEventListener.bind(window),
};
export default localWindow;
