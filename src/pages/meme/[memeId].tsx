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
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import React, { useEffect, useState, useContext } from "react";
import Blockies from "react-blockies";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

import { MemeType } from "..";
import Card from "../../components/custom/Card";
import Layout from "../../components/layout";
import Container from "../../components/layout/Container";
import { Web3Context } from "../../contexts/Web3Provider";

type Props = {
  memeId: string | null;
};

export const getServerSideProps: GetStaticProps<Props, { memeId: string }> =
  async (ctx) => {
    const memeId = ctx.params?.memeId ?? null;
    if (memeId === null) {
      return {
        redirect: { destination: "/", permanent: true },
      };
    }
    const memeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/memes/${memeId}/`,
      { method: "GET" }
    );
    const fetchedMeme = await memeResponse.json();
    console.log({ fetchedMeme });
    return {
      props: { id: memeId, ...fetchedMeme },
    };
  };

function MemePage(prefetchedMeme: MemeType) {
  const [meme, setMeme] = useState(prefetchedMeme);
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
          id: meme.id,
        }),
        headers,
      }
    );
    const upvotedMeme = await upvoteMemeResponse.json();
    console.log({ upvotedMeme });
    setMeme(upvotedMeme);
  };
  const handleDownvote = async () => {
    const downvoteMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/downvote/`,
      {
        method: "POST",
        body: JSON.stringify({
          id: meme.id,
        }),
        headers,
      }
    );
    const downvotedMeme = await downvoteMemeResponse.json();
    console.log({ downvotedMeme });
    setMeme(downvotedMeme);
  };

  return (
    <Card bg="spacepink">
      <Container>
        <Image w="full" src={meme.image} objectFit="cover" />
        <Flex w="full">
          <Spacer />
          {meme.poaster.username === account && (
            <NextLink href="/edit-meme" passHref>
              <Button
                rounded="full"
                color="white"
                bg="purple.200"
                // onClick={onOpen}
                _hover={{
                  background: "purple.700",
                }}
                leftIcon={<EditIcon />}
              >
                EDIT MEME
              </Button>
            </NextLink>
          )}
        </Flex>

        <Flex
          w="full"
          direction="column"
          pt="4"
          color="white"
          fontWeight="bold"
        >
          <Text fontSize="4xl" py="2">
            {meme.title}
          </Text>
          <Text noOfLines={2} fontSize="2xl" py="2">
            {meme.description || "This meme has no story, no soul!"}
          </Text>
          <Text fontSize="xs" py="2">
            CREATED ON: {meme.created_at.toUpperCase()}
          </Text>
          <Text fontSize="xs" py="2">
            POASTER:
          </Text>
          <Flex
            align="center"
            w={{
              sm: "full",
              md: "fit-content",
            }}
            py="2"
          >
            {meme.poaster && meme.poaster.username && (
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
                    seed={meme.poaster.username.toLowerCase()}
                    className="blockies"
                    scale={4}
                  />
                  <Text isTruncated>{meme.poaster.username}</Text>
                </HStack>
              </Badge>
            )}
          </Flex>

          {meme.tags && meme.tags.length > 0 && (
            <Flex wrap="wrap" w="fit-content" py="2" gridGap="2">
              {meme.tags.map(({ name }) => (
                <Tag flexGrow={1} rounded="full" size="md" key={name}>
                  <TagLabel fontWeight="bold" alt={name}>
                    {name.toUpperCase()}
                  </TagLabel>
                </Tag>
              ))}
            </Flex>
          )}
          <Flex pt="6" w="full" justify="space-around">
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
        </Flex>
      </Container>
    </Card>
  );
}

export default MemePage;
