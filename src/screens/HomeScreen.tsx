import { useNavigation } from "@react-navigation/native";
import { Button, VStack } from "native-base";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleNew = () => {};

  const handleRecord = () => {};
  return (
    <VStack>
      <Button onPress={handleRecord}>Record</Button>
      <Button onPress={handleNew}>Detect New</Button>
    </VStack>
  );
}
