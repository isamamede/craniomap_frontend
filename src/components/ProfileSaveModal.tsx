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
import uuid from "react-native-uuid";
import { TParticipant, TProfilePredictions } from "../@types/database";
import { tablesNames } from "../constants/database";
import { useImage } from "../contexts/ImageContext";
import { useProfilePredictions } from "../contexts/ProfilePredictionsContext";
import { uploadToCloudinary } from "../databases/cloudinary";
import { getRealm } from "../databases/realm";

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function ProfileSaveModal({ setVisible, visible }: IProps) {
  const { image } = useImage();
  const { profileMeasures, profilePredictions } = useProfilePredictions();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [participant_id, setParticipant_id] = useState("none");
  const [participants, setParticipants] = useState<TParticipant[]>([]);

  const handleExistingParticipant = async () => {
    if (image && profileMeasures && profilePredictions) {
      setLoading(true);

      const uploadedImg = await uploadToCloudinary(image);

      if (uploadedImg) {
        const { public_id, signature, url } = uploadedImg;

        let predictionsData: Omit<
          TProfilePredictions,
          "participant_id" | "_id" | "created_at"
        > = {
          image: {
            url,
            public_id,
            signature,
          },
          ...profileMeasures,
          ...profilePredictions,
        };

        const db = await getRealm();
        try {
          //check if participant exists
          const participant = db.objectForPrimaryKey<TProfilePredictions>(
            tablesNames.participant,
            participant_id
          );

          //only write to the db is particpant exists
          if (participant) {
            const saved = db.write(() => {
              return db.create<TProfilePredictions>(tablesNames.profilePred, {
                ...predictionsData,
                _id: uuid.v4() as string,
                participant_id,
                created_at: new Date(),
              });
            });
            saved
              ? Alert.alert("Data saved successufully!")
              : Alert.alert("Could not save data. Please, check the form.");
          } else {
            Alert.alert("Choosen particpant doesn't exist on database.");
          }
        } catch (err) {
          Alert.alert("Error", "Could not save data.");
        } finally {
          db.close();
          setLoading(false);
        }
      }
    }
    setVisible(!visible);
  };

  const handleNewParticipant = async () => {
    if (image && profileMeasures && profilePredictions) {
      setLoading(true);

      const uploadedImg = await uploadToCloudinary(image).catch((err) =>
        console.log(err)
      );

      if (uploadedImg) {
        const { public_id, signature, url } = uploadedImg;

        let predictionsData: Omit<
          TProfilePredictions,
          "participant_id" | "_id" | "created_at"
        > = {
          image: {
            url,
            public_id,
            signature,
          },
          ...profileMeasures,
          ...profilePredictions,
        };

        const db = await getRealm();
        try {
          //create new particpant
          const newParticipant = db.write(() => {
            return db.create<TParticipant>(tablesNames.participant, {
              name,
              _id: uuid.v4() as string,
              created_at: new Date(),
            });
          });

          //create predictions
          const saved = db.write(() => {
            const created = db.create<TProfilePredictions>(
              tablesNames.profilePred,
              {
                ...predictionsData,
                _id: uuid.v4() as string,
                participant_id: newParticipant._id,
                created_at: new Date(),
              }
            );
            return created;
          });
          saved
            ? Alert.alert("Data saved successufully!")
            : Alert.alert("Could not save data. Please, check the form.");
        } catch (err) {
          Alert.alert("Error", "Could not save data.");
        } finally {
          db.close();
          setLoading(false);
        }
      }
    }
    setVisible(!visible);
  };

  const getParticpants = async () => {
    const db = await getRealm();

    try {
      const response = db
        .objects<TParticipant[]>(tablesNames.participant)
        .sorted("created_at")
        .toJSON();
      setParticipants(response as any);
    } catch (err) {
      Alert.alert("Error", "Could not fetch participants.");
    } finally {
      db.close();
    }
  };

  useEffect(() => {
    getParticpants();
  }, []);

  return (
    <>
      <Modal isOpen={visible} onClose={setVisible}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Do you want to save the data?</Modal.Header>
          <Modal.Body>
            Click in the button bellow
            <FormControl mt={3} maxW="300" isRequired>
              <FormControl.Label>Choose participant</FormControl.Label>
              <Select
                minWidth="200"
                accessibilityLabel="Choose Particpant"
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
                onPress={() => {
                  setVisible(!visible);
                }}
                isLoading={loading}
                colorScheme="secondary"
              >
                CLOSE
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
