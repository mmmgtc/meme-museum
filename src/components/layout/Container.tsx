import { VStack } from "@chakra-ui/react";
import React from "react";

interface Children {
  children: React.ReactNode;
}
const Container = (props: Children) => {
  const { children } = props;
  return (
    <VStack pt="7" w="full" minH={{ sm: "400px", md: "700px" }}>
      {children}
    </VStack>
  );
};

export default Container;
