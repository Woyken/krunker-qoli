function panicLateInjection() {
    // eslint-disable-next-line no-alert
    window.alert(`[Krunker Qoli] Script was injected too late, please use "instant inject" option`);
    // eslint-disable-next-line no-throw-literal
    throw `Script injected too late, don't want to risk alarming anticheat`;
}

if (document.getElementsByTagName('script').length > 0) panicLateInjection();

export {};
