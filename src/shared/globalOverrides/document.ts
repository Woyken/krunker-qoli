import { clonePrototypesFunctionsAndBindToInstanceTree } from './fixedPrototype';

const customDocument = {
    get readyState() {
        return document.readyState;
    },
    get pointerLockElement() {
        return document.pointerLockElement;
    },
};

clonePrototypesFunctionsAndBindToInstanceTree(customDocument as any, document, document);

export default customDocument;
