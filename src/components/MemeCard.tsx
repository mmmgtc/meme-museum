import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import Blockies from "react-blockies";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

import { brandColors, MemeType } from "../helpers";

import CardMedia from "./custom/CardMedia";

function MemeCard({
  meme,
  openMeme,
  handleUpvote,
  handleDownvote,
}: {
  meme: MemeType;
  openMeme: any;
  handleUpvote: any;
  handleDownvote: any;
}) {
  const bg = useColorModeValue("white", brandColors.mainPurple);
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const badgeBorderColor = useColorModeValue("#8C65F7", "white");
  return (
    <CardMedia
      bg={bg}
      color={color}
      border={`solid 5px ${badgeBorderColor}`}
      src={meme.image}
      onClick={() => openMeme(meme)}
      cursor="pointer"
    >
      <Flex pt="3" pb="4" w="full" justify="space-around">
        <Button
          leftIcon={<FaArrowCircleUp color="#9AE6B4" fontSize="1.7rem" />}
          rounded="full"
          size="md"
          variant="solid"
          border="solid 5px #9AE6B4"
          color={color}
          _hover={{
            background: "purple.500",
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
          leftIcon={<FaArrowCircleDown color="#FEB2B2" fontSize="1.7rem" />}
          rounded="full"
          size="md"
          variant="solid"
          border="solid 5px #FEB2B2"
          color={color}
          _hover={{
            background: "purple.500",
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
