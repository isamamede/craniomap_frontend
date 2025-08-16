import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Button, HStack, Text, View } from "native-base";
import { useEffect, useState } from "react";
import { Alert, TextInput } from "react-native";
import uuid from "react-native-uuid";
import {
  TFrontalPredictions,
  TParticipant,
  TProfilePredictions,
} from "../../@types/database";
import {
  IFrontalMesures,
  IFrontalPredictions,
  IProfileMesures,
  IProfilePredictions,
} from "../../@types/landmarks";
import { tablesNames } from "../../constants/database";
import { useImage } from "../../contexts/ImageContext";
import { getRealm } from "../../databases/realm";
import { uploadLocally } from "../../databases/uploadImg";

interface IProps {
  mesures: IFrontalMesures | IProfileMesures;
  predictions: IFrontalPredictions | IProfilePredictions;
  table: string;
}

export default function SaveScreen({ mesures, predictions, table }: IProps) {
  const navigation = useNavigation<any>();
  const { image } = useImage();
  const [participants, setParticipants] = useState<TParticipant[]>([]);
  const [participantId, setParticipantId] = useState("none");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const getParticipants = async () => {
    const db = await getRealm();
    try {
      const response = db
        .objects<TParticipant[]>(tablesNames.participant)
        .sorted("created_at")
        .toJSON();
      setParticipants(response as any);
    } catch {
      Alert.alert("Error", "Could not fetch participants.");
    } finally {
      db.close();
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  const handleSave = async () => {
    if (!image) return;

    setLoading(true);
    const db = await getRealm();

    try {
      let participantIdToUse = participantId;

      // create new participant if needed
      if (participantId === "none") {
        const newParticipant = db.write(() => {
          return db.create<TParticipant>(tablesNames.participant, {
            _id: uuid.v4() as string,
            name,
            created_at: new Date(),
          });
        });
        participantIdToUse = newParticipant._id;
      }

      const img_url = await uploadLocally(image, participantIdToUse);

      if (img_url) {
        let predictionsData: Omit<
          TFrontalPredictions | TProfilePredictions,
          "participant_id" | "_id" | "created_at"
        > = {
          image: { url: img_url, public_id: participantIdToUse },
          ...mesures,
          ...predictions,
        };

        db.write(() => {
          db.create<TFrontalPredictions | TProfilePredictions>(table, {
            ...predictionsData,
            participant_id: participantIdToUse,
            created_at: new Date(),
          });
        });

        Alert.alert("Data saved successfully!");
        navigation.goBack(); // return to previous screen
      }
    } catch (err) {
      Alert.alert("Error", String(err));
    } finally {
      db.close();
      setLoading(false);
    }
  };

  return (
    <View alignItems={"center"} p={4}>
      <View>
        <Text>Choose Participant</Text>
        <Picker
          selectedValue={participantId}
          onValueChange={(itemValue) => setParticipantId(itemValue)}
        >
          <Picker.Item label="Not registered" value="none" />
          {participants.map((p) => (
            <Picker.Item key={p._id} label={p.name} value={p._id} />
          ))}
        </Picker>
      </View>

      {participantId === "none" && (
        <View style={{ marginVertical: 10 }}>
          <Text style={{ marginBottom: 5 }}>Participant Name</Text>
          <TextInput
            placeholder="Enter participant name"
            value={name}
            onChangeText={setName}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
          />
        </View>
      )}

      <HStack space={3} justifyContent="flex-end">
        <Button isLoading={loading} onPress={handleSave}>
          Save
        </Button>
        <Button colorScheme="warning" onPress={() => navigation.goBack()}>
          Cancel
        </Button>
      </HStack>
    </View>
  );
}
