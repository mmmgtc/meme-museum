import {
  Box,
  Flex,
  HStack,
  Stack,
  Heading,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

import ConnectButton from "../Buttons/ConnectButton";

// import DiscordButton from "../Buttons/DiscordButton";
// import TwitterButton from "../Buttons/TwitterButton";
// import LogoDarkIcon from "../Icons/LogoDarkIcon";

import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const headingColor = "purple.200"; // useColorModeValue("white", "purple.200");
  const navBg = "none"; // useColorModeValue("spacelightalpha", "spacelightpurple");
  return (
    <Box px={4} as="nav" w="100%" top="0" zIndex={1}>
      <Container
        display="flex"
        p={2}
        maxW="7xl"
        wrap="wrap"
        align="center"
        justify="space-between"
        bg={navBg}
        rounded="3xl"
      >
        {/* <Flex h={16} alignItems="center" justifyContent="space-between"> */}
        <HStack w="full" spacing={8} alignItems="center">
          <Flex _hover={{ cursor: "pointer" }} align="center" mr={5}>
            <NextLink href="/">
              <Flex _hover={{ cursor: "pointer" }} align="center" mr={5}>
                <Heading fontSize="lg" color={headingColor}>
                  MEMES.PARTY
                </Heading>
              </Flex>
            </NextLink>
          </Flex>
        </HStack>
        <Flex alignItems="center">
          <Stack direction="row" spacing={3}>
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
