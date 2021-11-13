import {
  Avatar,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  Tag,
  TagLabel,
  VStack,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

import CardMedia from "./custom/CardMedia";

type Meme = {
  image: string;
  name: string;
  avatar: string;
  owner: string;
  description: string;
  website: string;
  whitepaper: string;
  social: {
    github: string;
  };
  upvotes: string[];
  downvotes: string[];
  created: string;
};

function MemeCard({ meme }: { meme: Meme }) {
  const router = useRouter();

  function openMeme() {
    router.push("/meme/example");
  }

  return (
    <CardMedia>
      <VStack px="6" align="left" w="full">
        <Heading fontSize="2xl">{meme.name}</Heading>
        <Text fontSize="xs">Created on {meme.created}</Text>
        <Flex align="center">
          <Avatar mr="0.5rem" boxSize="1.5em" src={meme.avatar} />
          <Text fontSize="sm">{meme.owner}</Text>
        </Flex>
        <Text noOfLines={2}>{meme.description}</Text>
        <Spacer />
        <Flex direction="column" fontSize="xs" w="full">
          <Stack direction="row" justifyContent="space-between">
            <Stack spacing={0} align="center">
              <Tag
                size="lg"
                w="110px"
                colorScheme="green"
                borderRadius="full"
                cursor="pointer"
              >
                <HStack w="full" justifyContent="space-between">
                  <FaArrowCircleUp />
                  <TagLabel>{meme.upvotes.length}</TagLabel>
                </HStack>
              </Tag>

              {/* <Text fontWeight={600}>{meme.upvotes.length}</Text>
            <Text fontSize="sm" color="gray.500">
              Upvotes
            </Text> */}
            </Stack>
            <Stack spacing={0} align="center">
              {/* <Text fontWeight={600}>{meme.downvotes.length}</Text>
            <Text fontSize="sm" color="gray.500">
              Downvotes
            </Text> */}
              <Tag
                size="lg"
                w="110px"
                colorScheme="red"
                borderRadius="full"
                cursor="pointer"
              >
                <HStack w="full" justifyContent="space-between">
                  <FaArrowCircleDown />
                  <TagLabel>{meme.downvotes.length}</TagLabel>
                </HStack>
              </Tag>
            </Stack>
          </Stack>
        </Flex>
        <Spacer />
        <Button w="100%" fontSize="md" onClick={() => openMeme()}>
          View Meme
        </Button>
      </VStack>
    </CardMedia>
  );
}

export default MemeCard;
