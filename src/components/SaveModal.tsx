import {
  Button,
  CheckIcon,
  FormControl,
  Input,
  Modal,
  Select,
} from "native-base";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
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
import { uploadLocally } from "../databases/uploadImg";

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  mesures: IFrontalMesures | IProfileMesures;
  predictions: IFrontalPredictions | IProfilePredictions;
  table: string;
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
    if (image) {
      setLoading(true);

      const db = await getRealm();
      try {
        const participant = db.objectForPrimaryKey<TParticipant>(
          tablesNames.participant,
          participant_id
        );

        if (participant) {
          const img_url = await uploadLocally(image, participant._id);
          if (img_url) {
            let predictionsData: Omit<
              TFrontalPredictions | TProfilePredictions,
              "participant_id" | "_id" | "created_at"
            > = {
              image: {
                url: img_url,
                public_id: participant_id,
              },
              ...mesures,
              ...predictions,
            };

            const saved = db.write(() => {
              return db.create<TFrontalPredictions | TProfilePredictions>(
                table,
                {
                  ...predictionsData,
                  participant_id: participant._id,
                  created_at: new Date(),
                }
              );
            });

            saved
              ? Alert.alert("Data saved successfully!")
              : Alert.alert("Could not save data. Please, check the form.");
          }
        } else {
          Alert.alert("Chosen participant doesn't exist in database.");
        }
      } catch {
        Alert.alert("Error", "Could not save data.");
      } finally {
        db.close();
        setLoading(false);
      }
    }
    setVisible(false);
  };

  const handleNewParticipant = async () => {
    if (image) {
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

        const img_url = await uploadLocally(image, newParticipant._id);

        if (img_url) {
          let predictionsData: Omit<
            TFrontalPredictions | TProfilePredictions,
            "participant_id" | "_id" | "created_at"
          > = {
            image: {
              url: img_url,
              public_id: participant_id,
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
            : Alert.alert("Could not save data. Please, check the form.");
        }
      } catch {
        Alert.alert("Error", "Could not save data.");
      } finally {
        db.close();
        setLoading(false);
      }
    }
    setVisible(false);
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
    <Modal
      isOpen={visible}
      onClose={() => setVisible(false)}
      avoidKeyboard
      closeOnOverlayClick={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Do you want to save the data?</Modal.Header>
          <Modal.Body>
            <FormControl mt={3} maxW="300" isRequired>
              <FormControl.Label>Choose participant</FormControl.Label>
              <Select
                minWidth="200"
                accessibilityLabel="Choose Participant"
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
                placeholder="Participant ID"
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
                colorScheme={"warning.500"}
              >
                CLOSE
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
}
