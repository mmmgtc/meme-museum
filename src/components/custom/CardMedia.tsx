/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useColorModeValue } from "@chakra-ui/color-mode";
import { VStack, Image, Box, Divider } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useInViewport } from "react-in-viewport";

import { useImageResizer } from "helpers/hooks";

function CardMedia(props: any) {
  const { children, src, ...others } = props;
  const myRef = useRef();
  const { enterCount } = useInViewport(myRef, {}, {}, props);

  const imageSrc = useImageResizer(src, 360, 314);
  return (
    <Box boxShadow="purple" rounded="2xl" bg="white">
      <VStack
        ref={myRef}
        alignItems="center"
        bg="none"
        w="fit-content"
        rounded="2xl"
        color="purple.200"
        {...others}
      >
        <Image
          src={
            enterCount > 0
              ? imageSrc || src
              : "/not-sure-if-loading_o_427193.webp"
          }
          objectFit="fill"
          fallbackSrc="/not-sure-if-loading_o_427193.webp"
        />
        {children}
      </VStack>
    </Box>
  );
}

export default CardMedia;
