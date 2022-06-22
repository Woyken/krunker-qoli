const localDocument = {
    getElementById: document.getElementById.bind(document),
    getElementsByClassName: document.getElementsByClassName.bind(document),
    getElementsByTagName: document.getElementsByTagName.bind(document),
    addEventListener: document.addEventListener.bind(document),
    removeEventListener: document.removeEventListener.bind(document),
    createEvent: document.createEvent.bind(document),
};

export default localDocument;
