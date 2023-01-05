import { useNavigation } from "@react-navigation/native";
import { Button, Center, Heading, VStack } from "native-base";
import { useImage } from "../../contexts/ImageContext";

export default function LayoutScreen() {
  const navigation = useNavigation();
  const { setLayout } = useImage();

  const handleFrontal = () => {
    setLayout("Frontal");
    navigation.navigate("FrontalDistance");
  };

  const handleProfile = () => {
    setLayout("Profile");
    navigation.navigate("ProfileDetect");
  };
  return (
    <Center height="full">
      <VStack space={6}>
        <Heading>Pick the picture layout</Heading>
        <Button onPress={handleFrontal}>Frontal</Button>
        <Button onPress={handleProfile}>Profile</Button>
      </VStack>
    </Center>
  );
}
