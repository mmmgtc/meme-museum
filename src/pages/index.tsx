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
  InputRightElement,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import Script from "next/script";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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

import { getMemes } from "./api/profile-data";

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
  const { account, connectWeb3, headers, logout } = useContext(Web3Context);
  const [leaderboardImage, setLeaderboardImage] =
    useState<string>("/leaderboard.png");
  const [memes, setMemes] = useState<MemeType[]>([]);
  const [isBusyLoadingMemes, setIsBusyLoadingMemes] = useState<boolean>(false);
  const [foundMemes, setFoundMemes] = useState<MemeType[]>();
  const [myMemes, setMyMemes] = useState<MemeType[]>([]);
  const [currentMeme, setCurrentMeme] = useState<MemeType>();
  const [HeaderMemeTitle, setHeaderMemeTitle] = useState<string>("ALL");
  const [searched, setSearched] = useState<boolean>(false);
  const { colorMode } = useColorMode();

  const [userProfile, setUserProfile] = useState<any>();

  const { height, width } = useWidowSize();

  const { dverify, search } = router.query;

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
  const [tabsIndex, setTabsIndex] = useState<number>(0);

  useEffect(() => {
    if (dverify) {
      // console.log("dverify", dverify);
      logout().then(() => {
        connectWeb3(dverify as string);
        router.replace("/", undefined, { shallow: true });
      });
      // localStorage.setItem("dverify", dverify as string);
    } else {
      localStorage.removeItem("dverify");
    }
  }, [dverify, router, connectWeb3, logout]);

  useEffect(() => {
    if (memes.length > 0) {
      const sortedMemes = [...memes].sort((a: MemeType, b: MemeType) =>
        a.id < b.id ? -1 : 1
      );

      setOldestId(sortedMemes[0].id);
      setLatestId(sortedMemes[sortedMemes.length - 1].id);
    }
  }, [memes]);

  useEffect(() => {
    const fetchMyMemes = async () => {
      if (account) {
        const data: any = await getMemes(account);
        // console.log("myMemes", data.memes);
        setMyMemes(data.memes);
      }
    };
    fetchMyMemes();
  }, [account]);

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

  const isMemePaloozaDay = () => {
    const currentDate = new Date();
    if (
      new Date("Fri Jun 03 2022 23:30:00 GMT+0530 (India Standard Time)") <=
        currentDate &&
      currentDate <=
        new Date("Sat Jun 04 2022 01:30:00 GMT+0530 (India Standard Time)")
    ) {
      return true;
    }
    return false;
  };

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

  useEffect(() => {
    if (search) {
      setPreOpenedMemeId(null);
      setTabsIndex(0);
      setHeaderMemeTitle(search as string);
      setSearched(true);
      setSearchTerm(search as string);
      handleSearch(search as string).then((memesResult) => {
        setFoundMemes(memesResult);
        if (memesResult !== null) {
          setTotalSearchResult(memesResult.length);
        } else {
          setTotalSearchResult(null);
        }
      });
    } else {
      setFoundMemes(undefined);
      setSearchTerm("");
    }
  }, [search, handleSearch]);

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

  const handlePostVote = (
    setData:
      | ((value: SetStateAction<MemeType[] | undefined>) => void)
      | Dispatch<SetStateAction<MemeType[]>>,
    memeId: number,
    votedMeme: any
  ) => {
    setData((prevData) => {
      if (prevData) {
        return [
          ...prevData?.map((m) => {
            if (m.id !== memeId) {
              return m;
            }
            return votedMeme;
          }),
        ];
      }
      return prevData;
    });
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
    handlePostVote(setMemes, memeId, upvotedMeme);
    // setMemes((previousMemes) => [
    //   ...previousMemes.map((m) => {
    //     if (m.id !== memeId) {
    //       return m;
    //     }
    //     return upvotedMeme;
    //   }),
    //   // upvotedMeme,
    // ]);

    if (searchTerm && foundMemes !== undefined) {
      handlePostVote(setFoundMemes, memeId, upvotedMeme);
    }
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
    handlePostVote(setMemes, memeId, downvotedMeme);
    // setMemes((previousMemes) => [
    //   ...previousMemes.map((m) => {
    //     if (m.id !== memeId) {
    //       return m;
    //     }
    //     return downvotedMeme;
    //   }),
    //   // downvotedMeme,
    // ]);
    if (searchTerm && foundMemes !== undefined) {
      handlePostVote(setFoundMemes, memeId, downvotedMeme);
    }
    if (isOpenMeme) {
      setCurrentMeme(downvotedMeme);
    }
    return downvotedMeme;
  };

  const fetchPaginatedMemes = async () => {
    if (isBusyLoadingMemes) {
      return;
    }

    setIsBusyLoadingMemes(true);
    const paginatedMemesResponse = await fetch(
      `${PAGINATION_URL}?n=8&latest=${latestId}&oldest=${oldestId}`
    );
    const paginatedMemesResult = await paginatedMemesResponse.json();

    const currentMemes = [...memes, ...paginatedMemesResult];

    setMemes([...currentMemes]);

    setIsBusyLoadingMemes(false);
  };

  useEffect(() => {
    async function fetchMemes() {
      setLoading(true);
      const memesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/museum/pagination/?n=16`
      );
      const memesResult = await memesResponse.json();

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
        scrollThreshold="2000px"
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
      </InfiniteScroll>
    ));

  const allMemes = renderMemes(foundMemes || memes);
  const userMemes = renderMemes(myMemes);

  useEffect(() => {
    const getUserProfile = async () => {
      const userProfileResponse = await fetch(
        `https://evening-anchorage-43225.herokuapp.com/museum/poaster/${account}/`
      );
      setUserProfile(await userProfileResponse.json());
    };
    getUserProfile();
  }, [account]);

  useEffect(() => {
    if (
      totalSearchResult &&
      totalSearchResult > 0 &&
      searchTerm.length > 0 &&
      searched
    ) {
      setHeaderMemeTitle(searchTerm);
    } else {
      setHeaderMemeTitle("ALL");
    }
  }, [searchTerm, setHeaderMemeTitle, searched, totalSearchResult]);

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
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>
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
        {isMemePaloozaDay() && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={1000}
          />
        )}
        <Container>
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
                <Input
                  _placeholder={{
                    color,
                  }}
                  variant="solid"
                  rounded="full"
                  bg={bg}
                  value={searchTerm}
                  border={`solid 5px ${borderColor}`}
                  color={color}
                  _hover={{
                    bg: brandColors.darkPurple,
                    color: "white",
                  }}
                  fontWeight="bold"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      router.push(`/?search=${searchTerm}`);
                      setSearched(true);
                      setHeaderMemeTitle(searchTerm);
                    }
                  }}
                  style={{
                    textTransform: "uppercase",
                  }}
                  type="search"
                  placeholder="SEARCH.."
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value === "" && router.query.search) {
                      router.push("/");
                      setSearched(false);
                      setHeaderMemeTitle("ALL");
                    }
                  }}
                  overflow="hidden"
                />

                <InputRightElement w="max-content" right="1">
                  <Button
                    onClick={() => {
                      router.push(`/?search=${searchTerm}`);
                      setHeaderMemeTitle(searchTerm);
                    }}
                    cursor="pointer"
                    background="none"
                  >
                    <Search2Icon color={color} />
                  </Button>
                </InputRightElement>
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
                onMouseEnter={() =>
                  setLeaderboardImage("/leaderboard-hover.png")
                }
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
            index={tabsIndex}
            onChange={(index) => setTabsIndex(index)}
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
              {/* <Tab
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
            </Tab> */}
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
                  <Heading py="6">
                    {HeaderMemeTitle.toUpperCase()} MEMES
                  </Heading>
                  <Text fontSize="2xl">
                    {totalSearchResult !== null &&
                      searchTerm.length > 0 &&
                      `${totalSearchResult} SEARCH RESULTS`}
                  </Text>
                </HStack>

                {!loading ? (
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {allMemes}
                  </Masonry>
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
              {/* <TabPanel w="full" px="0">
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
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {filteredMemes}
              </Masonry>
            </TabPanel> */}
              <TabPanel w="full" px="0">
                {renderUserProfile()}
                <Heading paddingY="2rem">My Memes</Heading>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {userMemes}
                </Masonry>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Card>
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const id = ctx.query.MEME || ctx.query.meme;
  let memeFromId = null;

  if (id) {
    const memesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/museum/memes/${id}`
    );
    memeFromId = await memesResponse.json();
  }
  return {
    props: {
      memeFromId,
    },
  };
}

// const ViewPortMemes = handleViewport(Memes, {}, { disconnectOnLeave: false });
export default Memes;
