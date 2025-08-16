import { Button, Checkbox, FormControl, Input, Modal } from "native-base";
import { Dispatch, SetStateAction, useState } from "react";
import { useServer } from "../contexts/Server";

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function ServerModal({ setVisible, visible }: IProps) {
  const { setIp, ip, setLocal } = useServer();
  const [newIp, setNewIp] = useState<string>(ip);
  const [isLocal, setIsLocal] = useState<boolean>(false);

  const handleSave = () => {
    setIp(newIp);
    setLocal(isLocal);
    setVisible(false);
  };

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Change server ip</Modal.Header>
        <Modal.Body>
          <FormControl mt={3}>
            <FormControl.Label>Ip</FormControl.Label>
            <Input
              mt="1"
              placeholder="Participant ID"
              value={newIp}
              onChangeText={setNewIp}
            />
          </FormControl>
          <Checkbox mt={2} value="local" onChange={setIsLocal}>
            Is Local?
          </Checkbox>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group variant="ghost" space={2}>
            <Button onPress={handleSave}>SAVE</Button>
            <Button
              onPress={() => {
                setVisible(false);
              }}
              colorScheme={"warning.500"}
            >
              CLOSE
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
