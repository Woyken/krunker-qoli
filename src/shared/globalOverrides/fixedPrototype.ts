export function clonePrototypeFunctionsAndBindToInstance<P, T extends { prototype: P }>(
    copyObj: T,
    origPrototype: P,
    origThis: T
) {
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
                // ignore other fields, better leave them undefined
            }
        }
    }
}

export function clonePrototypesFunctionsAndBindToInstanceTree<P, T extends { prototype: P }>(
    copyObj: T,
    objToGetPrototypesOf: T,
    origThis: T
) {
    let currentPrototype = Object.getPrototypeOf(objToGetPrototypesOf);
    while (currentPrototype != null) {
        clonePrototypeFunctionsAndBindToInstance(copyObj, currentPrototype, origThis);
        currentPrototype = Object.getPrototypeOf(currentPrototype);
    }
}

const existingPrototypes: Map<unknown, unknown> = new Map();

export function getClonedPrototype(existingPrototype: unknown) {
    if (existingPrototypes.has(existingPrototype)) return existingPrototypes.get(existingPrototype);

    const existingPrototypeChild = Object.getPrototypeOf(existingPrototype);
    let clone: any;
    if (existingPrototypeChild) {
        clone = Object.create(getClonedPrototype(existingPrototypeChild));
    } else {
        clone = Object.create(null);
    }
    Object.defineProperties(clone, Object.getOwnPropertyDescriptors(existingPrototype));
    existingPrototypes.set(existingPrototype, clone);
    return clone;
}

export function defineAndBindFunctionsFrom<T>(copyObj: T, obj: T) {
    const props = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < props.length; i += 1) {
        const value = Object.getOwnPropertyDescriptor(obj, props[i]);
        if (value) {
            if (typeof value.value === 'function') {
                Object.defineProperty(copyObj, props[i], {
                    ...value,
                    value: value.value.bind(obj),
                });
            } else {
                // ignore other fields, better leave them undefined
            }
        }
    }
}
