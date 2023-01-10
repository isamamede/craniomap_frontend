import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Button, Center } from "native-base";
import { useRef, useState } from "react";
import { Alert } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";
import CanvasImage from "./CanvasImage";

type TProps = {
  img_url: string;
  onDraw: (ctx: CanvasRenderingContext2D) => void;
  downloadEnabled?: boolean;
};

export default function ImageDownloader({
  img_url,
  onDraw,
  downloadEnabled = true,
}: TProps) {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const canvas = useRef<Canvas>(null);

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

  return (
    <Center>
      <CanvasImage
        canvasRef={canvas}
        img_url={img_url}
        onDraw={onDraw}
        setUrl={setUrl}
      />
      {downloadEnabled && (
        <Button mt={5} onPress={handleDonwload} isLoading={loading}>
          Download
        </Button>
      )}
    </Center>
  );
}
