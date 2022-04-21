import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChakraStylesConfig, Select } from "chakra-react-select";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { FaArrowLeft } from "react-icons/fa";

import { LeaderType, brandColors } from "../helpers";
import LeaderCard from "components/custom/LeaderCard";
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
      value: new Date("March 4, 2021"),
    },
    {
      label: "MEMEPALOOZA 7",
      value: new Date("April 1, 2021"),
    },
    {
      label: "MEMEPALOOZA 8",
      value: new Date("May 5, 2021"),
    },
  ];
  useEffect(() => {
    function getFormatedDate() {
      const date = selectDate.getTime();
      setFormatedDate(Math.floor(date / 60000));
    }
    getFormatedDate();
  }, [selectDate]);

  useEffect(() => {
    async function fetchLeaders() {
      const response = await fetch(
        `https://evening-anchorage-43225.herokuapp.com/museum/leaderboard/${fetchingTime}/`
      );
      const data = await response.json();
      setLeaders(data);
    }
    fetchLeaders();
  }, [fetchingTime]);

  useEffect(() => {
    const currentTime = Math.floor(new Date().getTime() / 60000);
    if (formatDate) {
      setFetchingTime(currentTime - formatDate);
    }
  }, [formatDate]);

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
        <Heading>leader Board page</Heading>
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
            selected={selectDate}
            maxDate={new Date()}
          />
        </Box>
        <Select
          chakraStyles={chakraStyles}
          options={options}
          onChange={(option) => setSelectDate(option.value)}
          hasStickyGroupHeaders
        />
      </Flex>

      <Stack>
        {leaders.length > 0 ? (
          leaders.map((leader, index) => {
            return (
              <Box key={leader.display_name}>
                <LeaderCard
                  id={index + 1}
                  name={leader.display_name}
                  karma={leader.karma}
                />
              </Box>
            );
          })
        ) : (
          <Heading>No Leaders found select different date</Heading>
        )}
      </Stack>
    </Stack>
  );
}

export default Leaderboard;
