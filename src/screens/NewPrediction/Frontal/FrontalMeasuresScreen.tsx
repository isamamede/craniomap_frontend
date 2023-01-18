import { useNavigation } from "@react-navigation/native";
import { Center, HStack, Heading } from "native-base";
import { useMemo, useState } from "react";
import { CanvasRenderingContext2D } from "react-native-canvas";
import { TMeasure } from "../../../@types/landmarks";
import { IconButton } from "../../../components/IconButton";
import PredictionCarousel from "../../../components/PredictionsCarousel";
import SaveModal from "../../../components/SaveModal";
import { tablesNames } from "../../../constants/database";
import { useFrontalPredictions } from "../../../contexts/FrontalPredictionsContext";
import { useImage } from "../../../contexts/ImageContext";
import drawFrontalMeasures from "../../../utils/canvas/drawFrontalMeasures";
import getFrontalMeasuresFromDB from "../../../utils/math/getFrontalMeasuresFromDB";

export default function FrontalMeasuresScreen() {
  const navigation = useNavigation();
  const { setImage, image } = useImage();
  const { frontalMeasures, frontalPredictions } = useFrontalPredictions();
  const [modalVisible, setModalVisible] = useState(false);

  const measuresArray = useMemo(() => {
    if (frontalMeasures) {
      return getFrontalMeasuresFromDB(frontalMeasures).arrayWithoutP;
    }
    return [];
  }, [frontalMeasures]);

  const handleHome = () => {
    setImage(null);
    navigation.navigate("Image");
  };

  const onDraw = (ctx: CanvasRenderingContext2D, item: TMeasure) => {
    if (frontalMeasures && frontalPredictions)
      drawFrontalMeasures(ctx, item, frontalPredictions);
  };

  return (
    <Center height={"full"} width={"full"}>
      {frontalPredictions && frontalMeasures && (
        <SaveModal
          visible={modalVisible}
          setVisible={setModalVisible}
          measures={frontalMeasures}
          predictions={frontalPredictions}
          table={tablesNames.frontalPred}
        />
      )}
      <Heading fontSize={"md"} p="4">
        Measures Obtained
      </Heading>
      {frontalMeasures && image && (
        <PredictionCarousel
          imgUrl={`data:image/jpg;base64,${image.base64}`}
          measureArray={measuresArray}
          onDraw={onDraw}
          donwloadEnabled={false}
        />
      )}
      <Center>
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
    </Center>
  );
}
