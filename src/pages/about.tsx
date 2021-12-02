import { Container, VStack, Text } from "@chakra-ui/react";
import React from "react";

import Card from "../components/custom/Card";

function About() {
  return (
    <Card>
      <Container>
        <VStack alignItems="center">
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt nisi
            incidunt amet magni? Mollitia nostrum natus facilis unde harum rem
            corporis architecto cumque neque nemo, explicabo, dolor dolore
            deleniti odit!
          </Text>
        </VStack>
      </Container>
    </Card>
  );
}

export default About;
