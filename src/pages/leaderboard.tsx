/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import { useRouter } from "next/router";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import DatePicker from "react-datepicker";
import { FaArrowLeft } from "react-icons/fa";
import Masonry from "react-masonry-css";
import Tilt from "react-parallax-tilt";

import { LeaderType, brandColors, MemeType } from "../helpers";
import LeaderCard from "components/custom/LeaderCard";
import TopMemeCard from "components/custom/TopMemeCard";
import "react-datepicker/dist/react-datepicker.css";
import { Web3Context } from "contexts/Web3Provider";
import MemeCard from "views/MemeCard";
import MemeModal from "views/MemeModal";

function Leaderboard() {
  const MEMEPALOOZA_8_DATE = new Date("Fri, 6 May 2022 23:00:00 UTC");
  const [leaders, setLeaders] = useState<LeaderType[]>([]);
  const [selectDate, setSelectDate] = useState<Date>(
    new Date() < MEMEPALOOZA_8_DATE
      ? new Date("2022-03-31T18:30:00.000Z")
      : MEMEPALOOZA_8_DATE
  );
  const [formatDate, setFormatedDate] = useState<number>(0);
  const [fetchingTime, setFetchingTime] = useState<number>();
  const borderColor = useColorModeValue("#8c65f7", "white");
  const [loading, setLoading] = useState(false);
  const [topMemes, setTopMemes] = useState<MemeType[]>([]);
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const [topMemesLoading, setTopMemesLoading] = useState<boolean>(false);

  const altColor = useColorModeValue("white", brandColors.darkPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const router = useRouter();
  const [currentMeme, setCurrentMeme] = useState<MemeType>();
  const {
    isOpen: isOpenMeme,
    onOpen: onOpenMeme,
    onClose: onCloseMeme,
  } = useDisclosure();
  const { account, connectWeb3, headers } = useContext(Web3Context);
  const toast = useToast();
  const [preOpenedMemeId, setPreOpenedMemeId] = useState(() =>
    router.query?.meme ? parseInt(router.query.meme as string, 10) : null
  );

  // const options = [
  //   {
  //     label: "MEMEPALOOZA 1",
  //     value: new Date("Sat, 1 September 2021 23:00:00 UTC"),
  //   },
  //   {
  //     label: "MEMEPALOOZA 2",
  //     value: new Date("Fri, 1 October 2021 23:00:00 UTC"),
  //   },
  //   {
  //     label: "MEMEPALOOZA 3",
  //     value: new Date("Fri, 5 November 2021 23:00:00 UTC"),
  //   },
  //   {
  //     label: "MEMEPALOOZA 4",
  //     value: new Date("Fri, 3 December 2021 23:00:00 UTC"),
  //   },
  //   {
  //     label: "MEMEPALOOZA 5",
  //     value: new Date("Fri, 14 January 2022 23:00:00 UTC"),
  //   },
  //   {
  //     label: "MEMEPALOOZA 6",
  //     value: new Date("Fri, 4 March 2022 23:00:00 UTC"),
  //   },
  //   {
  //     label: "MEMEPALOOZA 7",
  //     value: new Date("Fri, 1 April 2022 23:00:00 UTC"),
  //   },
  //   {
  //     label: "MEMEPALOOZA 8",
  //     value: MEMEPALOOZA_8_DATE,
  //   },
  // ];

  const breakpointColumnsObj = {
    default: 3,
    1100: 1,
    700: 2,
    500: 1,
  };

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
    handlePostVote(setTopMemes, memeId, upvotedMeme);

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
    handlePostVote(setTopMemes, memeId, downvotedMeme);
    if (isOpenMeme) {
      setCurrentMeme(downvotedMeme);
    }
    return downvotedMeme;
  };

  const handleDeleteMeme = (meme: MemeType) => {
    setTopMemes((previousMemes) => [
      ...previousMemes.filter((m) => m.id !== meme.id),
    ]);
  };

  const handleOpenMeme = useCallback(
    (meme: MemeType) => {
      setCurrentMeme(meme);
      onOpenMeme();
    },
    [onOpenMeme]
  );

  // useEffect(() => {
  //   function getFormatedDate() {
  //     const date = selectDate.getTime();
  //     setFormatedDate(Math.floor(date / 60000));
  //     const yesterday = new Date(selectDate);
  //     yesterday.setDate(yesterday.getDate() - 1);
  //     setFromDate(yesterday.toISOString());
  //     setToDate(selectDate.toISOString());
  //   }
  //   getFormatedDate();
  // }, [selectDate]);

  // useEffect(() => {
  //   console.log("from date", fromDate);
  //   console.log("to date", toDate);
  // }, [fromDate, toDate]);

  useEffect(() => {
    async function fetchLeaders() {
      setLoading(true);
      const response = await fetch(
        `https://evening-anchorage-43225.herokuapp.com/museum/leaderboard/433078/`
      );
      const data = await response.json();
      setLeaders(data);
      setLoading(false);
    }
    fetchLeaders();
  }, []);

  // useEffect(() => {
  //   const currentTime = Math.floor(new Date().getTime() / 60000);
  //   if (formatDate) {
  //     setFetchingTime(currentTime - formatDate);
  //   }
  // }, [formatDate]);

  useEffect(() => {
    async function getTopMemes() {
      const todayDate = new Date().toISOString();
      console.log("todays Date: ", todayDate);
      setTopMemesLoading(true);
      const response = await fetch(
        `https://evening-anchorage-43225.herokuapp.com/museum/memes/?created_at__gte=&created_at__lte=${todayDate}&created_at=&created_at__gt=2021-06-01T23:00:00.000Z&created_at__lt=`
      );
      const data = await response.json();
      setTopMemesLoading(false);
      setTopMemes(data);
    }
    getTopMemes();
  }, []);

  const chakraStyles: ChakraStylesConfig = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      w: "40px",
    }),
  };

  const renderMemes = (selectedMemes: MemeType[]) =>
    selectedMemes &&
    selectedMemes.map((m) => (
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

  return (
    <Stack gridGap="12" px={5}>
      <Flex gridGap="14">
        <Box textAlign="left">
          <Link href="/" passHref>
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
              leftIcon={<FaArrowLeft />}
            >
              GO BACK!!
            </Button>
          </Link>
        </Box>
        <Heading>Leaderboard</Heading>
      </Flex>

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

      <HStack
        justifyContent="space-around"
        alignItems="flex-start"
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Stack gridGap="3">
          <Heading>Top Meme lords</Heading>
          {loading ? (
            <Text fontSize="4xl" fontWeight="bold" textAlign="center">
              Loading ...
            </Text>
          ) : leaders.length > 0 ? (
            leaders.map((leader, index) => {
              return (
                <Box key={leader.display_name}>
                  <LeaderCard
                    index={index}
                    id={index + 1}
                    name={leader.display_name}
                    karma={leader.karma}
                    src={`/medal${index}.png`}
                  />
                </Box>
              );
            })
          ) : (
            <Heading>No results, please select a different date</Heading>
          )}
        </Stack>
        <Stack gridGap="3">
          <Heading>Top Memes</Heading>
          {topMemesLoading ? (
            <Heading>Loading...</Heading>
          ) : topMemes.length > 0 ? (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {topMemes.slice(0, 20).map((meme) => (
                <Box
                  key={meme.id}
                  onClick={() => handleOpenMeme(meme)}
                  cursor="pointer"
                >
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
                      meme={meme}
                    />
                  </Tilt>
                </Box>
              ))}
            </Masonry>
          ) : (
            <Heading>No Memes</Heading>
          )}
        </Stack>
      </HStack>
    </Stack>
  );
}

export default Leaderboard;
