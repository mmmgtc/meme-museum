import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  VStack,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenMeme,
    onOpen: onOpenMeme,
    onClose: onCloseMeme,
  } = useDisclosure();

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

  const handleAddMeme = (meme: MemeType) =>
    setMemes((previousMemes) => [
      ...previousMemes.filter((m) => m.id !== meme.id),
      meme,
    ]);

  const handleUpvote = async (memeId: number) => {
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
  };

  const handleDownvote = async (memeId: number) => {
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
    selectedMemes.map((meme: MemeType) => (
      <MemeCard
        key={meme.id}
        handleDownvote={handleDownvote}
        handleUpvote={handleUpvote}
        meme={meme}
        openMeme={handleOpenMeme}
      />
    ));

  const allMemes = renderMemes(memes);
  const myMemes = renderMemes(
    memes.filter((meme: MemeType) => meme.poaster?.username === account)
  );

  return (
    <Card bg="purple.500">
      <Container>
        <VStack w="full" alignItems="center">
          <LogoIcon size="600px" />
          <Button
            rounded="full"
            size="lg"
            bg={brandColors.mainPurple}
            color="white"
            onClick={onOpen}
            _hover={{
              background: "white",
              color: brandColors.mainPurple,
            }}
            fontSize="xl"
            leftIcon={<AddIcon />}
          >
            CREATE MEME
          </Button>
        </VStack>
        <CreateMemeModal {...{ isOpen, onClose, addMeme: handleAddMeme }} />
        {currentMeme && (
          <MemeModal
            isOpen={isOpenMeme}
            onClose={onCloseMeme}
            meme={currentMeme}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
          />
        )}
        <Tabs isFitted variant="soft-rounded" py="2rem" w="full">
          <TabList>
            <Tab
              color="white"
              backgroundColor="purple.200"
              _selected={{
                color: brandColors.mainPurple,
                background: "white",
              }}
              borderX={`solid 5px ${brandColors.darkPurple}`}
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
              borderX={`solid 5px ${brandColors.darkPurple}`}
              borderLeftRadius="0"
              borderRightRadius="0"
            >
              MEMEPALOZZA
            </Tab>
            <Tab
              color="white"
              backgroundColor={brandColors.mainPurple}
              _selected={{
                color: brandColors.mainPurple,
                background: "white",
              }}
              borderLeftRadius="0"
              borderX={`solid 5px ${brandColors.darkPurple}`}
            >
              MY MEMES
            </Tab>
          </TabList>

          <TabPanels w="full">
            <TabPanel w="full" px="0">
              <SimpleGrid columns={{ sm: 1, md: 4 }} spacing={10}>
                {allMemes}
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
