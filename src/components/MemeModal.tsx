import { EditIcon } from "@chakra-ui/icons";
import {
  HStack,
  Heading,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  Image,
  Container,
  useColorModeValue,
  Text,
  Tag,
  TagLabel,
  Badge,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Blockies from "react-blockies";
import { FormProvider, useForm } from "react-hook-form";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

import { Web3Context } from "../contexts/Web3Provider";
import { brandColors, W_FIT_CONTENT, getSlicedAddress } from "../helpers";
import CreateMemePage from "../views/CreateMemePage";
import TagsField from "../views/TagsField";
import Card from "components/custom/Card";

import CenteredFrame from "./layout/CenteredFrame";

function MemeModal({
  meme,
  isOpen,
  onClose,
  handleUpvote,
  handleDownvote,
}: {
  meme: any;
  isOpen: boolean;
  onClose: any;
  handleUpvote?: any;
  handleDownvote?: any;
}) {
  console.log({ meme });
  const { account, staticProvider } = useContext(Web3Context);
  const [ens, setENS] = useState<string | null>(null);

  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const borderColor = useColorModeValue("#8C65F7", "white");
  const altColor = useColorModeValue("white", brandColors.darkPurple);

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent
        rounded="3xl"
        color={color}
        bg={bg}
        border={`solid 5px ${borderColor}`}
      >
        <ModalHeader display="flex">
          <Heading color={color}>{meme.title}</Heading>
          <ModalCloseButton
            border={`solid 5px ${borderColor}`}
            color={color}
            mt="4"
            mr="4"
            cursor="pointer"
          />
        </ModalHeader>
        <ModalBody>
          <Image w="full" maxH="xl" src={meme.image} objectFit="contain" />

          <Flex w="full" pt="6">
            <Flex w="full" justify="space-around" alignItems="center">
              <Button
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
              </Button>
            </Flex>
            {account && meme.poaster && meme.poaster?.username === account && (
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
            )}
          </Flex>

          <Flex w="full" direction="column" pt="4" fontWeight="bold">
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
                  color={color}
                  bg={bg}
                  border={`solid 5px ${borderColor}`}
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
                          {new Date(meme.created_at)
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
                    <TagLabel fontWeight="bold" color={color} alt={name}>
                      {name.toUpperCase()}
                    </TagLabel>
                  </Tag>
                ))}
              </Flex>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MemeModal;
