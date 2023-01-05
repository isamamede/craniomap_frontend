import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { Button, Center, IconButton, Image, Row, VStack } from "native-base";
import { useEffect } from "react";
import { useImage } from "../../contexts/ImageContext";

export default function ImageScreen() {
  const { image, setImage } = useImage();
  const [photosPermission, requestPhotosPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [cameraPermission, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const navigation = useNavigation();

  //request camera and media library permissions
  useEffect(() => {
    (async () => {
      await requestCameraPermission();
      await requestPhotosPermission();
    })();
  }, []);

  async function handlePickImage(): Promise<void> {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      aspect: [3, 4],
      allowsEditing: true,
      allowsMultipleSelection: false,
      base64: true,
    });
    if (result.canceled === false) {
      const manipulatedResult = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 300, height: 400 } }],
        { base64: true, compress: 1 }
      );
      setImage(manipulatedResult);
    }
  }

  async function handleTakePicture(): Promise<void> {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      aspect: [3, 4],
      allowsEditing: true,
      allowsMultipleSelection: false,
      base64: true,
    });
    if (result.canceled === false) {
      const manipulatedResult = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 300, height: 400 } }],
        { base64: true, compress: 1 }
      );
      setImage(manipulatedResult);
    }
  }

  function handleNext(): void {
    navigation.navigate("Layout");
  }

  return (
    <Center height={"full"}>
      <VStack space={4} alignItems="center">
        {photosPermission?.granted && cameraPermission?.granted && (
          <Row
            space={4}
            alignItems="center"
            justifyContent={"center"}
            marginTop="3"
          >
            <IconButton
              borderRadius="md"
              variant="solid"
              onPress={handleTakePicture}
              size="lg"
              backgroundColor="purple.500"
              _icon={{
                as: MaterialIcons,
                name: "camera",
              }}
              _hover={{
                bg: "purple.600:alpha.20",
              }}
              _pressed={{
                bg: "purple.600:alpha.20",
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
            />
            <IconButton
              borderRadius="md"
              variant="solid"
              onPress={handlePickImage}
              size="lg"
              backgroundColor="purple.500"
              _icon={{
                as: MaterialIcons,
                name: "folder",
              }}
              _hover={{
                bg: "purple.600:alpha.20",
              }}
              _pressed={{
                bg: "purple.600:alpha.20",
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
            />
          </Row>
        )}
        {image && (
          <>
            <Center>
              <Image
                source={{
                  uri: image.uri,
                  height: image.height,
                  width: image.width,
                }}
                height={image.height}
                width={image.width}
                alt="selected-image"
              />
            </Center>
            <Center>
              <Button onPress={handleNext} backgroundColor="purple.400">
                Next
              </Button>
            </Center>
          </>
        )}
      </VStack>
    </Center>
  );
}
