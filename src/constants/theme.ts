import { extendTheme } from "native-base";
import getColorShade from "../utils/getColorShade";

export const colors = {
  primary: "#FF002B",
};

export const theme = extendTheme({
  colors: {
    primary: {
      50: getColorShade(1, colors.primary),
      100: getColorShade(0.8, colors.primary),
      200: getColorShade(0.6, colors.primary),
      300: getColorShade(0.4, colors.primary),
      400: getColorShade(0.2, colors.primary),
      500: colors.primary,
      600: getColorShade(-0.2, colors.primary),
      700: getColorShade(-0.4, colors.primary),
      800: getColorShade(-0.6, colors.primary),
      900: getColorShade(-0.8, colors.primary),
    },
  },
});
