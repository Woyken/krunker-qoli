function clonePrototype<T>(origPrototype: T) {
    const proto = origPrototype;
    const clone = Object.create(null);
    const props = Object.getOwnPropertyNames(proto);
    for (let i = 0; i < props.length; i += 1) {
        const value = Object.getOwnPropertyDescriptor(proto, props[i]);
        if (value) Object.defineProperty(clone, props[i], value);
    }
    Object.freeze(clone);

    return clone as T;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function hasPrototype(param: unknown): param is { prototype: Record<string, Function> } {
    if (param && (typeof param === 'function' || typeof param === 'object') && 'prototype' in param) return true;
    return false;
}

export default function spreadObjectAndBindFunctions<T extends Record<number, unknown>>(obj: T) {
    const res = {
        ...obj,
        prototype: {},
    };
    if (hasPrototype(obj)) res.prototype = clonePrototype(obj.prototype);
    Object.keys(res).forEach((key: any) => {
        const prop = res[key] as unknown;
        if (typeof prop === 'function') res[key] = prop.bind(window);
    });
    return res;
}
