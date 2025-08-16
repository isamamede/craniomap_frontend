import { Button, Checkbox, Modal } from "native-base";
import { Dispatch, SetStateAction, useState } from "react";
import { IFrontalPredictions } from "../@types/landmarks";
import { IServerProfilePredictions } from "../@types/server";

interface IProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  predictions: IFrontalPredictions | IServerProfilePredictions;
  setPointsToChange: Dispatch<SetStateAction<string[]>>;
  pointsToChange: string[];
}

export default function ChangePointsModal({
  setVisible,
  visible,
  predictions,
  setPointsToChange,
  pointsToChange,
}: IProps) {
  const [iPointsToChange, setIPointsToChange] =
    useState<string[]>(pointsToChange);

  const handleSave = () => {
    setPointsToChange(iPointsToChange);
    setVisible(false);
  };

  return (
    <Modal isOpen={visible} onClose={() => setVisible(false)}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Choose the points you want to change</Modal.Header>
        <Modal.Body>
          <Checkbox.Group onChange={setIPointsToChange} value={iPointsToChange}>
            {Object.keys(predictions).map((key) => (
              <Checkbox mt={2} key={key} value={key}>
                {key}
              </Checkbox>
            ))}
          </Checkbox.Group>
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
