export const loadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const tmpImageElement = document.createElement('img');
    tmpImageElement.src = src;
    tmpImageElement.onload = resolve;
    tmpImageElement.onerror = reject;
  });
