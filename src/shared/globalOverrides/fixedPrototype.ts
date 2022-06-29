/* eslint-disable @typescript-eslint/no-explicit-any */
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
            const descriptor: PropertyDescriptor = { ...value };
            if (value.get) descriptor.get = value.get.bind(origThis);
            if (value.set) descriptor.set = value.set.bind(origThis);
            if (typeof value.value === 'function') descriptor.value = value.value.bind(origThis);
            if (descriptor.get || descriptor.set || descriptor.value)
                Object.defineProperty(copyObj, props[i], descriptor);
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
    const props = Object.getOwnPropertyNames(obj).filter((p) => !['prototype'].includes(p));
    for (let i = 0; i < props.length; i += 1) {
        const value = Object.getOwnPropertyDescriptor(obj, props[i]);
        if (value) {
            const descriptor: PropertyDescriptor = { ...value };
            if (value.get) descriptor.get = value.get.bind(obj);
            if (value.set) descriptor.set = value.set.bind(obj);
            if (typeof value.value === 'function') descriptor.value = value.value.bind(obj);
            if (descriptor.get || descriptor.set || descriptor.value)
                Object.defineProperty(copyObj, props[i], descriptor);
        }
    }
}

const mixinClassFactory = (superclass: any, customPrototype: any) =>
    class extends superclass {
        constructor(...items: unknown[]) {
            super(...items);
            Object.setPrototypeOf(this, customPrototype);
        }
    };

export function createExtendedClassCopyPrototypesAndBindOwned<Y, T extends { prototype: Y }>(nativeType: T): T {
    const CustomNativeWrapper = mixinClassFactory(nativeType, getClonedPrototype(nativeType.prototype));
    defineAndBindFunctionsFrom(CustomNativeWrapper as unknown, nativeType);
    return CustomNativeWrapper as any;
}
