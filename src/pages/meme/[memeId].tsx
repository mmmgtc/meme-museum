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
  useColorModeValue,
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
import { brandColors, getSlicedAddress, W_FIT_CONTENT } from "../../helpers";

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
  const { account, staticProvider } = useContext(Web3Context);
  const [meme, setMeme] = useState(prefetchedMeme);
  const [headers, setHeaders] = useState<{
    Authorization: string;
    [key: string]: string;
  }>();

  const [ens, setENS] = useState<string | null>(null);
  useEffect(() => {
    // Address to ENS
    async function getENS() {
      if (staticProvider && meme?.poaster && meme.poaster.username) {
        try {
          const resolvedENS = await staticProvider.lookupAddress(
            meme.poaster.username
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
  }, [meme?.poaster, staticProvider]);
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
  const bg = useColorModeValue("white", brandColors.mainPurple);
  const badgeColor = useColorModeValue(brandColors.mainPurple, "white");
  const color = "white";

  return (
    <Card bg={bg} color={color}>
      <Container>
        <Image maxH="600px" src={meme.image} objectFit="cover" rounded="3xl" />
        <Flex w="full">
          <Spacer />
          {meme.poaster.username === account && (
            <NextLink href="/edit-meme" passHref>
              <Button
                rounded="full"
                color={color}
                bg={bg}
                // onClick={onOpen}
                _hover={{
                  background: "white",
                  color: brandColors.mainPurple,
                }}
                leftIcon={<EditIcon />}
              >
                EDIT MEME
              </Button>
            </NextLink>
          )}
        </Flex>

        <Flex w="full" direction="column" pt="4" fontWeight="bold">
          <Text fontSize="4xl" py="2">
            {meme.title}
          </Text>
          <Text noOfLines={2} fontSize="2xl" py="2">
            {meme.description || "This meme has no story, no soul!"}
          </Text>
          <Flex
            align="center"
            w={{
              sm: "full",
              md: W_FIT_CONTENT,
            }}
            py="2"
          >
            {meme.poaster && (
              <Badge
                rounded="full"
                color="white"
                bg="none"
                border="solid 1px white"
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
                    seed={meme.poaster.username.toLowerCase()}
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
                        {new Date(meme.created_at).toDateString().toUpperCase()}
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
                        {ens || meme.poaster.username}
                      </Text>
                      <Text
                        fontWeight="bold"
                        isTruncated
                        display={["flex", "flex", "none", "none"]}
                      >
                        {ens || getSlicedAddress(meme.poaster.username)}
                      </Text>
                    </HStack>
                  </Flex>
                </HStack>
              </Badge>
            )}
          </Flex>

          {meme.tags && meme.tags.length > 0 && (
            <Flex wrap="wrap" w={W_FIT_CONTENT} py="2" gridGap="2">
              {meme.tags.map(({ name }) => (
                <Tag flexGrow={1} rounded="full" size="md" key={name}>
                  <TagLabel fontWeight="bold" color={badgeColor} alt={name}>
                    {name.toUpperCase()}
                  </TagLabel>
                </Tag>
              ))}
            </Flex>
          )}
          <Flex pt="6" w="full" justify="space-between">
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
        </Flex>
      </Container>
    </Card>
  );
}

export default MemePage;
