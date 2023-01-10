import { useNavigation } from "@react-navigation/native";
import { Center, HStack, Heading } from "native-base";
import { useState } from "react";
import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMeasure } from "../../../@types/landmarks";
import { IconButton } from "../../../components/IconButton";
import PredictionCarousel from "../../../components/PredictionsCarousel";
import SaveModal from "../../../components/SaveModal";
import { tablesNames } from "../../../constants/database";
import { useImage } from "../../../contexts/ImageContext";
import { useProfilePredictions } from "../../../contexts/ProfilePredictionsContext";
import drawProfileMeasures from "../../../utils/functions/drawProfileMeasures";

export default function ProfileMeasuresScreen() {
  const navigation = useNavigation();
  const { setImage, image } = useImage();
  const { profileMeasures, profilePredictions } = useProfilePredictions();
  const [modalVisible, setModalVisible] = useState(false);

  const handleHome = () => {
    setImage(null);
    navigation.navigate("Image");
  };

  const onDraw = (ctx: CanvasRenderingContext2D, item: TMeasure) => {
    if (profileMeasures && profilePredictions)
      drawProfileMeasures(ctx, item, profilePredictions);
  };

  return (
    <Center height={"full"}>
      {profilePredictions && profileMeasures && (
        <SaveModal
          visible={modalVisible}
          setVisible={setModalVisible}
          measures={profileMeasures}
          predictions={profilePredictions}
          table={tablesNames.profilePred}
        />
      )}
      <Heading fontSize={"md"} p="4">
        Measures Obtained
      </Heading>

      {profileMeasures && image && (
        <PredictionCarousel
          imgUrl={`data:image/jpg;base64,${image.base64}`}
          measureArray={Object.values(profileMeasures)}
          onDraw={onDraw}
          donwloadEnabled={false}
        />
      )}

      <HStack py={3} justifyContent="space-evenly" width={"40%"}>
        <IconButton
          borderRadius="md"
          variant="solid"
          onPress={() => setModalVisible(!modalVisible)}
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
