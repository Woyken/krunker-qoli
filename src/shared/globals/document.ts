import { fixedPrototype2 } from './fixedPrototype';

const customDocument = {
    get readyState() {
        return document.readyState;
    },
    get pointerLockElement() {
        return document.pointerLockElement;
    },
    // getElementById: document.getElementById.bind(document),
    // getElementsByClassName: document.getElementsByClassName.bind(document),
    // getElementsByTagName: document.getElementsByTagName.bind(document),
    // addEventListener: document.addEventListener.bind(document),
    // removeEventListener: document.removeEventListener.bind(document),
    // createEvent: document.createEvent.bind(document),
    // hasFocus: document.hasFocus.bind(document),
};

// This one contains all the function on document
// const DocumentPrototype = Object.getPrototypeOf(Object.getPrototypeOf(document));

fixedPrototype2(customDocument as any, Object.getPrototypeOf(Object.getPrototypeOf(document)), document);
fixedPrototype2(
    customDocument as any,
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(document))),
    document
);
fixedPrototype2(
    customDocument as any,
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(document)))),
    document
);

export default customDocument;
