/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useColorModeValue } from "@chakra-ui/color-mode";
import { VStack, Image, Box, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useInViewport } from "react-in-viewport";

import { useImageResizer } from "helpers/hooks";

function CardMedia(props: any) {
  const { children, src, ...others } = props;
  const myRef = useRef();
  const { enterCount } = useInViewport(myRef, {}, {}, props);

  const imageSrc = useImageResizer(src, 360, 314);
  return (
    <VStack
      ref={myRef}
      alignItems="center"
      bg="none"
      w="fit-content"
      rounded="3xl"
      color="purple.200"
      {...others}
    >
      <Image
        src={
          enterCount > 0
            ? imageSrc || src
            : "/not-sure-if-loading_o_427193.webp"
        }
        roundedTop="2xl"
        objectFit="fill"
        fallbackSrc="/not-sure-if-loading_o_427193.webp"
      />
      {children}
    </VStack>
  );
}

export default CardMedia;
