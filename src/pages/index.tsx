import { useColorModeValue } from "@chakra-ui/color-mode";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
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
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
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
import useDebounce from "../helpers/hooks";

const MemeCard = dynamic(() => import("../components/MemeCard"), {
  ssr: false,
});

function Memes() {
  const { account } = useContext(Web3Context);
  const [memes, setMemes] = useState<MemeType[]>([]);
  const [foundMemes, setFoundMemes] = useState<MemeType[]>();
  const [currentMeme, setCurrentMeme] = useState<MemeType>();
  const [headers, setHeaders] = useState<{
    Authorization: string;
    [key: string]: string;
  }>();
  // State and setters for ...
  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenMeme,
    onOpen: onOpenMeme,
    onClose: onCloseMeme,
  } = useDisclosure();
  const toast = useToast();

  const color = useColorModeValue(brandColors.mainPurple, "white");
  const altColor = useColorModeValue("white", brandColors.darkPurple);
  const bg = useColorModeValue("white", brandColors.mainPurple);
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

  const handleSearch = useCallback(
    async (value: string) => {
      const foundMemesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/museum/search/?query=${value}`,
        {
          method: "GET",
          headers,
        }
      );
      const memesResult = await foundMemesRes.json();
      console.log({ memesResult });
      return memesResult && memesResult.length > 0 ? memesResult : null;
    },
    [headers]
  );

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        handleSearch(debouncedSearchTerm).then((memesResult) => {
          setFoundMemes(memesResult);
        });
      } else {
        setFoundMemes(undefined);
      }
    },
    [debouncedSearchTerm, handleSearch] // Only call effect if debounced search term changes
  );

  const handleNotConnected = useCallback(() => {
    if (!toast.isActive("not-connected-toast")) {
      toast({
        id: "not-connected-toast",
        position: "bottom",
        variant: "solid",
        title: "Please connect your wallet first.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [toast]);

  const handleAddMeme = (meme: MemeType) => {
    setMemes((previousMemes) => [
      ...previousMemes.filter((m) => m.id !== meme.id),
      meme,
    ]);
    onOpenMeme();
  };

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
        <Box cursor="pointer" onClick={() => handleOpenMeme(m)}>
          <Tilt
            glareEnable
            glareMaxOpacity={0.05}
            scale={1.03}
            tiltMaxAngleX={7}
            tiltMaxAngleY={7}
          >
            <MemeCard
              key={m.id}
              handleDownvote={handleDownvote}
              handleUpvote={handleUpvote}
              meme={m}
            />
          </Tilt>
        </Box>
      ));

  const allMemes = renderMemes(foundMemes || memes);
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
          <SimpleGrid
            columns={{
              sm: 1,
              md: 2,
            }}
            spacing={4}
          >
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <Search2Icon color={color} />
              </InputLeftElement>
              <Input
                _placeholder={{
                  color,
                }}
                variant="solid"
                rounded="full"
                bg={bg}
                border={`solid 5px ${borderColor}`}
                color={color}
                _hover={{
                  bg: brandColors.darkPurple,
                  color: "white",
                }}
                fontWeight="bold"
                style={{
                  textTransform: "uppercase",
                }}
                type="search"
                placeholder="SEARCH.."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Button
              size="lg"
              rounded="full"
              variant="solid"
              bg="purple.200"
              color="white"
              border={`solid 5px ${borderColor}`}
              _hover={{
                bg: altColor,
                color,
              }}
              fontSize="lg"
              leftIcon={<AddIcon />}
              onClick={onOpen}
            >
              UPLOAD MEME
            </Button>
          </SimpleGrid>
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
        <Tabs isFitted variant="soft-rounded" py="4">
          <TabList
            border={`solid 5px ${brandColors.mainPurpleHex}`}
            rounded="full"
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
                background: "spacelightpurple",
                cursor: "not-allowed",
                pointerEvents: "all",
              }}
              borderLeftRadius="0"
              isDisabled={!account || !myMemes || myMemes.length === 0}
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
