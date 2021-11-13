import { VStack, StackProps, Image } from "@chakra-ui/react";

function CardMedia(props: StackProps) {
  const { children, ...others } = props;
  return (
    <VStack
      bg="spacelightalpha"
      h="auto"
      pb="6"
      borderRadius="base"
      spacing="4"
      align="start"
      {...others}
    >
      <Image
        maxH="400px"
        w="full"
        src="https://pbs.twimg.com/media/FD4GHmPVcAAwufb?format=jpg&name=large"
        objectFit="contain"
      />
      {children}
    </VStack>
  );
}

export default CardMedia;
