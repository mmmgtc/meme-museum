/* eslint-disable complexity */
import { CheckIcon, DeleteIcon, LinkIcon } from "@chakra-ui/icons";
import { Spacer } from "@chakra-ui/layout";
import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tag,
  TagLabel,
  Text,
  useClipboard,
  useColorModeValue,
  VStack,
  Link,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Blockies from "react-blockies";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

import { Web3Context } from "../contexts/Web3Provider";
import {
  brandColors,
  getSlicedAddress,
  MemeType,
  W_FIT_CONTENT,
} from "../helpers";

function MemeModal({
  meme,
  isOpen,
  onClose,
  handleUpvote,
  handleDelete,
  handleDownvote,
  setPreOpenedMemeId,
}: {
  meme: any;
  isOpen: boolean;
  onClose: any;
  handleDelete: (meme: MemeType) => void;
  handleUpvote?: any;
  handleDownvote?: any;
  setPreOpenedMemeId: Dispatch<SetStateAction<number | null>>;
}) {
  const { account, staticProvider, headers } = useContext(Web3Context);
  const { hasCopied, onCopy } = useClipboard(
    `${window.location.protocol}//${window.location.hostname}/?meme=${meme.id}`
  );

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [ens, setENS] = useState<string | null>(null);

  const router = useRouter();

  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const borderColor = useColorModeValue("#8C65F7", "white");
  const altColor = useColorModeValue("white", brandColors.darkPurple);

  // const ipfsId = meme.image.toString().includes("ipfs.io")
  //   ? meme.image.toString().substring(21)
  //   : meme.image.toString().substring(8, meme.image.toString().length - 15);

  const newSrc = `https://d2wwrm96vfy3z4.cloudfront.net/image?width=800&url=${meme.image}`;

  useEffect(() => {
    // Address to ENS
    async function getENS() {
      if (staticProvider && meme?.poaster && meme.poaster.username) {
        try {
          const resolvedENS = await staticProvider.lookupAddress(
            meme.poaster.username
          );
          setENS(resolvedENS);
        } catch (error) {
          console.log({ error });
          setENS(null);
        }
      }
    }
    getENS();
  }, [meme?.poaster, staticProvider]);

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      const memesResponse = await fetch(
        `https://evening-anchorage-43225.herokuapp.com/museum/memes/${meme.id}`,
        {
          method: "DELETE",
          headers,
        }
      );
      console.log({ memesResponse });
      handleDelete(meme);
    } catch (error) {
      setIsDeleting(false);
      console.log("ERROR while deleting meme", { error });
    }
  };

  const MemeDescription = ({
    title,
    result,
    onClick,
  }: {
    title: string;
    result: string;
    onClick?: () => void;
  }) => {
    return (
      <HStack w="full" justifyContent="space-between" alignItems="flex-start">
        <Text>{title}</Text>
        <Text
          textDecorationLine={onClick ? "underline" : "none"}
          cursor={onClick ? "pointer" : "default"}
          onClick={onClick}
        >
          {result}
        </Text>
      </HStack>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setPreOpenedMemeId(null);
        if (router.query.search !== undefined && router.query.search !== null) {
          router.replace(`/?search=${router.query.search}`, undefined, {
            shallow: true,
          });
        } else if (router.route === "/") {
          router.replace("/", undefined, { shallow: true });
        }
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent
        rounded="3xl"
        color={color}
        bg={bg}
        border={`solid 5px ${borderColor}`}
        position="relative"
        overflow="hidden"
      >
        <ModalHeader
          display="flex"
          justifyContent="space-between"
          marginRight="10"
        >
          <Heading
            flexWrap="wrap"
            color={color}
            fontSize={meme.title.length > 20 ? "20px" : "26px"}
          >
            {meme.title.length > 20
              ? `${meme.title.substring(0, 20)}...`
              : meme.title}
          </Heading>

          <Button
            onClick={onCopy}
            w="max-content"
            rounded="full"
            size="md"
            variant="solid"
            bg="purple.200"
            border={`solid 5px ${borderColor}`}
            color="white"
            _hover={{
              color: "white",
            }}
            leftIcon={hasCopied ? <CheckIcon /> : <LinkIcon />}
          >
            {hasCopied ? "COPIED" : "COPY"}
          </Button>
          <ModalCloseButton
            border={`solid 5px ${borderColor}`}
            color={color}
            mt="2"
            mr="2"
            cursor="pointer"
            p="15px"
          />
        </ModalHeader>
        <ModalBody>
          <Image
            w="full"
            maxH="xl"
            src={newSrc}
            objectFit="contain"
            fallbackSrc="/404FACE.png"
          />
          {/* <Flex w="full" pt="6"> */}
          {/* <Flex w="full" justify="space-around" alignItems="center"> */}
          {/* <Button
                leftIcon={<FaArrowCircleUp color="#9AE6B4" fontSize="1.7rem" />}
                rounded="full"
                size="md"
                variant="solid"
                border="solid 5px #9AE6B4"
                color={color}
                _hover={{
                  background: "purple.500",
                  color,
                }}
                onClick={() => handleUpvote(meme.id)}
              >
                {meme.upvotes}
              </Button>
              <Button
                leftIcon={
                  <FaArrowCircleDown color="#FEB2B2" fontSize="1.7rem" />
                }
                rounded="full"
                size="md"
                variant="solid"
                border="solid 5px #FEB2B2"
                color={color}
                _hover={{
                  background: "purple.500",
                  color,
                }}
                onClick={() => handleDownvote(meme.id)}
              >
                {meme.downvotes}
              </Button> */}
          {/* {account && meme.poaster && meme.poaster?.username === account && (
                <Button
                  rounded="full"
                  size="md"
                  variant="solid"
                  bg="purple.200"
                  border={`solid 5px ${borderColor}`}
                  color="white"
                  _hover={{
                    bg: altColor,
                    color,
                  }}
                  isLoading={isDeleting}
                  onClick={onDelete}
                  leftIcon={<DeleteIcon />}
                >
                  DELETE MEME
                </Button>
              )} */}
          {/* </Flex> */}
          {/* <Button
              onClick={onCopy}
              w="140px"
              rounded="full"
              size="md"
              variant="solid"
              bg="purple.200"
              border={`solid 5px ${borderColor}`}
              color="white"
              _hover={{
                bg: altColor,
                color,
              }}
              leftIcon={hasCopied ? <CheckIcon /> : <LinkIcon />}
            >
              {hasCopied ? "COPIED" : "COPY"}
            </Button> */}

          {/* {account && meme.poaster && meme.poaster?.username === account && (
              <NextLink href="/edit-meme" passHref>
                <Button
                  rounded="full"
                  size="md"
                  variant="solid"
                  bg="purple.200"
                  border={`solid 5px ${borderColor}`}
                  color="white"
                  _hover={{
                    bg: altColor,
                    color,
                  }}
                  // onClick={onOpen}
                  leftIcon={<EditIcon />}
                >
                  EDIT MEME
                </Button>
              </NextLink>
            )} */}
          {/* </Flex> */}

          <Flex
            w="full"
            direction="column"
            pt="4"
            fontWeight="bold"
            gridGap="1"
            fontSize="lg"
          >
            <MemeDescription
              title="Created on: "
              result={new Date(meme.created_at)
                .toLocaleDateString()
                .toUpperCase()}
            />
            <MemeDescription
              title="Created by:"
              result={
                ens ||
                `${meme.poaster.username.substring(
                  0,
                  4
                )}...${meme.poaster.username.substring(
                  meme.poaster.username.length - 4
                )}`
              }
              onClick={() => router.push(`profile/${meme.poaster.username}`)}
            />
            <MemeDescription
              title="Credits:"
              result={meme.meme_lord.replace("Posted on Discord by", "")}
            />

            {meme.tags && meme.tags.length > 0 && (
              <Flex wrap="wrap" w={W_FIT_CONTENT} pt="2" gridGap="2">
                {meme.tags.map(({ name }) => (
                  <Tag flexGrow={1} rounded="full" size="md" key={name}>
                    <TagLabel
                      cursor="pointer"
                      fontWeight="bold"
                      onClick={() => {
                        setPreOpenedMemeId(null);
                        router.push(`/?search=${name.toUpperCase()}`);
                        onClose();
                      }}
                      color={color}
                      alt={name}
                    >
                      #{name.toUpperCase()}
                    </TagLabel>
                  </Tag>
                ))}
              </Flex>
            )}
            <Text py="2" textTransform="none" whiteSpace="break-spaces">
              {meme.description}
            </Text>
          </Flex>
        </ModalBody>
        <Flex
          zIndex={10}
          w="full"
          h="max-content"
          style={{ marginTop: 0 }}
          bottom="0"
          left="0"
        >
          <Button
            leftIcon={<FaArrowCircleUp color="#ffffff" fontSize="1.7rem" />}
            rounded="none"
            p="2"
            h="full"
            w="full"
            backgroundColor="#0bae44"
            color="white"
            _hover={{
              background: "#3dd573",
              color: "white",
            }}
            onClick={(e) => {
              handleUpvote(meme.id);
            }}
          >
            {meme.upvotes}
          </Button>
          <Button
            leftIcon={<FaArrowCircleDown color="#ffffff" fontSize="1.7rem" />}
            rounded="none"
            p="2"
            h="full"
            w="full"
            color="white"
            backgroundColor="#ef5959"
            _hover={{
              background: "#f27c7c",
              color: "white",
            }}
            onClick={(e) => {
              handleDownvote(meme.id);
            }}
          >
            {meme.downvotes}
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default MemeModal;
