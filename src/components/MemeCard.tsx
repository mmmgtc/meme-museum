import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  Tag,
  TagLabel,
  VStack,
  Stack,
  HStack,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Blockies from "react-blockies";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

import { Web3Context } from "../contexts/Web3Provider";
import { getSlicedAddress } from "../helpers";

import Card from "./custom/Card";
import CardMedia from "./custom/CardMedia";

function MemeCard({ meme }: { meme: any }) {
  const router = useRouter();
  const [updatedMeme, setUpdatedMeme] = useState(meme);

  const { account } = useContext(Web3Context);
  const [headers, setHeaders] = useState<{
    Authorization: string;
    [key: string]: string;
  }>();

  useEffect(() => {
    // Perform localStorage action
    const token = localStorage.getItem("Authorization");
    if (token) {
      setHeaders({
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      });
    }
  }, []);

  const handleUpvote = async () => {
    console.log({ headers });
    const upvoteMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/upvote/`,
      {
        method: "POST",
        body: JSON.stringify({
          id: updatedMeme.id,
        }),
        headers,
      }
    );
    const upvotedMeme = await upvoteMemeResponse.json();
    console.log({ upvotedMeme });
    setUpdatedMeme(upvotedMeme);
  };
  const handleDownvote = async () => {
    const downvoteMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/downvote/`,
      {
        method: "POST",
        body: JSON.stringify({
          id: updatedMeme.id,
        }),
        headers,
      }
    );
    const downvotedMeme = await downvoteMemeResponse.json();
    console.log({ downvotedMeme });
    setUpdatedMeme(downvotedMeme);
  };

  const openMeme = () => {
    router.push(`/meme/${updatedMeme.id}`);
  };

  const createdAt =
    updatedMeme.created_at ?? new Date().toDateString().toUpperCase();

  return (
    <Card bg="spacepink" color="purple.200">
      <Image
        rounded="3xl"
        minH="100px"
        w="full"
        maxH="600px"
        // objectFit="contain"
        src={meme.image}
        objectFit="cover"
      />
      <Flex w="full" direction="column" py="6" color="white" fontWeight="bold">
        <Text fontSize="2xl">{updatedMeme.title}</Text>
        <Text noOfLines={2} fontSize="xl">
          {updatedMeme.description || "This meme has no story, no soul!"}
        </Text>
        <Text fontSize="xs">CREATED ON: {createdAt.toUpperCase()}</Text>
        <Text fontSize="xs">POASTER:</Text>
        <Flex
          align="center"
          w={{
            sm: "full",
            md: "fit-content",
          }}
          py="2"
        >
          {updatedMeme.poaster && (
            <Badge
              rounded="full"
              variant="outline"
              w="full"
              border="none"
              px={2}
              py={1}
              fontWeight="400"
            >
              <HStack w="full">
                <Blockies
                  size={10}
                  seed={updatedMeme.poaster.username.toLowerCase()}
                  className="blockies"
                  scale={4}
                />
                <Text isTruncated>{updatedMeme.poaster.username}</Text>
              </HStack>
            </Badge>
          )}
        </Flex>

        <Spacer />
        {updatedMeme.tags && updatedMeme.tags.length > 0 && (
          <Flex wrap="wrap" w="fit-content" py="2" gridGap="2">
            {updatedMeme.tags.map(({ name }) => (
              <Tag flexGrow={1} rounded="full" size="md" key={name}>
                <TagLabel fontWeight="bold" alt={name}>
                  {name.toUpperCase()}
                </TagLabel>
              </Tag>
            ))}
          </Flex>
        )}
        <Spacer />
        <Flex py="6" w="full" justify="space-around">
          <Tag
            w="full"
            colorScheme="green"
            borderRadius="full"
            cursor="pointer"
            mr="6"
            onClick={handleUpvote}
          >
            <HStack p="2" w="full" justifyContent="space-between">
              <FaArrowCircleUp />
              <TagLabel fontWeight="bold">{meme.upvotes}</TagLabel>
            </HStack>
          </Tag>
          <Tag
            w="full"
            colorScheme="red"
            borderRadius="full"
            cursor="pointer"
            onClick={handleDownvote}
          >
            <HStack p="2" w="full" justifyContent="space-between">
              <FaArrowCircleDown />
              <TagLabel fontWeight="bold">{meme.downvotes}</TagLabel>
            </HStack>
          </Tag>
        </Flex>
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
      </Flex>
    </Card>
  );
}

export default MemeCard;
