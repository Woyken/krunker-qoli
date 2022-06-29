/* eslint-disable no-console */
const logsEnabled = true;

class ScopedLogger {
    private argsScope: unknown[];

    constructor(...argsScope: unknown[]) {
        this.argsScope = argsScope;
    }

    createScopedLogger(...argsScope: unknown[]) {
        return new ScopedLogger(...this.argsScope, ...argsScope);
    }

    log(...args: unknown[]) {
        if (logsEnabled) console.log(...this.argsScope, ...args);
    }
}

export default function createScopedLogger(...argsScope: unknown[]) {
    return new ScopedLogger('[Krunker Qoli]', ...argsScope);
}
