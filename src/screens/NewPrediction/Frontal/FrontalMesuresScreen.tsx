import { useNavigation } from "@react-navigation/native";
import { Center, HStack, Heading } from "native-base";
import { useMemo } from "react";
import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMesure } from "../../../@types/landmarks";
import { IconButton } from "../../../components/IconButton";
import PredictionCarousel from "../../../components/PredictionsCarousel";
import { tablesNames } from "../../../constants/database";
import { useFrontalPredictions } from "../../../contexts/FrontalPredictionsContext";
import { useImage } from "../../../contexts/ImageContext";
import drawFrontalMesures from "../../../utils/canvas/drawFrontalMesures";
import getFrontalMesuresFromDB from "../../../utils/math/getFrontalMesuresFromDB";

export default function FrontalMesuresScreen() {
  const navigation = useNavigation();
  const { setImage, image } = useImage();
  const { frontalMesures, frontalPredictions } = useFrontalPredictions();

  const mesuresArray = useMemo(() => {
    if (frontalMesures) {
      return getFrontalMesuresFromDB(frontalMesures).arrayWithoutP;
    }
    return [];
  }, [frontalMesures]);

  const handleHome = () => {
    setImage(null);
    navigation.navigate("Image");
  };

  const onDraw = (ctx: CanvasRenderingContext2D, item: TMesure) => {
    if (frontalMesures && frontalPredictions)
      drawFrontalMesures(ctx, item, frontalPredictions);
  };

  return (
    <Center height={"full"} width={"full"}>
      <Heading fontSize={"md"} p="4">
        Mesures Obtained
      </Heading>
      {frontalMesures && image && (
        <PredictionCarousel
          imgUrl={`data:image/jpg;base64,${image.base64}`}
          mesureArray={mesuresArray}
          onDraw={onDraw}
          donwloadEnabled={false}
        />
      )}
      <Center>
        <HStack py={3} justifyContent="space-evenly" width={"40%"}>
          <IconButton
            borderRadius="md"
            variant="solid"
            onPress={() =>
              navigation.navigate("Save", {
                mesures: frontalMesures,
                predictions: frontalPredictions,
                table: tablesNames.frontalPred,
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
    </Center>
  );
}
