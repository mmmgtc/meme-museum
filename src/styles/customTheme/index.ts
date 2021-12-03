import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode, Styles } from "@chakra-ui/theme-tools";

import colors from "./colors";

// setup light/dark mode global defaults
const styles: Styles = {
  global: (props) => ({
    body: {
      color: mode("purple.500", "white")(props),
      bg: mode("white", "black")(props),
    },
  }),
};

const baseTheme = {
  colors,
  styles,
  shadows: {
    outline: "none",
  },
  fonts: {
    heading: "Comic Sans MS",
    body: "Comic Sans MS",
  },
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: "bold", // Normally, it is "semibold"
        rounded: "full",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "purple.200",
      },
    },
    Input: {
      baseStyle: {
        border: "1px solid",
        borderColor: "inherit",
        borderRadius: "sm",
        bg: "inherit",
        _hover: {
          borderColor: "purple.300",
        },
        _readOnly: {
          boxShadow: "none !important",
          userSelect: "all",
        },
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed",
        },
        _invalid: {
          borderColor: "pink.300",
        },
        _focus: {
          zIndex: 1,
          borderColor: "purple.300",
          boxShadow: `0 0 0 1px purple.700`,
        },
      },
    },
  },
};
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config, ...baseTheme });

export default theme;
