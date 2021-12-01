import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaFrog } from "react-icons/fa";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

import { brandColors } from "../../helpers";

const ThemeToggle = () => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const borderColor = useColorModeValue("#8C65F7", "white");

  return (
    <IconButton
      rounded="full"
      variant="solid"
      bg={bg}
      border={`solid 4px ${borderColor}`}
      color={color}
      _hover={{
        bg: brandColors.darkPurple,
        color: "white",
      }}
      aria-label="theme toggle"
      icon={<FaFrog />}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeToggle;
