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
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useToast,
  Heading,
} from "@chakra-ui/react";
import {
  Select,
  AsyncSelect,
  CreatableSelect,
  AsyncCreatableSelect,
} from "chakra-react-select";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

import Card from "../components/custom/Card";
import LogoIcon from "../components/Icons/LogoIcon";
import Container from "../components/layout/Container";
import { Web3Context } from "../contexts/Web3Provider";
import { brandColors, MemeType } from "../helpers";
import useDebounce from "../helpers/hooks";
import CreateMemeModal from "../views/CreateMemeModal";
import MemeModal from "../views/MemeModal";

const MemeCard = dynamic(() => import("../views/MemeCard"), {
  ssr: false,
});

function Memes() {
  const router = useRouter();
  const [preOpenedMemeId] = useState(() =>
    router.query?.meme ? parseInt(router.query.meme as string, 10) : null
  );
  const { account, connectWeb3, headers } = useContext(Web3Context);
  const [memes, setMemes] = useState<MemeType[]>([]);
  const [foundMemes, setFoundMemes] = useState<MemeType[]>();
  const [currentMeme, setCurrentMeme] = useState<MemeType>();

  const tags = [
    {
      label: "MEMEPALOOZA",
      value: "memepalooza",
    },
    {
      label: "MMM",
      value: "mmm",
    },
  ];

  const [selectedTag, setSelectedTag] = useState<string[]>([tags[0].value]);

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
  const borderColor = useColorModeValue("#8c65f7", "white");

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

  const handleOpenMeme = useCallback(
    (meme: MemeType) => {
      setCurrentMeme(meme);
      onOpenMeme();
    },
    [onOpenMeme]
  );

  useEffect(() => {
    // Perform localStorage action
    if (memes && preOpenedMemeId) {
      const foundMeme = memes.find((meme) => meme.id === preOpenedMemeId);
      if (foundMeme) {
        handleOpenMeme(foundMeme);
      }
    }
  }, [handleOpenMeme, preOpenedMemeId, memes]);

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
      connectWeb3();
    }
  }, [toast, connectWeb3]);

  const handleAddMeme = (meme: MemeType) => {
    setMemes((previousMemes) => [
      ...previousMemes.filter((m) => m.id !== meme.id),
      meme,
    ]);
    handleOpenMeme(meme);
  };

  const handleUpvote = async (memeId: number) => {
    if (!account) {
      return handleNotConnected();
    }
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
      setMemes(memesResult);
    }
    fetchMemes();
  }, []);

  const renderMemes = (selectedMemes: MemeType[]) =>
    selectedMemes &&
    selectedMemes
      .sort((a: MemeType, b: MemeType) =>
        (a.meme_score || 0) > (b.meme_score || 0) ? -1 : 1
      )
      .map((m) => (
        <Box key={m.id} cursor="pointer" onClick={() => handleOpenMeme(m)}>
          <Tilt
            glareEnable
            glareMaxOpacity={0.05}
            scale={1.03}
            tiltMaxAngleX={7}
            tiltMaxAngleY={7}
          >
            <MemeCard
              handleDownvote={handleDownvote}
              handleUpvote={handleUpvote}
              meme={m}
            />
          </Tilt>
        </Box>
      ));

  const allMemes = renderMemes(foundMemes || memes);
  const latestMemes = renderMemes(
    memes.sort((a, b) => b.id - a.id).slice(0, 8)
  );
  const myMemes = renderMemes(
    memes.filter((meme: MemeType) => meme.poaster?.username === account)
  );

  const filteredMemes = renderMemes(
    memes.filter(
      (meme: MemeType) =>
        meme?.tags &&
        meme.tags
          .flatMap((tag) => tag?.name && tag.name.toLowerCase())
          .some((tag) =>
            selectedTag.length === 0 ? true : selectedTag.includes(tag)
          )
    )
  );

  useEffect(() => {
    console.log("filteredMemes: ", { filteredMemes });
    console.log("memes", { memes });
  }, [filteredMemes, memes]);

  useEffect(() => {
    console.log("selectedTag", { selectedTag });
  }, [selectedTag]);

  return (
    <Card>
      <Container>
        <VStack w="full" alignItems="center">
          <LogoIcon size="600px" logoPath="/memes-party.png" />
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
          {...{
            isOpen,
            onClose,
            addMeme: handleAddMeme,
            handleNotConnected,
          }}
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
              key="all-memes"
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
              key="memepalooza"
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
              {selectedTag.length === 0
                ? "ALL MEMES"
                : `${selectedTag.join(", ").toUpperCase()} MEMES`}
            </Tab>
            <Tab
              key="my-memes"
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
              <Heading py="6">LATEST MEMES</Heading>
              <SimpleGrid pb="6" columns={{ sm: 1, md: 4 }} spacing={10}>
                {latestMemes}
              </SimpleGrid>
              <Heading py="6">ALL MEMES</Heading>
              <SimpleGrid columns={{ sm: 1, md: 4 }} spacing={10}>
                {allMemes}
              </SimpleGrid>
            </TabPanel>
            <TabPanel w="full" px="0">
              <Heading py="6">{selectedTag} Memes</Heading>
              <Select
                isMulti
                options={tags}
                defaultValue={tags[0]}
                onChange={(option) => {
                  const newTags: string[] = [];
                  option.map((tag: { label: string; value: string }) =>
                    newTags.push(tag.value)
                  );
                  setSelectedTag(newTags);
                }}
                placeholder="Filter by tags"
                closeMenuOnSelect={false}
                hasStickyGroupHeaders
              />
              <SimpleGrid mt={6} columns={{ sm: 1, md: 4 }} spacing={10}>
                {filteredMemes}
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
