import { clonePrototypeFunctionsAndBindToInstance } from './fixedPrototype';

const customDocument = {
    get readyState() {
        return document.readyState;
    },
    get pointerLockElement() {
        return document.pointerLockElement;
    },
};

// This one contains all the function on document
// const DocumentPrototype = Object.getPrototypeOf(Object.getPrototypeOf(document));

clonePrototypeFunctionsAndBindToInstance(
    customDocument as any,
    Object.getPrototypeOf(Object.getPrototypeOf(document)),
    document
);
clonePrototypeFunctionsAndBindToInstance(
    customDocument as any,
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(document))),
    document
);
clonePrototypeFunctionsAndBindToInstance(
    customDocument as any,
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(document)))),
    document
);

export default customDocument;
