/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Flex, useColorModeValue, Box } from "@chakra-ui/react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

import CardMedia from "../components/custom/CardMedia";
import { brandColors, MemeType } from "../helpers";

function MemeCard({
  meme,
  handleUpvote,
  handleDownvote,
}: {
  meme: MemeType;
  handleUpvote: any;
  handleDownvote: any;
}) {
  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue("white", "white");
  const badgeBorderColor = useColorModeValue("#8C65F7", "white");
  return (
    <CardMedia
      bg={bg}
      color={color}
      border={`solid 0px ${badgeBorderColor}`}
      src={meme.image}
      overflow="hidden"
    >
      <Flex zIndex={10} w="full" h="full" style={{ marginTop: 0 }}>
        <Button
          leftIcon={<FaArrowCircleUp color="#ffffff" fontSize="1.7rem" />}
          rounded="none"
          p="2"
          h="full"
          w="full"
          backgroundColor="#0bae44"
          color={color}
          _hover={{
            background: "#3dd573",
            color,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleUpvote(meme.id);
          }}
        >
          {meme.upvotes}
        </Button>
        <Button
          leftIcon={<FaArrowCircleDown color="#ffffff" fontSize="1.7rem" />}
          rounded="none"
          p="2"
          h="full"
          w="full"
          color={color}
          backgroundColor="#ef5959"
          _hover={{
            background: "#f27c7c",
            color,
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleDownvote(meme.id);
          }}
        >
          {meme.downvotes}
        </Button>
      </Flex>
    </CardMedia>
  );
}

export default MemeCard;
