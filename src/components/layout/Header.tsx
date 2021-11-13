import { Box, Container, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import NextLink from "next/link";

import ConnectButton from "../Buttons/ConnectButton";
import LogoIcon from "../Icons/LogoIcon";

const LinkItem = ({ href, path, _target, children, ...props }: any) => {
  const active = path === href;
  return (
    <NextLink href={href} passHref>
      <Link
        p={2}
        bg={active ? "aqua.400" : undefined}
        color={active ? "aqua.300" : "stone"}
        _target={_target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const Navbar = (props: any) => {
  const { path } = props;

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      top="0"
      bg="spacelightalpha"
      style={{ backdropFilter: "blur(10px)" }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="7xl"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <NextLink href="/">
          <Flex _hover={{ cursor: "pointer" }} align="center" mr={5}>
            <LogoIcon size="25px" />
            <Heading fontSize="lg" pl="2">
              Meme museum
            </Heading>
          </Flex>
        </NextLink>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/memes" path={path}>
            Memes
          </LinkItem>
          <LinkItem href="/leaderboard" path={path}>
            Leaderboard
          </LinkItem>
        </Stack>

        <Flex>
          <ConnectButton />
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
