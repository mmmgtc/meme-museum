import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Button,
  Container,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

import { brandColors } from "../../helpers";
import ConnectButton from "../Buttons/ConnectButton";
import LogoIcon from "../Icons/LogoIcon";

// import DiscordButton from "../Buttons/DiscordButton";
// import TwitterButton from "../Buttons/TwitterButton";
// import LogoDarkIcon from "../Icons/LogoDarkIcon";

import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const navBg = "none"; // useColorModeValue("spacelightalpha", "purple.500");
  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const borderColor = useColorModeValue("#8C65F7", "white");
  return (
    <Box as="nav" w="100%" top="0" zIndex={1}>
      <Container
        display="flex"
        px="8"
        py="2"
        maxW="8xl"
        wrap="wrap"
        align="center"
        justify="space-between"
        bg={navBg}
        roundedBottom="3xl"
      >
        {/* <Flex h={16} alignItems="center" justifyContent="space-between"> */}
        <HStack w="full" spacing={8} alignItems="center">
          <Flex _hover={{ cursor: "pointer" }} align="center" mr={5}>
            <Link
              href="https://m-m-m.xyz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Flex _hover={{ cursor: "pointer" }} align="center" mr={5}>
                <LogoIcon size="100px" logoPath="/MMMpurplelogo.png" />
              </Flex>
            </Link>
          </Flex>
          {/* <NextLink href="/">
            <Button
              size="md"
              rounded="full"
              variant="solid"
              bg={bg}
              border={`solid 4px ${borderColor}`}
              color={color}
              _hover={{
                bg: brandColors.darkPurple,
                color: "white",
              }}
            >
              MEMES
            </Button>
          </NextLink>
          <NextLink href="/about">
            <Button
              size="md"
              rounded="full"
              variant="solid"
              bg={bg}
              border={`solid 4px ${borderColor}`}
              color={color}
              _hover={{
                bg: brandColors.darkPurple,
                color: "white",
              }}
            >
              ABOUT
            </Button>
          </NextLink> */}
        </HStack>

        <Flex alignItems="center" w="full">
          <Stack direction="row" spacing={3} w="full">
            <ConnectButton />
            <ThemeToggle />
          </Stack>
        </Flex>
        {/* </Flex> */}
      </Container>
    </Box>
  );
}
export default Navbar;
