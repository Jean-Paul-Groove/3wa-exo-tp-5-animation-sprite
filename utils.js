export async function loadImage(url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
  });
}
