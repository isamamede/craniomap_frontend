import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { TParticipant } from "../../@types/database";
import { RecordParamList } from "../../@types/navigation";
import { IconButton } from "../../components/IconButton";
import Loading from "../../components/Loading";
import { tablesNames } from "../../constants/database";
import { getRealm } from "../../databases/realm";

type TProps = NativeStackScreenProps<RecordParamList, "Participant">;

export default function ParticipantScreen({ route, navigation }: TProps) {
  const { _id } = route.params;
  const [participant, setParticipant] = useState<TParticipant>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchParticipant = async () => {
    setLoading(true);
    const db = await getRealm();
    try {
      const response = db
        .objectForPrimaryKey<TParticipant>(tablesNames.participant, _id)
        ?.toJSON();

      setParticipant(response as TParticipant);
    } catch {
      Alert.alert("Error", "Could not fetch particpants");
    } finally {
      db.close();
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchParticipant();
    }, [])
  );

  const handleEdit = () => {};

  const handleFrontal = () => {
    navigation.navigate("FrontalPrediction", { participant_id: _id });
  };

  const handleProfile = () => {
    navigation.navigate("ProfilePrediction", { participant_id: _id });
  };

  return loading ? (
    <Loading />
  ) : (
    <Box padding={2}>
      <HStack
        p={4}
        justifyContent="space-between"
        alignItems={"center"}
        height={"20%"}
      >
        <VStack>
          <Heading fontSize="xl" pb="3">
            {participant?.name}
          </Heading>
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            {`Created at: ${participant?.created_at.toLocaleString()}`}
          </Text>
        </VStack>
        <Spacer />
        <IconButton
          name="edit"
          boxSize={"10"}
          variant={"ghost"}
          _icon={{ size: "7" }}
          onPress={handleEdit}
        />
      </HStack>
      <Center width={"full"} height={"80%"}>
        <Button marginX={5} mb={5} onPress={handleFrontal}>
          Frontal Predictions
        </Button>
        <Button marginX={5} onPress={handleProfile}>
          Profile Predictions
        </Button>
      </Center>
    </Box>
  );
}
