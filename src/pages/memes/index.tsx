import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import NextLink from "next/link";

import Container from "../../components/layout/Container";
import MemeCard from "../../components/MemeCard";

const MemeData = {
  image: "https://siasky.net/AAB-yQ5MuGLqpb5fT9w0gd54RbDfRS9sZDb2aMx9NeJ8QA",
  avatar: "https://siasky.net/AAB-yQ5MuGLqpb5fT9w0gd54RbDfRS9sZDb2aMx9NeJ8QA",
  owner: "huxwell.eth",
  name: "Meme Alpha",
  description:
    "This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.This is an awesome meme.",
  website: "https://www.google.com",
  whitepaper: "https://www.google.com",
  social: {
    github: "https://github.com",
  },
  upvotes: ["0x"],
  downvotes: ["0x"],
  created: "2021-09-13",
};

const allMemes = [MemeData, MemeData, MemeData];

function Memes() {
  return (
    <Container>
      <Flex w="full">
        <Heading>Memes</Heading>
        <Spacer />
        <NextLink href="/create-meme" passHref>
          <Button rightIcon={<AddIcon />}>Create Meme</Button>
        </NextLink>
      </Flex>

      <Tabs py="2rem" w="full">
        <TabList>
          <Tab>All memes</Tab>
          <Tab>My memes</Tab>
        </TabList>

        <TabPanels w="full">
          <TabPanel w="full">
            <SimpleGrid
              columns={{
                sm: 1,
                md: 3,
              }}
              spacing={10}
            >
              {allMemes.map((meme) => (
                <MemeCard meme={meme} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              columns={{
                sm: 1,
                md: 3,
              }}
              spacing={10}
            >
              <MemeCard meme={MemeData} />
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default Memes;
