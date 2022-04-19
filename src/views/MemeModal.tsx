import { CheckIcon, LinkIcon } from "@chakra-ui/icons";
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
import { brandColors, getSlicedAddress, W_FIT_CONTENT } from "../helpers";

function MemeModal({
  meme,
  isOpen,
  onClose,
  handleUpvote,
  handleDownvote,
  setPreOpenedMemeId,
}: {
  meme: any;
  isOpen: boolean;
  onClose: any;
  handleUpvote?: any;
  handleDownvote?: any;
  setPreOpenedMemeId: Dispatch<SetStateAction<number | null>>;
}) {
  const { account, staticProvider } = useContext(Web3Context);
  const { hasCopied, onCopy } = useClipboard(
    `${window.location.protocol}//${window.location.hostname}/?meme=${meme.id}`
  );

  const [ens, setENS] = useState<string | null>(null);

  const router = useRouter();

  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const borderColor = useColorModeValue("#8C65F7", "white");
  const altColor = useColorModeValue("white", brandColors.darkPurple);

  const ipfsId = meme.image.toString().includes("ipfs.io")
    ? meme.image.toString().substring(21)
    : meme.image.toString().substring(8, meme.image.toString().length - 15);

  const newSrc = `https://d2wwrm96vfy3z4.cloudfront.net/image?height=800&width=800&url=https://ipfs.io/ipfs/${ipfsId}`;

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setPreOpenedMemeId(null);
        if (router.route === "/") {
          router.replace("/", undefined, { shallow: true });
        }
        onClose();
      }}
      size="4xl"
    >
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
            mr="2"
            cursor="pointer"
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
            <Button
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
            </Button>

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
          </Flex>

          <Flex w="full" direction="column" pt="4" fontWeight="bold">
            <SimpleGrid
              columns={{
                sm: 1,
                md: 2,
              }}
              w="full"
              alignItems="center"
            >
              {meme.poaster && (
                <Badge
                  w="fit-content"
                  rounded="full"
                  color={color}
                  bg={bg}
                  border={`solid 5px ${borderColor}`}
                  pr={4}
                  py={2}
                  fontWeight="400"
                  onClick={() =>
                    router.push(`/profile/${meme.poaster.username}`)
                  }
                  cursor="pointer"
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
                            .toLocaleDateString()
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
              {meme.meme_lord && (
                <VStack w="full" ml="2">
                  <Text fontSize="lg" alignSelf="flex-start">
                    CREDITS:
                  </Text>
                  <Text fontSize="xl" w="full">
                    {meme.meme_lord}
                  </Text>
                </VStack>
              )}
            </SimpleGrid>

            {meme.tags && meme.tags.length > 0 && (
              <Flex wrap="wrap" w={W_FIT_CONTENT} pt="2" gridGap="2">
                {meme.tags.map(({ name }) => (
                  <Tag flexGrow={1} rounded="full" size="md" key={name}>
                    <TagLabel fontWeight="bold" color={color} alt={name}>
                      {name.toUpperCase()}
                    </TagLabel>
                  </Tag>
                ))}
              </Flex>
            )}
            <Text
              fontSize="2xl"
              py="2"
              textTransform="none"
              whiteSpace="break-spaces"
            >
              {meme.description}
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MemeModal;
