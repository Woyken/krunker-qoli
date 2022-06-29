import createScopedLogger from './logger';

const localFunctionApplyApply = Function.prototype.apply.apply.bind(Function.prototype.apply as any);

function isErrorWithStack(param: unknown): param is { stack: string } {
    if (typeof param !== 'object') return false;
    if (param == null) return false;
    return 'stack' in param;
}

// eslint-disable-next-line import/prefer-default-export
export function createFunctionProxy<T extends (...arg: never[]) => unknown>(
    originalTarget: T,
    beforeCallback?: (...param: Parameters<T>) => void,
    afterCallback?: (result: ReturnType<T>, ...param: Parameters<T>) => void
) {
    const logger = createScopedLogger('[createFunctionProxy]', originalTarget, beforeCallback, afterCallback);
    logger.log('creating function proxy');
    return new Proxy(originalTarget, {
        apply(target, thisArg, argArray: Parameters<T>) {
            const funcLogger = logger.createScopedLogger('[apply]', target, thisArg, argArray);
            try {
                beforeCallback?.(...argArray);
            } catch (error) {
                funcLogger.log('beforeCallback error', error);
            }
            let result: ReturnType<T>;
            try {
                result = localFunctionApplyApply(target, [thisArg, argArray]) as ReturnType<T>;
            } catch (e) {
                funcLogger.log('EXCEPTION', e);
                // Remove this function from call stack
                if (isErrorWithStack(e)) {
                    if (e.stack.includes('Object.apply')) {
                        // Probably chrome
                        // Remove first Object.apply, this is this function
                        e.stack = e.stack.replace(/\n.*Object\.apply.*/, '');
                    } else if (e.stack.includes('apply@')) {
                        // Probably firefox
                        // Remove first apply@
                        e.stack = e.stack.replace(/.*apply@.*\n/, '');
                    }
                }
                funcLogger.log('EXCEPTION before rethrow', e);
                throw e;
            }
            try {
                afterCallback?.(result, ...argArray);
            } catch (error) {
                funcLogger.log('afterCallback error', error);
            }
            return result;
        },
    });
}
