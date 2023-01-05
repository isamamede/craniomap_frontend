import Canvas, { Image } from "react-native-canvas";

export default async function loadImage(
  uri: string,
  canvas: Canvas
): Promise<Image> {
  const i = new Image(canvas);
  i.src = uri;

  return await new Promise((r) => {
    i.addEventListener("load", () => {
      r(i);
    });
  });
}
