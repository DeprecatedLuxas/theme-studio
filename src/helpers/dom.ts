export function createDOMElement<K extends keyof HTMLElementTagNameMap>(
  id: string,
  ele: K
): HTMLElementTagNameMap[K] {
  const element = document.createElement(ele);
  element.setAttribute("id", id);
  return element;
}

