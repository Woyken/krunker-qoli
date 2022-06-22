class LocalMutationObserver extends MutationObserver {
    observe = MutationObserver.prototype.observe;
}

function createMutationObserverForStyles(styleChangedCallback: (style: CSSStyleDeclaration) => void) {
    return new LocalMutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                styleChangedCallback((mutation.target as HTMLElement).style);
            }
        });
    });
}

export function createMutationObserverForStylesIfDisplayBlock(callback: (isDisplayBlock: boolean) => void) {
    return createMutationObserverForStyles((style) => {
        const isDisplayBlock = style.display === 'block';
        callback(isDisplayBlock);
    });
}

export const styleObserveConfig = {
    attributes: true,
    attributeFilter: ['style'],
};
