import { Box, HStack, Heading, Spacer } from "native-base";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { TParticipant } from "../../@types/database";
import ConfirmationModal from "../../components/ConfirmationModal";
import { IconButton } from "../../components/IconButton";
import Loading from "../../components/Loading";
import SavedList from "../../components/SavedList";
import { tablesNames } from "../../constants/database";
import {
  deleteAllCloudinaryImages,
  deleteCloudinaryImageByTag,
} from "../../databases/cloudinary";
import { getRealm } from "../../databases/realm";

export default function AllParticipantsScreen() {
  const navigation = useNavigation();
  const [participants, setParticipants] = useState<TParticipant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  const fetchParticipants = async () => {
    setLoading(true);
    const db = await getRealm();
    try {
      const response = db
        .objects<TParticipant[]>(tablesNames.participant)
        .sorted("created_at")
        .toJSON();
      setParticipants(response as TParticipant[]);
    } catch {
      Alert.alert("Error", "Could not fetch particpants");
    } finally {
      db.close();
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchParticipants();
    }, [])
  );

  const handleDelete = async (_id: string) => {
    setLoading(true);
    const db = await getRealm();
    try {
      var object = db.objectForPrimaryKey<TParticipant>(
        tablesNames.participant,
        _id
      );
      var particpantsFPred = db
        .objects(tablesNames.frontalPred)
        .filtered(`participant_id == '${_id}'`);
      var particpantsPPred = db
        .objects(tablesNames.profilePred)
        .filtered(`participant_id == '${_id}'`);

      await deleteCloudinaryImageByTag(object?._id);
      db.write(() => {
        db.delete(object);
        db.delete(particpantsFPred);
        db.delete(particpantsPPred);
        object = null;
      });
    } catch (err) {
      Alert.alert("Error", JSON.stringify(err));
    } finally {
      db.close();
      setLoading(false);
      await fetchParticipants();
    }
  };

  const handleDeleteAll = async () => {
    setModalLoading(true);
    const db = await getRealm();
    try {
      await deleteAllCloudinaryImages();
      db.write(() => {
        db.delete(db.objects(tablesNames.participant));
        db.delete(db.objects(tablesNames.frontalPred));
        db.delete(db.objects(tablesNames.profilePred));
      });
    } catch {
      Alert.alert("Error", "Cloud not delete all participants");
    } finally {
      db.close();
      setModalLoading(false);
      setModalOpen(false);
      await fetchParticipants();
    }
  };

  const handlePress = (_id: string) => {
    navigation.navigate("Participant", {
      _id,
    });
  };

  return (
    <Box mt={5} height={"full"} width={"full"} padding={2}>
      <ConfirmationModal
        visible={modalOpen}
        setVisible={setModalOpen}
        loading={modalLoading}
        action={handleDeleteAll}
        title={"Delete all participants"}
        body={"Are you sure you want to delete all particpants?"}
      />
      <HStack>
        <Heading fontSize="xl" p="4" pb="3">
          Particpants
        </Heading>
        <Spacer />
        <IconButton
          name={"refresh"}
          variant={"ghost"}
          _icon={{
            color: "coolGray.800",
            size: "sm",
          }}
          _hover={{
            color: "coolGray.800",
          }}
          _pressed={{
            color: "coolGray.800",
          }}
          onPress={fetchParticipants}
        />
        <IconButton
          name={"user-times"}
          variant={"ghost"}
          _icon={{
            color: "red.400",
            size: "sm",
          }}
          _hover={{
            color: "red.800",
          }}
          _pressed={{
            color: "red.800",
          }}
          onPress={() => {
            setModalOpen(true);
          }}
        />
      </HStack>
      {loading ? (
        <Loading />
      ) : (
        <SavedList
          data={participants}
          handleDelete={handleDelete}
          onPress={handlePress}
        />
      )}
    </Box>
  );
}
