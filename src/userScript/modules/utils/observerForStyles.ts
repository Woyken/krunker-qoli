function createMutationObserverForStyles(styleChangedCallback: (style: CSSStyleDeclaration) => void) {
    return new MutationObserver((mutationList) => {
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
