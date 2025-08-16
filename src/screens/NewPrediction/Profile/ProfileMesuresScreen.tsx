import { useNavigation } from "@react-navigation/native";
import { Center, HStack, Heading } from "native-base";
import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMesure } from "../../../@types/landmarks";
import { IconButton } from "../../../components/IconButton";
import PredictionCarousel from "../../../components/PredictionsCarousel";
import { tablesNames } from "../../../constants/database";
import { useImage } from "../../../contexts/ImageContext";
import { useProfilePredictions } from "../../../contexts/ProfilePredictionsContext";
import drawProfileMesures from "../../../utils/canvas/drawProfileMesures";

export default function ProfileMesuresScreen() {
  const navigation = useNavigation();
  const { setImage, image } = useImage();
  const { profileMesures, profilePredictions } = useProfilePredictions();

  const handleHome = () => {
    setImage(null);
    navigation.navigate("Image");
  };

  const onDraw = (ctx: CanvasRenderingContext2D, item: TMesure) => {
    if (profileMesures && profilePredictions)
      drawProfileMesures(ctx, item, profilePredictions);
  };

  return (
    <Center height={"full"}>
      <Heading fontSize={"md"} p="4">
        Mesures Obtained
      </Heading>

      {profileMesures && image && (
        <PredictionCarousel
          imgUrl={`data:image/jpg;base64,${image.base64}`}
          mesureArray={Object.values(profileMesures)}
          onDraw={onDraw}
          donwloadEnabled={false}
        />
      )}

      <HStack py={3} justifyContent="space-evenly" width={"40%"}>
        <IconButton
          borderRadius="md"
          variant="solid"
          onPress={() =>
            navigation.navigate("Save", {
              mesures: profileMesures,
              predictions: profilePredictions,
              table: tablesNames.profilePred,
            } as any)
          }
          name="save"
          backgroundColor="primary.400"
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
          onPress={handleHome}
          name="home"
          backgroundColor="coolGray.400"
          _icon={{
            size: "lg",
          }}
          _hover={{
            bg: "coolGray.600:alpha.20",
          }}
          _pressed={{
            bg: "coolGray.600:alpha.20",
            _ios: {
              _icon: {
                size: "2xl",
              },
            },
          }}
        />
      </HStack>
    </Center>
  );
}
