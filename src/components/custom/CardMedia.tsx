import { HStack, StackProps, Image } from "@chakra-ui/react";

function CardMedia(props: StackProps) {
  const { children, ...others } = props;
  return (
    <HStack
      bg="spacepink"
      h="auto"
      w="full"
      rounded="3xl"
      color="purple.200"
      {...others}
    >
      <Image
        rounded="3xl"
        maxH="600px"
        src="https://pbs.twimg.com/media/FD4GHmPVcAAwufb?format=jpg&name=large"
        objectFit="contain"
      />
      {children}
    </HStack>
  );
}

export default CardMedia;
