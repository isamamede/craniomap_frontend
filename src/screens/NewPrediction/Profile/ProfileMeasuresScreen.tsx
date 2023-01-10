import { useNavigation } from "@react-navigation/native";
import { Center, HStack, Heading, VStack } from "native-base";
import { useState } from "react";
import { IconButton } from "../../../components/IconButton";
import RenderMeasures from "../../../components/RenderMeasures";
import SaveModal from "../../../components/SaveModal";
import { tablesNames } from "../../../constants/database";
import { useImage } from "../../../contexts/ImageContext";
import { useProfilePredictions } from "../../../contexts/ProfilePredictionsContext";

export default function ProfileMeasuresScreen() {
  const navigation = useNavigation();
  const { setImage } = useImage();
  const { profileMeasures, profilePredictions } = useProfilePredictions();
  const [modalVisible, setModalVisible] = useState(false);

  const handleHome = () => {
    setImage(null);
    navigation.navigate("Image");
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
      <Heading fontSize="xl" p="4" pb="3">
        Measures obtained
      </Heading>

      <VStack space={4} margin={8}>
        {profileMeasures && <RenderMeasures measures={profileMeasures} />}
      </VStack>
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
  );
}
