/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { FaArrowLeft } from "react-icons/fa";

import { LeaderType, brandColors } from "../helpers";
import LeaderCard from "components/custom/LeaderCard";
import TopMemeCard from "components/custom/TopMemeCard";
import "react-datepicker/dist/react-datepicker.css";

function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderType[]>([]);
  const [selectDate, setSelectDate] = useState<Date>(
    new Date() < new Date("April 1, 2022 01:30:00")
      ? new Date("March 4, 2022")
      : new Date("April 1, 2022")
  );
  const [formatDate, setFormatedDate] = useState<number>(0);
  const [fetchingTime, setFetchingTime] = useState<number>();
  const borderColor = useColorModeValue("#8c65f7", "white");
  const [loading, setLoading] = useState(false);
  const [topMemes, setTopMemes] = useState<any>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const altColor = useColorModeValue("white", brandColors.darkPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");

  const options = [
    {
      label: "MEMEPALOOZA 1",
      value: new Date("August 31, 2021"),
    },
    {
      label: "MEMEPALOOZA 2",
      value: new Date("October 1, 2021"),
    },
    {
      label: "MEMEPALOOZA 3",
      value: new Date("November 5, 2021"),
    },
    {
      label: "MEMEPALOOZA 4",
      value: new Date("December 2, 2021"),
    },
    {
      label: "MEMEPALOOZA 5",
      value: new Date("January 14, 2022"),
    },
    {
      label: "MEMEPALOOZA 6",
      value: new Date("March 4, 2022"),
    },
    {
      label: "MEMEPALOOZA 7",
      value: new Date("April 1, 2022"),
    },
    {
      label: "MEMEPALOOZA 8",
      value: new Date("May 5, 2022"),
    },
  ];
  useEffect(() => {
    function getFormatedDate() {
      const date = selectDate.getTime();
      setFormatedDate(Math.floor(date / 60000));
      const yesterday = new Date(selectDate);
      yesterday.setDate(yesterday.getDate() - 1);
      setFromDate(yesterday.toISOString());
      setToDate(selectDate.toISOString());
    }
    getFormatedDate();
  }, [selectDate]);

  useEffect(() => {
    async function fetchLeaders() {
      setLoading(true);
      const response = await fetch(
        `https://evening-anchorage-43225.herokuapp.com/museum/leaderboard/${fetchingTime}/`
      );
      const data = await response.json();
      setLeaders(data);
      setLoading(false);
    }
    fetchLeaders();
  }, [selectDate, fetchingTime]);

  useEffect(() => {
    const currentTime = Math.floor(new Date().getTime() / 60000);
    if (formatDate) {
      setFetchingTime(currentTime - formatDate);
    }
  }, [formatDate]);

  useEffect(() => {
    async function getTopMemes() {
      const response = await fetch(
        `https://evening-anchorage-43225.herokuapp.com/museum/memes/?created_at__gte=&created_at__lte=${toDate}&created_at=&created_at__gt=${fromDate}&created_at__lt=`
      );
      const data = await response.json();
      setTopMemes(data);
    }
    getTopMemes();
  }, [toDate, fromDate]);

  useEffect(() => {
    console.log("from date", fromDate);
    console.log("top memes", topMemes);
    console.log("to date", toDate);
  }, [selectDate, topMemes, fromDate, toDate]);

  const chakraStyles: ChakraStylesConfig = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      w: "40px",
    }),
  };

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
        <Heading>Leader Board</Heading>
      </Flex>

      <Flex justify="space-around" w="full">
        <Box
          borderColor={brandColors.mainPurple}
          maxWidth="fit-content"
          borderWidth="thick"
          rounded="md"
        >
          <DatePicker
            color="black"
            onChange={(date) => setSelectDate(date)}
            showTimeSelect
            selected={selectDate}
            maxDate={new Date()}
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </Box>
        <Select
          chakraStyles={chakraStyles}
          options={options}
          defaultValue={options[7]}
          onChange={(option) => setSelectDate(option.value)}
          hasStickyGroupHeaders
        />
      </Flex>
      <HStack justifyContent="space-around" alignItems="flex-start">
        <Stack>
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
        <Stack>
          {topMemes.length > 0 ? (
            topMemes
              .slice(0, 20)
              .map((meme) => (
                <TopMemeCard
                  key={meme.id}
                  src={meme.image}
                  address={meme.poaster.username}
                />
              ))
          ) : (
            <Heading>No Memes</Heading>
          )}
        </Stack>
      </HStack>
    </Stack>
  );
}

export default Leaderboard;
