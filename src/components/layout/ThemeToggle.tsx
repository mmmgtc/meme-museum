import {
  IconButton,
  Avatar,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFrog } from "react-icons/fa";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

import { brandColors } from "../../helpers";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const borderColor = useColorModeValue("#8C65F7", "white");

  return (
    <IconButton
      rounded="full"
      variant="solid"
      border={`solid 4px ${borderColor}`}
      color={color}
      _hover={{
        bg: brandColors.darkPurple,
        color: "white",
      }}
      bg={bg}
      size="md"
      aria-label="theme toggle"
      onClick={toggleColorMode}
      icon={
        <Avatar
          rounded="full"
          variant="solid"
          border={`solid 4px ${borderColor}`}
          color={color}
          _hover={{
            bg: brandColors.darkPurple,
          }}
          aria-label="theme toggle"
          size="md"
          h="40px"
          w="40px"
          objectFit="contain"
          src={colorMode === "light" ? "/dark_theme.png" : "/light_theme.png"}
        />
      }
    />
  );
};

export default ThemeToggle;
