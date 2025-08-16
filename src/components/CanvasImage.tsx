import React, { forwardRef, useEffect, useImperativeHandle } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Canvas, { CanvasRenderingContext2D, Image } from "react-native-canvas";
import { imgDimensions } from "../constants/image";

type TCanvasImageHandle = {
  reset: (cb?: () => void) => Promise<void>;
};

type TProps = {
  img_url: string;
  onDraw: (ctx: CanvasRenderingContext2D) => void;
  canvasRef: React.RefObject<Canvas | null>;
  setUrl?: React.Dispatch<React.SetStateAction<string>>;
};

const CanvasImage = forwardRef<TCanvasImageHandle, TProps>(
  ({ img_url, onDraw, canvasRef, setUrl }, ref) => {
    const reset = async (cb?: () => void) => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = imgDimensions.width;
        canvas.height = imgDimensions.height;
        const canvasImg = new Image(canvas);
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, imgDimensions.width, imgDimensions.height);
        canvasImg.src = img_url;
        canvasImg.crossOrigin = "anonymous";
        canvasImg.addEventListener("load", async () => {
          context.drawImage(
            canvasImg,
            0,
            0,
            imgDimensions.width,
            imgDimensions.height
          );
          context.save();
          onDraw(context);
          if (cb) cb();
          if (setUrl) setUrl(await canvas.toDataURL("image/png"));
        });
      }
    };

    useEffect(() => {
      reset();
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          reset,
        };
      },
      []
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Canvas ref={canvasRef} />;
  }
);

export default CanvasImage;
