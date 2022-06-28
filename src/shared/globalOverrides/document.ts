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
// HTMLDocumentPrototype = Object.getPrototypeOf(document);
// DocumentPrototype = Object.getPrototypeOf(HTMLDocumentPrototype);
// NodePrototype = Object.getPrototypeOf(DocumentPrototype);
// EventTargetPrototype = Object.getPrototypeOf(NodePrototype);

// document specific methods, like getElementById
clonePrototypeFunctionsAndBindToInstance(
    customDocument as any,
    Object.getPrototypeOf(Object.getPrototypeOf(document)),
    document
);
// node specific methods, like appendChild
clonePrototypeFunctionsAndBindToInstance(
    customDocument as any,
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(document))),
    document
);
//
clonePrototypeFunctionsAndBindToInstance(
    customDocument as any,
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(document)))),
    document
);

export default customDocument;
