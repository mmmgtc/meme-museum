import {
  Badge,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  Tag,
  TagLabel,
  VStack,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import Blockies from "react-blockies";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

import { Web3Context } from "../contexts/Web3Provider";
import { getSlicedAddress } from "../helpers";

import CardMedia from "./custom/CardMedia";

function MemeCard({ meme }: { meme: any }) {
  const router = useRouter();
  const { account } = useContext(Web3Context);
  const authHeaderKey = "Authorization";
  const headers = localStorage
    ? {
      [authHeaderKey]: localStorage.getItem("Authorization") || "",
    }
    : {};

  const handleUpvote = async () => {
    const upvoteMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/memes/${meme.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          upvotes: [...meme.upvotes, account],
        }),
        headers,
      }
    );
    const upvotedMeme = await upvoteMemeResponse.json();
    console.log({ upvotedMeme });
  };
  const handleDownvote = async () => {
    const downvoteMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/memes/${meme.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          downvotes: [...meme.downvotes, account],
        }),
        headers,
      }
    );
    const downvotedMeme = await downvoteMemeResponse.json();
    console.log({ downvotedMeme });
  };
  const openMeme = () => {
    router.push("/meme/example");
  };

  const createdAt = meme.created ?? new Date().toDateString().toUpperCase();

  return (
    <CardMedia>
      <VStack p="6" align="left" w="full">
        <Heading fontSize="2xl">{meme.title}</Heading>
        <Text fontSize="xs">CREATED ON: {createdAt.toUpperCase()}</Text>
        <Text fontSize="xs">POASTER:</Text>
        <Flex align="center">
          {meme.poaster && (
            <Badge
              rounded="full"
              variant="outline"
              border="none"
              px={2}
              py={1}
              fontWeight="400"
            >
              <HStack>
                <Blockies
                  size={10}
                  seed={meme.poaster.username.toLowerCase()}
                  className="blockies"
                  scale={4}
                />
                <Text isTruncated>{meme.poaster.username}</Text>
              </HStack>
            </Badge>
          )}
        </Flex>
        <Text noOfLines={2}>
          {meme.description || "This meme has no story, no soul!"}
        </Text>
        <Spacer />
        {meme.tags && meme.tags.length > 0 && (
          <SimpleGrid columns={4} spacing={2} w="fit-content">
            {meme.tags.map(({ name }: { name: string }) => (
              <Tag rounded="full" size="md" key={name}>
                <TagLabel fontWeight="bold" alt={name}>
                  {name.toUpperCase()}
                </TagLabel>
              </Tag>
            ))}
          </SimpleGrid>
        )}
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
                onClick={handleUpvote}
              >
                <HStack w="full" justifyContent="space-between">
                  <FaArrowCircleUp />
                  <TagLabel>{meme.upvotes}</TagLabel>
                </HStack>
              </Tag>
            </Stack>
            <Stack spacing={0} align="center">
              <Tag
                size="lg"
                w="110px"
                colorScheme="red"
                borderRadius="full"
                cursor="pointer"
                onClick={handleDownvote}
              >
                <HStack w="full" justifyContent="space-between">
                  <FaArrowCircleDown />
                  <TagLabel>{meme.downvotes}</TagLabel>
                </HStack>
              </Tag>
            </Stack>
          </Stack>
        </Flex>
        <Spacer />
        <Button
          w="100%"
          rounded="full"
          _hover={{
            background: "purple.700",
          }}
          color="white"
          bg="purple.200"
          fontSize="md"
          onClick={() => openMeme()}
        >
          VIEW MEME
        </Button>
      </VStack>
    </CardMedia>
  );
}

export default MemeCard;
