import { useColorModeValue } from "@chakra-ui/color-mode";
import { VStack, Image, Box } from "@chakra-ui/react";

function CardMedia(props: any) {
  const { children, src, ...others } = props;
  // const bg = useColorModeValue("purple.200", "white");
  return (
    <VStack
      alignItems="center"
      bg="none"
      h="auto"
      w="full"
      rounded="3xl"
      color="purple.200"
      {...others}
    >
      <Image
        h="360px"
        w="full"
        src={src}
        roundedTop="2xl"
        objectFit="cover"
        fallbackSrc="/not-sure-if-loading_o_427193.webp"
      />
      {children}
    </VStack>
  );
}

export default CardMedia;
