import { Center, Spinner } from "native-base";

export default function Loading() {
  return (
    <Center
      height={"full"}
      width="full"
      position={"absolute"}
      style={{ position: "absolute", zIndex: 100 }}
      backgroundColor="dark.50:alpha.50"
    >
      <Spinner
        accessibilityLabel="Loading predictions"
        color={"primary"}
        size="lg"
      />
    </Center>
  );
}
