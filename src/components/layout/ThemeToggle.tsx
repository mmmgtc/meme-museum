import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

import { brandColors } from "../../helpers";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const altColor = useColorModeValue("white", brandColors.darkPurple);
  const borderColor = useColorModeValue("#8C65F7", "white");

  return (
    <IconButton
      rounded="full"
      variant="solid"
      bg="purple.200"
      border={`solid 5px ${borderColor}`}
      color="white"
      _hover={{
        bg: altColor,
        color,
      }}
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
