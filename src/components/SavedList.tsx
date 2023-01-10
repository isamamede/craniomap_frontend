import {
  Box,
  FlatList,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { TParticipant } from "../@types/database";
import { IconButton } from "./IconButton";

interface IProps {
  data: TParticipant[];
  handleDelete: (_id: string) => {};
  onPress?: (_id: string) => void;
}

export default function SavedList({ data, handleDelete, onPress }: IProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Box
          borderBottomWidth="1"
          _dark={{
            borderColor: "muted.50",
          }}
          borderColor="muted.800"
          pl={["0", "4"]}
          pr={["0", "5"]}
          py="2"
        >
          <HStack space={[2, 3]} justifyContent="space-between">
            <Pressable onPress={() => (onPress ? onPress(item._id) : null)}>
              {({ isPressed, isHovered }) => (
                <VStack
                  bgColor={
                    isPressed
                      ? "gray.200"
                      : isHovered
                      ? "gray.100"
                      : "transparent"
                  }
                >
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.name}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.created_at.toLocaleString()}
                  </Text>
                </VStack>
              )}
            </Pressable>
            <Spacer />
            <IconButton
              variant={"ghost"}
              name={"trash-o"}
              _icon={{
                color: "coolGray.500",
                size: "sm",
              }}
              _hover={{
                color: "red.50",
              }}
              _pressed={{
                color: "red.50",
              }}
              onPress={() => handleDelete(item._id)}
            />
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item._id}
    />
  );
}
