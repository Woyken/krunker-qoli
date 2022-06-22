// eslint-disable-next-line import/prefer-default-export
export function createFunctionProxy<T extends (...arg: never[]) => unknown>(originalTarget: T, beforeCallback?: (...param: Parameters<T>) => void, afterCallback?: (...param: Parameters<T>) => void) {
    return new Proxy(originalTarget, {
        apply(target, thisArg, argArray: Parameters<T>) {
            beforeCallback?.(...argArray);
            const result = target.apply(thisArg, argArray);
            afterCallback?.(...argArray);
            return result;
        },
    });
}
