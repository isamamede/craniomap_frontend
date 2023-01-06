import { useNavigation } from "@react-navigation/native";
import { Button, Center, VStack } from "native-base";

import ParticipantService from "../../databases/services/ParticipantService";

export default function AllParticipantsScreen() {
  const navigation = useNavigation();

  const fetchParticipants = async () => {
    const service = new ParticipantService();
    const participants = await service
      .readAll()
      .catch((err) => console.log(err));
    console.log(participants);
  };

  return (
    <Center height={"full"}>
      <VStack mt={5}>
        <Button onPress={fetchParticipants}>Get all</Button>
      </VStack>
    </Center>
  );
}
