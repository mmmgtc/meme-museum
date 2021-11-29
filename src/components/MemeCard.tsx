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
  Box,
  HStack,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Blockies from "react-blockies";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

import { Web3Context } from "../contexts/Web3Provider";
import { brandColors, getSlicedAddress, W_FIT_CONTENT } from "../helpers";

import Card from "./custom/Card";
import CardMedia from "./custom/CardMedia";

function MemeCard({ meme }: { meme: any }) {
  const router = useRouter();
  const { staticProvider } = useContext(Web3Context);
  const [updatedMeme, setUpdatedMeme] = useState(meme);
  const [ens, setENS] = useState<string | null>(null);

  const [headers, setHeaders] = useState<{
    Authorization: string;
    [key: string]: string;
  }>();

  useEffect(() => {
    // Address to ENS
    async function getENS() {
      if (
        staticProvider &&
        updatedMeme?.poaster &&
        updatedMeme.poaster.username
      ) {
        try {
          const resolvedENS = await staticProvider.lookupAddress(
            updatedMeme.poaster.username
          );
          console.log({ resolvedENS });
          setENS(resolvedENS);
        } catch (error) {
          console.log({ error });
          setENS(null);
        }
      }
    }
    getENS();
  }, [updatedMeme?.poaster, staticProvider]);

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

  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const badgeBorderColor = useColorModeValue("#8C65F7", "white");
  return (
    <Card bg={bg} color={color}>
      <Image
        rounded="3xl"
        minH="100px"
        w="full"
        h="300px"
        objectFit="contain"
        src={meme.image}
      />
      <Flex w="full" direction="column" py="6" fontWeight="bold">
        <Text fontSize="2xl">{updatedMeme.title}</Text>
        <Text noOfLines={2} fontSize="xl">
          {updatedMeme.description || "This meme has no story, no soul!"}
        </Text>

        <Flex
          align="center"
          w={{
            sm: "full",
            md: W_FIT_CONTENT,
          }}
          py="2"
        >
          {updatedMeme.poaster && (
            <Badge
              rounded="full"
              color={color}
              bg="none"
              border={`solid 1px ${badgeBorderColor}`}
              w={{
                base: "full",
                md: W_FIT_CONTENT,
              }}
              pr={4}
              py={2}
              fontWeight="400"
            >
              <HStack
                w={{
                  sm: "full",
                  md: W_FIT_CONTENT,
                }}
              >
                <Blockies
                  size={10}
                  seed={updatedMeme.poaster.username.toLowerCase()}
                  className="blockies"
                  scale={4}
                />
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  w="full"
                >
                  <HStack w="full">
                    <Text
                      fontSize="xs"
                      isTruncated
                      display={["none", "none", "flex", "flex"]}
                    >
                      CREATED ON
                    </Text>
                    <Text fontWeight="bold" isTruncated pr="2">
                      {new Date(updatedMeme.created_at)
                        .toDateString()
                        .toUpperCase()}
                    </Text>
                  </HStack>
                  <HStack w="full">
                    <Text
                      fontSize="xs"
                      display={["none", "none", "flex", "flex"]}
                    >
                      BY
                    </Text>
                    <Text
                      fontWeight="bold"
                      isTruncated
                      display={["none", "none", "flex", "flex"]}
                    >
                      {ens || updatedMeme.poaster.username}
                    </Text>
                    <Text
                      fontWeight="bold"
                      isTruncated
                      display={["flex", "flex", "none", "none"]}
                    >
                      {ens || getSlicedAddress(updatedMeme.poaster.username)}
                    </Text>
                  </HStack>
                </Flex>
              </HStack>
            </Badge>
          )}
        </Flex>

        <Spacer />
        {updatedMeme.tags && updatedMeme.tags.length > 0 && (
          <Flex wrap="wrap" w={W_FIT_CONTENT} py="2" gridGap="2">
            {updatedMeme.tags.map(({ name }) => (
              <Tag flexGrow={1} rounded="full" size="md" key={name}>
                <TagLabel fontWeight="bold" color={color} alt={name}>
                  {name.toUpperCase()}
                </TagLabel>
              </Tag>
            ))}
          </Flex>
        )}
        <Spacer />
        <Flex py="6" w="full" justify="space-between">
          <Tag
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
            background: "white",
            color: brandColors.mainPurple,
          }}
          color={bg}
          bg={color}
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
