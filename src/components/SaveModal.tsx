import { Button, Modal } from "native-base";
import { Dispatch, SetStateAction, useState } from "react";
import { TLayout } from "../@types/image";
import { useImage } from "../contexts/ImageContext";
// import { MeasuresData, PointsData } from "../utils/types/excel";

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  Points: any;
  Measures?: any;
  Layout: TLayout;
}

export default function SaveModal({
  setVisible,
  visible,
  Points,
  Measures,
  Layout,
}: IProps) {
  const { image } = useImage();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [participantID, setParticipantID] = useState("");

  return (
    <>
      <Modal isOpen={visible} onClose={setVisible}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button isLoading={loading} disabled={!name} onPress={() => {}}>
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

// export default function SaveModal({
//   setVisible,
//   visible,
//   Points,
//   Measures,
//   Layout,
// }: IProps) {
//   const { image } = useImage();
//   const [name, setName] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [participantID, setParticipantID] = useState("");

//   const handleSave = async () => {
//     if (image) {
//       setLoading(true);

//       const uploadedImg = await uploadToCloudinary(image);

//       if (uploadedImg) {
//         const realm = await getRealm();

//         const { image_public_id, image_signature, image_url } = uploadedImg;

//         const dbParticipant = realm.objectForPrimaryKey<TParticipant>(
//           "Participant",
//           participantID
//         );

//         const Participant: TParticipant = dbParticipant
//           ? dbParticipant
//           : {
//               _id: uuid.v4(),
//               name: name,
//               created_at: new Date(),
//             };

//         let predictionsData: any = {
//           _id: uuid.v4(),
//           createdAt: new Date(),
//           image_url,
//           image_public_id,
//           image_signature,
//           Participant,
//         };

//         if (Measures) {
//           //parse points into correct format
//           Object.keys(Points).forEach((key) => {
//             const { x, y } = (Points as any)[key];
//             predictionsData[key] = [x, y];
//           });

//           //parse measures into correct format
//           Object.keys(Measures).forEach((key) => {
//             const { value } = (Measures as any)[key];
//             predictionsData[key] = value;
//           });

//           try {
//             realm.write(() => {
//               realm.create(`${Layout}Pred`, predictionsData);
//             });

//             realm.close();
//             alert("Dados salvos com sucesso!");
//             setLoading(false);
//             setVisible(!visible);
//           } catch {
//             setLoading(false);
//             alert("Não foi possível salvar os dados!");
//           }
//         }
//       }
//     }
//     // await writeTable([{ ID, Points, Measures, Layout }]);
//     setVisible(!visible);
//   };

//   const getParticpants = async () => {
//     const realm = await getRealm();
//     const participants = realm
//       .objects<TParticipant>("Participant")
//       .sorted("name");

//     realm.close;

//     return participants.map((participant) => (
//       <Select.Item label={participant.name} value={participant._id as string} />
//     ));
//   };

//   const onParticipantChange = async (v: string) => {
//     setParticipantID(v);
//     const realm = await getRealm();

//     const participant = realm.objectForPrimaryKey<TParticipant>(
//       "Participant",
//       v
//     );
//     setName(participant ? participant.name : "");
//   };

//   return (
//     <>
//       <Modal isOpen={visible} onClose={setVisible}>
//         <Modal.Content>
//           {loading && (
//             <Center
//               height={"full"}
//               width="full"
//               position={"absolute"}
//               style={{ position: "absolute", zIndex: 100 }}
//               backgroundColor="dark.50:alpha.80"
//             >
//               <Spinner
//                 accessibilityLabel="Loading predictions"
//                 color={"cyan.500"}
//                 size="lg"
//               />
//             </Center>
//           )}
//           <Modal.CloseButton />
//           <Modal.Header>Do you want to save the data?</Modal.Header>
//           <Modal.Body>
//             Click in the button bellow
//             <FormControl mt={3} maxW="300" isRequired>
//               <FormControl.Label>Choose participant</FormControl.Label>
//               <Select
//                 minWidth="200"
//                 accessibilityLabel="Choose Particpant"
//                 placeholder="Choose Participant"
//                 _selectedItem={{
//                   bg: "teal.600",
//                   endIcon: <CheckIcon size={5} />,
//                 }}
//                 mt="1"
//                 defaultValue={"none"}
//                 selectedValue={participantID}
//                 onValueChange={onParticipantChange}
//               >
//                 <Select.Item label="Not registered" value="none" />
//                 {getParticpants()}
//               </Select>
//             </FormControl>
//             <FormControl mt={3}>
//               <FormControl.Label>Participant's name</FormControl.Label>
//               <Input
//                 mt="1"
//                 placeholder="Participant ID"
//                 value={name}
//                 onChangeText={setName}
//                 isDisabled={!name || !participantID ? false : true}
//               />
//             </FormControl>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button.Group variant="ghost" space={2}>
//               <Button isLoading={loading} disabled={!name} onPress={handleSave}>
//                 SAVE
//               </Button>
//               <Button
//                 onPress={() => {
//                   setVisible(!visible);
//                 }}
//                 isLoading={loading}
//                 colorScheme="secondary"
//               >
//                 CLOSE
//               </Button>
//             </Button.Group>
//           </Modal.Footer>
//         </Modal.Content>
//       </Modal>
//     </>
//   );
// }
