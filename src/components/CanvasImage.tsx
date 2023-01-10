import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Button, Center } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import Canvas, { CanvasRenderingContext2D, Image } from "react-native-canvas";
import { imgDimensions } from "../constants/image";

type TProps = {
  img_url: string;
  onDraw: (ctx: CanvasRenderingContext2D) => void;
};

export default function CanvasImage({ img_url, onDraw }: TProps) {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDonwload = async () => {
    setLoading(true);
    const base64Code = url.split("data:image/png;base64,")[1];

    try {
      const filename = FileSystem.cacheDirectory + "some_unique_file_name.png";
      await FileSystem.writeAsStringAsync(filename, base64Code, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await MediaLibrary.saveToLibraryAsync(filename);
      Alert.alert("Success", "Image downloaded!");
    } catch {
      Alert.alert("Error", "Could not download image");
    } finally {
      setLoading(false);
    }
  };

  const handleCanvas = async (canvas: Canvas) => {
    if (canvas) {
      canvas.width = imgDimensions.width;
      canvas.height = imgDimensions.height;
      const canvasImg = new Image(canvas);

      const context = canvas.getContext("2d");

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
        onDraw(context);
        context.save();
        setUrl(await canvas.toDataURL("image/png"));
      });
    }
  };

  return (
    <Center width={"full"}>
      <Canvas ref={handleCanvas} />
      <Button mt={5} onPress={handleDonwload} isLoading={loading}>
        Baixar
      </Button>
    </Center>
  );
}
