import { MaterialIcons } from "@expo/vector-icons";
import { Center, Heading, IconButton, VStack } from "native-base";
import { useState } from "react";
import ProfileSaveModal from "../../../components/ProfileSaveModal";
import RenderMeasures from "../../../components/RenderMeasures";
import { useProfilePredictions } from "../../../contexts/ProfilePredictionsContext";

export default function ProfileMeasuresScreen() {
  const { profileMeasures, profilePredictions } = useProfilePredictions();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Center height={"full"}>
      {profilePredictions && (
        <ProfileSaveModal visible={modalVisible} setVisible={setModalVisible} />
      )}
      <Heading fontSize="xl" p="4" pb="3">
        Measures obtained
      </Heading>

      <VStack space={4} margin={8}>
        {profileMeasures && <RenderMeasures measures={profileMeasures} />}
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
