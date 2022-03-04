/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useColorModeValue } from "@chakra-ui/color-mode";
import { VStack, Image, Box, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useInViewport } from "react-in-viewport";

function CardMedia(props: any) {
  const { children, src, ...others } = props;
  const myRef = useRef();
  const { enterCount } = useInViewport(myRef, {}, {}, props);

  const ipfsId = src.toString().includes("ipfs.io")
    ? src.toString().substring(21)
    : src.toString().substring(8, src.toString().length - 15);

  const newSrc = `https://d2wwrm96vfy3z4.cloudfront.net/image?height=360&width=314&url=https://ipfs.io/ipfs/${ipfsId}`;

  return (
    <VStack
      ref={myRef}
      alignItems="center"
      bg="none"
      w="full"
      rounded="3xl"
      color="purple.200"
      {...others}
    >
      <Image
        src={
          enterCount > 0 ? newSrc || src : "/not-sure-if-loading_o_427193.webp"
        }
        roundedTop="2xl"
        objectFit="cover"
        fallbackSrc="/not-sure-if-loading_o_427193.webp"
      />
      {children}
    </VStack>
  );
}

export default CardMedia;
