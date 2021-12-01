import { useColorModeValue } from "@chakra-ui/color-mode";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  VStack,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

import CreateMemeModal from "../components/CreateMemeModal";
import Card from "../components/custom/Card";
import LogoIcon from "../components/Icons/LogoIcon";
import Container from "../components/layout/Container";
import MemeModal from "../components/MemeModal";
import { Web3Context } from "../contexts/Web3Provider";
import { brandColors, MemeType } from "../helpers";

const MemeCard = dynamic(() => import("../components/MemeCard"), {
  ssr: false,
});

function Memes() {
  const { account } = useContext(Web3Context);
  const [memes, setMemes] = useState<MemeType[]>([]);
  const [currentMeme, setCurrentMeme] = useState<MemeType>();
  const [headers, setHeaders] = useState<{
    Authorization: string;
    [key: string]: string;
  }>();
  const activeTabBg = useColorModeValue(brandColors.darkPurple, "white");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenMeme,
    onOpen: onOpenMeme,
    onClose: onCloseMeme,
  } = useDisclosure();
  const toast = useToast();

  const color = useColorModeValue(brandColors.mainPurple, "white");
  const altColor = useColorModeValue("white", brandColors.darkPurple);
  const borderColor = useColorModeValue("#8C65F7", "white");

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

  const handleNotConnected = useCallback(() => {
    if (!toast.isActive("not-connected-toast")) {
      toast({
        id: "not-connected-toast",
        position: "bottom",
        variant: "left-accent",
        title: "Please connect your wallet first.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toast]);

  const handleAddMeme = (meme: MemeType) =>
    setMemes((previousMemes) => [
      ...previousMemes.filter((m) => m.id !== meme.id),
      meme,
    ]);

  const handleUpvote = async (memeId: number) => {
    if (!account) {
      return handleNotConnected();
    }
    console.log({ headers });
    const upvoteMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/upvote/`,
      {
        method: "POST",
        body: JSON.stringify({
          id: memeId,
        }),
        headers,
      }
    );
    const upvotedMeme = await upvoteMemeResponse.json();
    console.log({ upvotedMeme });
    setMemes((previousMemes) => [
      ...previousMemes.filter((m) => m.id !== memeId),
      upvotedMeme,
    ]);
    if (isOpenMeme) {
      setCurrentMeme(upvotedMeme);
    }
    return upvotedMeme;
  };

  const handleDownvote = async (memeId: number) => {
    if (!account) {
      return handleNotConnected();
    }
    const downvoteMemeResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/downvote/`,
      {
        method: "POST",
        body: JSON.stringify({
          id: memeId,
        }),
        headers,
      }
    );
    const downvotedMeme = await downvoteMemeResponse.json();
    console.log({ downvotedMeme });
    setMemes((previousMemes) => [
      ...previousMemes.filter((m) => m.id !== memeId),
      downvotedMeme,
    ]);
    if (isOpenMeme) {
      setCurrentMeme(downvotedMeme);
    }
    return downvotedMeme;
  };

  useEffect(() => {
    async function fetchMemes() {
      const memesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/museum/memes/?format=json`
      );
      const memesResult = await memesResponse.json();
      console.log({ memesResult });
      setMemes(memesResult);
    }
    fetchMemes();
  }, []);

  const handleOpenMeme = (meme: MemeType) => {
    setCurrentMeme(meme);
    onOpenMeme();
  };

  const renderMemes = (selectedMemes: MemeType[]) =>
    selectedMemes &&
    selectedMemes
      .sort((a: MemeType, b: MemeType) => (a.upvotes > b.upvotes ? -1 : 1))
      .map((m) => (
        <Tilt
          glareEnable
          glareMaxOpacity={0.05}
          scale={1.1}
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
        >
          <MemeCard
            key={m.id}
            handleDownvote={handleDownvote}
            handleUpvote={handleUpvote}
            meme={m}
            openMeme={handleOpenMeme}
          />
        </Tilt>
      ));

  const allMemes = renderMemes(memes);
  const myMemes = renderMemes(
    memes.filter((meme: MemeType) => meme.poaster?.username === account)
  );
  const memePaloozaMemes = renderMemes(
    memes.filter((meme: MemeType) =>
      meme.tags.map((tag) => tag.name.toLowerCase()).includes("memepalooza")
    )
  );

  return (
    <Card>
      <Container>
        <VStack w="full" alignItems="center">
          <LogoIcon size="600px" />
          <Button
            size="lg"
            rounded="full"
            variant="solid"
            bg="purple.200"
            border={`solid 5px ${borderColor}`}
            color="white"
            _hover={{
              bg: altColor,
              color,
            }}
            fontSize="xl"
            leftIcon={<AddIcon />}
            onClick={onOpen}
          >
            UPLOAD MEME
          </Button>
        </VStack>
        <CreateMemeModal
          {...{ isOpen, onClose, addMeme: handleAddMeme, handleNotConnected }}
        />
        {currentMeme && (
          <MemeModal
            isOpen={isOpenMeme}
            onClose={onCloseMeme}
            meme={currentMeme}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
          />
        )}
        <Tabs isFitted variant="soft-rounded" w="full" py="4">
          <TabList
            border={`solid 5px ${brandColors.mainPurpleHex}`}
            rounded="3xl"
          >
            <Tab
              color="white"
              backgroundColor="purple.200"
              _selected={{
                color: brandColors.mainPurple,
                background: "white",
              }}
              _hover={{
                color: "white",
                background: brandColors.darkPurple,
              }}
              borderRightRadius="0"
            >
              ALL MEMES
            </Tab>
            <Tab
              color="white"
              backgroundColor="purple.200"
              _selected={{
                color: brandColors.mainPurple,
                background: "white",
              }}
              _hover={{
                color: "white",
                background: brandColors.darkPurple,
              }}
              borderLeftRadius="0"
              borderRightRadius="0"
            >
              MEMEPALOOZA
            </Tab>
            <Tab
              color="white"
              backgroundColor={brandColors.mainPurple}
              _selected={{
                color: brandColors.mainPurple,
                background: "white",
              }}
              _hover={{
                color: "white",
                background: brandColors.darkPurple,
              }}
              _disabled={{
                color: brandColors.mainPurple,
                background: "gray.300",
                cursor: "not-allowed",
                pointerEvents: "all",
              }}
              borderLeftRadius="0"
              isDisabled={!account || !myMemes || myMemes.length === 0}
            >
              MY MEMES
            </Tab>
          </TabList>

          <TabPanels w="full" py="4">
            <TabPanel w="full" px="0">
              <SimpleGrid columns={{ sm: 1, md: 4 }} spacing={10}>
                {allMemes}
              </SimpleGrid>
            </TabPanel>
            <TabPanel w="full" px="0">
              <SimpleGrid columns={{ sm: 1, md: 4 }} spacing={10}>
                {memePaloozaMemes}
              </SimpleGrid>
            </TabPanel>
            <TabPanel w="full" px="0">
              <SimpleGrid columns={{ sm: 1, md: 4 }} spacing={10}>
                {myMemes}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Card>
  );
}

export default Memes;
