import { useNavigation } from "@react-navigation/native";
import { manipulateAsync } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Row,
  Spacer,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { IconButton } from "../../components/IconButton";
import ServerModal from "../../components/ServerModal";
import { imgDimensions } from "../../constants/image";
import { useImage } from "../../contexts/ImageContext";

export default function ImageScreen() {
  const { image, setImage } = useImage();
  const [photosPermission, requestPhotosPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [cameraPermission, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const navigation = useNavigation();
  const [serverVisible, setServerVisible] = useState<boolean>(false);

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
        [{ resize: imgDimensions }],
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
        [{ resize: imgDimensions }],
        { base64: true, compress: 1 }
      );
      setImage(manipulatedResult);
    }
  }

  function handleNext(): void {
    navigation.navigate("Layout");
  }

  return (
    <Box width={"full"} height={"full"}>
      <ServerModal setVisible={setServerVisible} visible={serverVisible} />
      <HStack height={"10%"} p={3}>
        <Spacer />
        <IconButton
          mt={5}
          size={"sm"}
          name="server"
          variant={"ghost"}
          onPress={() => setServerVisible(true)}
        />
      </HStack>
      <VStack
        height={"90%"}
        justifyContent={"center"}
        space={4}
        alignItems="center"
      >
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
              backgroundColor={"primary.500"}
              name={"camera"}
              _icon={{
                size: "lg",
              }}
              _hover={{
                bg: "primary.600:alpha.20",
              }}
              _pressed={{
                bg: "primary.600:alpha.20",
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
              backgroundColor={"primary.500"}
              name={"folder"}
              _icon={{
                size: "lg",
              }}
              _hover={{
                bg: "primary.600:alpha.20",
              }}
              _pressed={{
                bg: "primary.600:alpha.20",
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
              <Button onPress={handleNext} backgroundColor="primary.400">
                Next
              </Button>
            </Center>
          </>
        )}
      </VStack>
    </Box>
  );
}
