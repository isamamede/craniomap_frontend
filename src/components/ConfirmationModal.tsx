import { Button, Modal } from "native-base";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  action: () => {};
  title?: string;
  body?: string;
  loading: boolean;
}

export default function ConfirmationModal({
  setVisible,
  visible,
  title,
  body,
  loading = false,
  action,
}: IProps) {
  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button.Group variant="ghost" space={2}>
            <Button isLoading={loading} onPress={action}>
              YES
            </Button>
            <Button
              onPress={() => {
                setVisible(false);
              }}
              isLoading={loading}
              color={"warning.500"}
            >
              NO
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
