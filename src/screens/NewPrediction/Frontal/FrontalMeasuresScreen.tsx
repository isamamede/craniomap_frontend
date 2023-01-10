import { useNavigation } from "@react-navigation/native";
import { Center, HStack, Heading, VStack } from "native-base";
import { useState } from "react";
import { IconButton } from "../../../components/IconButton";
import RenderMeasures from "../../../components/RenderMeasures";
import SaveModal from "../../../components/SaveModal";
import { tablesNames } from "../../../constants/database";
import { useFrontalPredictions } from "../../../contexts/FrontalPredictionsContext";
import { useImage } from "../../../contexts/ImageContext";

export default function FrontalMeasuresScreen() {
  const navigation = useNavigation();
  const { setImage } = useImage();
  const { frontalMeasures, frontalPredictions } = useFrontalPredictions();
  const [modalVisible, setModalVisible] = useState(false);

  const handleHome = () => {
    setImage(null);
    navigation.navigate("Image");
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
      <VStack marginBottom={4}>
        <Heading fontSize="xl" pb="3">
          Measures obtained
        </Heading>
        {frontalMeasures && <RenderMeasures measures={frontalMeasures} />}
      </VStack>
      <Center>
        <HStack justifyContent="space-evenly" width={"50%"}>
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
