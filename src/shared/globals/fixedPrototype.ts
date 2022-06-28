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

export default function clonePrototype<T>(obj: { prototype: T }, origPrototype: T) {
    const proto = origPrototype;
    const props = Object.getOwnPropertyNames(proto);
    for (let i = 0; i < props.length; i += 1) {
        const value = Object.getOwnPropertyDescriptor(proto, props[i]);
        if (value) Object.defineProperty(obj.prototype, props[i], value);
    }
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
