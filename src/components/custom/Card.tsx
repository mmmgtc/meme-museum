import { VStack, StackProps } from "@chakra-ui/react";

function Card(props: StackProps) {
  const { children, ...others } = props;
  return (
    <VStack
      background={others.bg || "none"}
      py="6"
      px="8"
      h="auto"
      borderRadius="3xl"
      spacing="4"
      align="start"
      {...others}
    >
      {children}
    </VStack>
  );
}

export default Card;
