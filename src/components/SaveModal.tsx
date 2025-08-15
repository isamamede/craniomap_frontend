import {
  Button,
  CheckIcon,
  FormControl,
  Input,
  Modal,
  Select,
} from "native-base";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Alert } from "react-native";
import RNFS from "react-native-fs";
import uuid from "react-native-uuid";
import {
  TFrontalPredictions,
  TParticipant,
  TProfilePredictions,
} from "../@types/database";
import {
  IFrontalMesures,
  IFrontalPredictions,
  IProfileMesures,
  IProfilePredictions,
} from "../@types/landmarks";
import { tablesNames } from "../constants/database";
import { useImage } from "../contexts/ImageContext";
import { getRealm } from "../databases/realm";

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  mesures: IFrontalMesures | IProfileMesures;
  predictions: IFrontalPredictions | IProfilePredictions;
  table: string;
}

// Save image to device's Documents folder
async function saveImageLocally(imageUri: string, participantId: string) {
  try {
    const fileName = `${participantId}_${Date.now()}.jpg`;
    const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    await RNFS.copyFile(imageUri, destPath);
    return `file://${destPath}`;
  } catch (err) {
    console.error("Error saving image locally:", err);
    throw err;
  }
}

export default function SaveModal({
  setVisible,
  visible,
  mesures,
  predictions,
  table,
}: IProps) {
  const { image } = useImage();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [participant_id, setParticipant_id] = useState("none");
  const [participants, setParticipants] = useState<TParticipant[]>([]);

  const handleExistingParticipant = async () => {
    if (!image) return;

    setLoading(true);
    const db = await getRealm();

    try {
      const participant = db.objectForPrimaryKey<TParticipant>(
        tablesNames.participant,
        participant_id
      );

      if (!participant) {
        Alert.alert("Chosen participant doesn't exist in database.");
        return;
      }

      const localImagePath = await saveImageLocally(image.uri, participant._id);

      let predictionsData: Omit<
        TFrontalPredictions | TProfilePredictions,
        "participant_id" | "_id" | "created_at"
      > = {
        image: {
          url: localImagePath,
        },
        ...mesures,
        ...predictions,
      };

      const saved = db.write(() => {
        return db.create<TFrontalPredictions | TProfilePredictions>(table, {
          ...predictionsData,
          participant_id: participant._id,
          created_at: new Date(),
        });
      });

      saved
        ? Alert.alert("Data saved successfully!")
        : Alert.alert("Could not save data.");
    } catch (err) {
      Alert.alert("Error", "Could not save data.");
      console.error(err);
    } finally {
      db.close();
      setLoading(false);
      setVisible(false);
    }
  };

  const handleNewParticipant = async () => {
    if (!image) return;

    setLoading(true);
    const db = await getRealm();

    try {
      const newParticipant = db.write(() => {
        return db.create<TParticipant>(tablesNames.participant, {
          name,
          _id: uuid.v4() as string,
          created_at: new Date(),
        });
      });

      const localImagePath = await saveImageLocally(
        image.uri,
        newParticipant._id
      );

      let predictionsData: Omit<
        TFrontalPredictions | TProfilePredictions,
        "participant_id" | "_id" | "created_at"
      > = {
        image: {
          url: localImagePath,
        },
        ...mesures,
        ...predictions,
      };

      const saved = db.write(() => {
        return db.create<TFrontalPredictions | TProfilePredictions>(table, {
          ...predictionsData,
          participant_id: newParticipant._id,
          created_at: new Date(),
        });
      });

      saved
        ? Alert.alert("Data saved successfully!")
        : Alert.alert("Could not save data.");
    } catch (err) {
      Alert.alert("Error", "Could not save data.");
      console.error(err);
    } finally {
      db.close();
      setLoading(false);
      setVisible(false);
    }
  };

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

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Do you want to save the data?</Modal.Header>
        <Modal.Body>
          <FormControl mt={3} maxW="300" isRequired>
            <FormControl.Label>Choose participant</FormControl.Label>
            <Select
              minWidth="200"
              placeholder="Choose Participant"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
              defaultValue={"none"}
              selectedValue={participant_id}
              onValueChange={setParticipant_id}
            >
              <Select.Item label="Not registered" value="none" />
              {participants.map((participant) => (
                <Select.Item
                  key={participant._id}
                  label={participant.name}
                  value={participant._id as string}
                />
              ))}
            </Select>
          </FormControl>
          <FormControl mt={3}>
            <FormControl.Label>Participant's name</FormControl.Label>
            <Input
              mt="1"
              placeholder="Participant Name"
              value={name}
              onChangeText={setName}
              isDisabled={participant_id !== "none"}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group variant="ghost" space={2}>
            <Button
              isLoading={loading}
              onPress={
                participant_id !== "none"
                  ? handleExistingParticipant
                  : handleNewParticipant
              }
            >
              SAVE
            </Button>
            <Button
              onPress={() => setVisible(false)}
              isLoading={loading}
              colorScheme={"warning"}
            >
              CLOSE
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
