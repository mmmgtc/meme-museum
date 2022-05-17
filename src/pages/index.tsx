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
  Stack,
  HStack,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import Blockies from "react-blockies";
import Confetti from "react-confetti";
import handleViewport from "react-in-viewport";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import Tilt from "react-parallax-tilt";

import { ignores } from "../../commitlint.config";
import Card from "../components/custom/Card";
import LogoIcon from "../components/Icons/LogoIcon";
import Container from "../components/layout/Container";
import { Web3Context } from "../contexts/Web3Provider";
import { brandColors, MemeType, MemeLordType } from "../helpers";
import useDebounce, { useWidowSize } from "../helpers/hooks";
import CreateMemeModal from "../views/CreateMemeModal";
import MemeModal from "../views/MemeModal";

interface MemesProps {
  id: number;
  title: string;
  image: string;
  upvotes: number;
  downvotes: number;
  description: string;
  source: null;
  meme_lord: string;
  tags: string[];
  poaster: {
    username: string;
    userprofile: { display_name: string; karma: number };
  };
  created_at: string;
}

const MemeCard = dynamic(() => import("../views/MemeCard"), {
  ssr: false,
});

function Memes({ memeFromId }: { memeFromId?: MemeType }) {
  const router = useRouter();
  const [preOpenedMemeId, setPreOpenedMemeId] = useState(() =>
    router.query?.meme ? parseInt(router.query.meme as string, 10) : null
  );
  const { account, connectWeb3, headers } = useContext(Web3Context);
  const [leaderboardImage, setLeaderboardImage] =
    useState<string>("/leaderboard.png");
  const [memes, setMemes] = useState<MemeType[]>([]);
  const [isBusyLoadingMemes, setIsBusyLoadingMemes] = useState<boolean>(false);
  const [foundMemes, setFoundMemes] = useState<MemeType[]>();
  const [currentMeme, setCurrentMeme] = useState<MemeType>();
  const { colorMode } = useColorMode();

  const [userProfile, setUserProfile] = useState<any>();

  const { height, width } = useWidowSize();

  const { dverify } = router.query;

  const tags = [
    {
      label: "Memepalooza 8",
      value: "memepalooza 8",
    },
    {
      label: "Memepalooza 7",
      value: "memepalooza 7",
    },
    {
      label: "MMM",
      value: "mmm",
    },
  ];

  const [selectedTag, setSelectedTag] = useState<string[]>([tags[0].value]);
  const [latestId, setLatestId] = useState<number>(1);
  const [oldestId, setOldestId] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (dverify) {
      console.log("dverify", dverify);
      localStorage.setItem("dverify", dverify as string);
      // router.replace("/", undefined, { shallow: true });
    } else {
      localStorage.removeItem("dverify");
    }
  }, [dverify, router]);

  useEffect(() => {
    if (memes.length > 0) {
      const sortedMemes = [...memes].sort((a: MemeType, b: MemeType) =>
        a.id < b.id ? -1 : 1
      );
      console.log("memes: ", memes);

      setOldestId(sortedMemes[0].id);
      setLatestId(sortedMemes[sortedMemes.length - 1].id);
    }
  }, [memes]);

  // State and setters for ...
  // Search term
  const [searchTerm, setSearchTerm] = useState("");
  const [totalSearchResult, setTotalSearchResult] = useState<number | null>(
    null
  );

  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const PAGINATION_URL =
    "https://evening-anchorage-43225.herokuapp.com/museum/pagination/";

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
          if (memesResult !== null) {
            setTotalSearchResult(memesResult.length);
          } else {
            setTotalSearchResult(null);
          }
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
    if (memes && preOpenedMemeId && memeFromId) {
      handleOpenMeme(memeFromId);
    }
  }, [handleOpenMeme, preOpenedMemeId, memes, memeFromId]);

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

  const handleDeleteMeme = (meme: MemeType) => {
    setMemes((previousMemes) => [
      ...previousMemes.filter((m) => m.id !== meme.id),
    ]);
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

  const fetchPaginatedMemes = async () => {
    console.log("fetchPaginatedMemes: pre isBusyLoading");
    if (isBusyLoadingMemes) {
      return;
    }

    setIsBusyLoadingMemes(true);
    console.log("latestId", latestId);
    console.log("oldestId", oldestId);

    console.log("fetchPaginatedMemes: fetching paginated memes");
    const paginatedMemesResponse = await fetch(
      `${PAGINATION_URL}?n=8&latest=${latestId}&oldest=${oldestId}`
    );
    const paginatedMemesResult = await paginatedMemesResponse.json();

    const currentMemes = [...memes, ...paginatedMemesResult];

    setMemes([...currentMemes]);

    setIsBusyLoadingMemes(false);
    console.log("fetchPaginatedMemes: reset");
  };

  useEffect(() => {
    async function fetchMemes() {
      setLoading(true);
      const memesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/museum/pagination/?n=8`
      );
      const memesResult = await memesResponse.json();
      // console.log("memesResult: ", { memesResult });

      // const sortedMemesResult = memesResult.sort((a: MemeType, b: MemeType) =>
      //   (a.meme_score || 0) > (b.meme_score || 0) ? -1 : 1
      // );

      setMemes(memesResult);
      setLoading(false);
    }
    fetchMemes();
    // eslint-disable-next-line
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const renderMemes = (selectedMemes: MemeType[]) =>
    selectedMemes.map((m) => (
      <InfiniteScroll
        dataLength={7}
        next={fetchPaginatedMemes}
        hasMore
        style={{ overflow: "unset" }}
        loader={<Box />}
        scrollThreshold="200px"
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
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
        </Masonry>
      </InfiniteScroll>
    ));

  const allMemes = renderMemes(foundMemes || memes);
  const myMemes = renderMemes(
    memes.filter((meme: MemeType) => meme.poaster?.username === account)
  );

  useEffect(() => {
    const getUserProfile = async () => {
      const userProfileResponse = await fetch(
        `https://evening-anchorage-43225.herokuapp.com/museum/poaster/${account}/`
      );
      setUserProfile(await userProfileResponse.json());
    };
    getUserProfile();
  }, [account]);

  const renderUserProfile = () => {
    return (
      <HStack
        padding={4}
        backgroundColor={colorMode === "dark" ? "#8c65f7" : "white"}
        border={`5px solid ${borderColor}`}
        borderRadius={5}
        spacing={5}
        marginY={5}
      >
        <Blockies
          size={10}
          seed={userProfile?.username.toLowerCase()}
          className="blockies"
          scale={6}
        />
        <Stack>
          <Heading size="lg">
            Name: {userProfile?.userprofile.display_name}
          </Heading>
          <Heading size="md">Karma: {userProfile?.userprofile.karma}</Heading>
        </Stack>
      </HStack>
    );
  };

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

  return (
    <Card>
      {memeFromId && (
        <NextSeo
          openGraph={{
            title: memeFromId?.title,
            description: memeFromId?.description,
            images: [
              {
                url: memeFromId?.image,
                width: 800,
                height: 800,
                alt: memeFromId?.title.slice(0, 50),
              },
            ],
          }}
        />
      )}
      <Container>
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={1000}
        />
        <VStack w="full" alignItems="center">
          <Box cursor="pointer" onClick={() => router.reload()}>
            <LogoIcon size="600px" logoPath="/memes-party.png" />
          </Box>
          <SimpleGrid
            columns={{
              sm: 1,
              md: 3,
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
              onClick={() => {
                if (!account) {
                  handleNotConnected();
                  return;
                }
                onOpen();
              }}
            >
              UPLOAD MEME
            </Button>
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
              gridGap={4}
              background={brandColors.mainPurple}
              onClick={() => router.push("/leaderboard")}
              onMouseEnter={() => setLeaderboardImage("/leaderboard-hover.png")}
              onMouseLeave={() => setLeaderboardImage("/leaderboard.png")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={leaderboardImage}
                style={{ height: "60%", objectFit: "contain" }}
                alt=""
              />
              LEADERBOARD
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
            handleDelete={handleDeleteMeme}
            isOpen={isOpenMeme}
            onClose={onCloseMeme}
            meme={currentMeme}
            setPreOpenedMemeId={setPreOpenedMemeId}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
          />
        )}
        <Tabs
          isFitted
          variant="soft-rounded"
          py="4"
          px={{ xl: "0", "2xl": "52" }}
        >
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
              <HStack w="full" justifyContent="space-between">
                <Heading py="6">ALL MEMES</Heading>
                <Text fontSize="2xl">
                  {totalSearchResult !== null &&
                    searchTerm.length > 0 &&
                    `${totalSearchResult} SEARCH RESULTS`}
                </Text>
              </HStack>

              {!loading ? (
                <SimpleGrid columns={{ sm: 1, md: 4 }} spacing={10}>
                  {allMemes}
                </SimpleGrid>
              ) : (
                <Box my={8} w="full">
                  <Spinner
                    thickness="6px"
                    speed="0.65s"
                    ml="70px"
                    color="purple.200"
                    size="xl"
                  />
                </Box>
              )}
              {isBusyLoadingMemes && (
                <Box my={8} w="full">
                  <Spinner
                    thickness="6px"
                    speed="0.65s"
                    ml="70px"
                    color="purple.200"
                    size="xl"
                  />
                </Box>
              )}
            </TabPanel>
            <TabPanel w="full" px="0">
              <Heading py="6" textTransform="uppercase">
                {selectedTag} Memes
              </Heading>
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
              {renderUserProfile()}
              <Heading paddingY="2rem">My Memes</Heading>
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

export async function getServerSideProps(ctx: NextPageContext) {
  const id = ctx.query.MEME || ctx.query.meme;
  console.log("id: ", id);
  let memeFromId = null;

  if (id) {
    const memesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/memes/${id}`
    );
    memeFromId = await memesResponse.json();
    console.log("memeFromId: ", memeFromId);
  }
  return {
    props: {
      memeFromId,
    },
  };
}

// const ViewPortMemes = handleViewport(Memes, {}, { disconnectOnLeave: false });

export default Memes;
