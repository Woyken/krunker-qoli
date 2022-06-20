const localMutationObserver = MutationObserver;

export function createMutationObserverForStyles(
  styleChangedCallback: (style: CSSStyleDeclaration) => void
) {
  return new localMutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style"
      ) {
        styleChangedCallback((mutation.target as any).style);
      }
    }
  });
}

export function createMutationObserverForStylesIfDisplayBlock(
  callback: (isDisplayBlock: boolean) => void
) {
  return createMutationObserverForStyles((style) => {
    const isDisplayBlock = style.display === "block";
    callback(isDisplayBlock);
  });
}

export const styleObserveConfig = {
  attributes: true,
  attributeFilter: ["style"],
};
