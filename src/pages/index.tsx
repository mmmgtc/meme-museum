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
import { brandColors } from "../helpers";

const MemeCard = dynamic(() => import("../components/MemeCard"), {
  ssr: false,
});

export type MemeType = {
  id: number;
  title: string;
  image: string;
  upvotes: number;
  downvotes: number;
  description: string;
  source: string;
  meme_lord: null;
  tags: {
    name: string;
  }[];
  poaster: {
    username: string;
    userprofile: Record<string, any>;
  };
  created_at: string;
};

function Memes() {
  const { account } = useContext(Web3Context);
  const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState<MemeType>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenMeme,
    onOpen: onOpenMeme,
    onClose: onCloseMeme,
  } = useDisclosure();

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
        <CreateMemeModal {...{ isOpen, onClose }} />
        {currentMeme && (
          <MemeModal
            isOpen={isOpenMeme}
            onClose={onCloseMeme}
            meme={currentMeme}
          />
        )}
        <Tabs isFitted variant="soft-rounded" py="2rem" w="full">
          <TabList>
            <Tab
              color="purple.200"
              backgroundColor="white"
              _selected={{
                color: "white",
                background: "purple.200",
              }}
              borderRightRadius="0"
            >
              ALL MEMES
            </Tab>
            <Tab
              color="purple.200"
              backgroundColor="white"
              _selected={{
                color: "white",
                background: "purple.200",
              }}
              borderLeftRadius="0"
              borderRightRadius="0"
            >
              MEMEPALOZZA
            </Tab>
            <Tab
              color="white"
              backgroundColor="purple.200"
              _selected={{
                color: "white",
                background: "purple.200",
              }}
              borderLeftRadius="0"
            >
              MY MEMES
            </Tab>
          </TabList>

          <TabPanels w="full">
            <TabPanel w="full" px="0">
              <SimpleGrid columns={{ sm: 1, md: 4 }} spacing={10}>
                {memes.map((meme: MemeType) => (
                  <MemeCard
                    key={meme.id}
                    meme={meme}
                    openMeme={handleOpenMeme}
                  />
                ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel w="full" px="0">
              <SimpleGrid columns={{ sm: 1, md: 4 }} spacing={10}>
                {memes
                  .filter((meme: MemeType) => meme.poaster.username === account)
                  .map((meme: MemeType) => (
                    <MemeCard
                      key={meme.id}
                      meme={meme}
                      openMeme={handleOpenMeme}
                    />
                  ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Card>
  );
}

export default Memes;
