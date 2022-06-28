function fixedPrototype2<T>(copyObj: any, origPrototype: T, origThis: any) {
    const proto = origPrototype;
    const props = Object.getOwnPropertyNames(proto);
    for (let i = 0; i < props.length; i += 1) {
        const value = Object.getOwnPropertyDescriptor(proto, props[i]);
        if (value) {
            if (typeof value.value === 'function') {
                Object.defineProperty(copyObj, props[i], {
                    ...value,
                    value: value.value.bind(origThis),
                });
            } else {
                Object.defineProperty(copyObj, props[i], value);
            }
        }
    }
}

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

fixedPrototype2(customDocument, Object.getPrototypeOf(Object.getPrototypeOf(document)), document);

export default customDocument;
