import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  Spacer,
  HStack,
  Text,
  Tag,
  Image,
  TagLabel,
  Avatar,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

import Container from "../../components/layout/Container";

const MemeData = {
  image: "https://pbs.twimg.com/media/FD4GHmPVcAAwufb?format=jpg&name=large",
  avatar: "https://siasky.net/AAB-yQ5MuGLqpb5fT9w0gd54RbDfRS9sZDb2aMx9NeJ8QA",
  owner: "huxwell.eth",
  name: "Meme Alpha",
  description:
    "This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.",
  website: "https://www.google.com",
  whitepaper: "https://www.google.com",
  social: {
    github: "https://github.com",
  },
  upvotes: ["0x"],
  downvotes: ["0x"],
  created: "2021-09-13",
};

function MemePage() {
  const meme = MemeData;

  return (
    <Container>
      <Image w="full" src={meme.image} objectFit="cover" />
      <Flex w="full">
        <Heading>{meme.name}</Heading>
        <Spacer />
        <NextLink href="/create-meme" passHref>
          <Button rightIcon={<EditIcon />}>Edit Meme</Button>
        </NextLink>
      </Flex>

      <Flex direction="column" pt="4">
        <Flex align="center">
          <Avatar mr="0.5rem" boxSize="1.5em" src={meme.avatar} />
          <Text fontSize="sm">by {meme.owner}</Text>
        </Flex>
        <Text fontSize="xs">Created on {meme.created}</Text>
        <Text pt="8">{meme.description}</Text>
        <Flex pt="12" w="full" justify="space-around">
          <Tag
            w="110px"
            colorScheme="green"
            borderRadius="full"
            cursor="pointer"
          >
            <HStack p="2" w="full" justifyContent="space-between">
              <FaArrowCircleUp />
              <TagLabel>{meme.upvotes.length}</TagLabel>
            </HStack>
          </Tag>
          <Tag w="110px" colorScheme="red" borderRadius="full" cursor="pointer">
            <HStack p="2" w="full" justifyContent="space-between">
              <FaArrowCircleDown />
              <TagLabel>{meme.downvotes.length}</TagLabel>
            </HStack>
          </Tag>
        </Flex>
      </Flex>
    </Container>
  );
}

export default MemePage;
