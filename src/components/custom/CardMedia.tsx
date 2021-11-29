import { SimpleGrid, Image } from "@chakra-ui/react";

function CardMedia(props: any) {
  const { children, src, ...others } = props;
  return (
    <SimpleGrid
      columns={{
        sm: 1,
        md: 2,
      }}
      justifyContent="center"
      alignItems="center"
      bg="spacepink"
      h="auto"
      w="full"
      rounded="3xl"
      color="purple.200"
      {...others}
    >
      <Image
        rounded="3xl"
        w="full"
        maxH="600px"
        src={src}
        objectFit="contain"
      />
      {children}
    </SimpleGrid>
  );
}

export default CardMedia;
