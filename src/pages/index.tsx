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
  useDisclosure,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { useEffect, useState } from "react";

import CreateMemeModal from "../components/CreateMemeModal";
import Container from "../components/layout/Container";

const MemeCard = dynamic(() => import("../components/MemeCard"), {
  ssr: false,
});

const MemeData = {
  id: 1,
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
  const [memes, setMemes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    async function fetchMemes() {
      const memesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/museum/memes/?format=json`
      );
      const memesResult = await memesResponse.json();
      console.log({ memesResult });
      setMemes(memesResult);
    }
    fetchMemes();
  }, []);
  return (
    <Container>
      <Flex w="full">
        <Heading color="purple.200">MEME LORDS IN DA PARTY ༼⌐ ■ل͟■ ༽</Heading>
        <Spacer />
        <Button
          rounded="full"
          color="white"
          bg="purple.200"
          onClick={onOpen}
          _hover={{
            background: "purple.700",
          }}
          leftIcon={<AddIcon />}
        >
          CREATE MEME
        </Button>
      </Flex>
      <CreateMemeModal {...{ isOpen, onClose }} />

      <Tabs isFitted variant="soft-rounded" py="2rem" w="full">
        <TabList>
          <Tab
            color="purple.200"
            backgroundColor="white"
            _selected={{
              color: "white",
              background: "purple.200",
            }}
            borderRightRadius="0"
          >
            ALL MEMES
          </Tab>
          <Tab
            color="purple.200"
            backgroundColor="white"
            _selected={{
              color: "white",
              background: "purple.200",
            }}
            borderLeftRadius="0"
          >
            MY MEMES
          </Tab>
        </TabList>

        <TabPanels w="full">
          <TabPanel w="full" px="0">
            <SimpleGrid columns={1} spacing={10}>
              {memes.map((meme) => (
                <MemeCard meme={meme} />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel w="full" px="0">
            <SimpleGrid columns={1} spacing={10}>
              {memes.map((meme) => (
                <MemeCard meme={meme} />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default Memes;
