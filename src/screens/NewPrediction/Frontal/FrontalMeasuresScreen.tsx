import { MaterialIcons } from "@expo/vector-icons";
import { Center, Heading, IconButton, VStack } from "native-base";
import { useState } from "react";
import RenderMeasures from "../../../components/RenderMeasures";
import SaveModal from "../../../components/SaveModal";
import { useFrontalPredictions } from "../../../contexts/FrontalPredictionsContext";
import { useImage } from "../../../contexts/ImageContext";

export default function FrontalMeasuresScreen() {
  const { frontalMeasures, frontalPredictions } = useFrontalPredictions();
  const { layout } = useImage();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Center height={"full"} width={"full"}>
      {frontalPredictions && (
        <SaveModal
          Points={frontalPredictions}
          visible={modalVisible}
          setVisible={setModalVisible}
          Measures={frontalMeasures}
          Layout={layout}
        />
      )}
      <VStack marginBottom={4}>
        <Heading fontSize="xl" pb="3">
          Measures obtained
        </Heading>
        {frontalMeasures && <RenderMeasures measures={frontalMeasures} />}
      </VStack>
      <Center>
        <IconButton
          borderRadius="md"
          variant="solid"
          onPress={() => setModalVisible(!modalVisible)}
          size="lg"
          backgroundColor="purple.500"
          _icon={{
            as: MaterialIcons,
            name: "save",
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
      </Center>
    </Center>
  );
}
