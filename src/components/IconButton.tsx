import { FontAwesome } from "@expo/vector-icons";
import { IconButton as NBIconButton } from "native-base";
import React from "react";

type TIconName = React.ComponentProps<typeof FontAwesome>["name"];

interface IProps
  extends Omit<React.ComponentProps<typeof NBIconButton>, "_icon"> {
  name: TIconName;
  _icon?: Omit<
    React.ComponentProps<typeof NBIconButton>["_icon"],
    "as" | "name"
  >;
}

export function IconButton({ name, _icon, ...props }: IProps) {
  return (
    <NBIconButton
      _icon={{
        ..._icon,
        as: FontAwesome,
        name,
      }}
      {...props}
    />
  );
}
