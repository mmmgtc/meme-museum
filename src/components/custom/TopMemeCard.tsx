import {
  Flex,
  Heading,
  Image,
  VStack,
  useColorModeValue,
  Text,
  Stack,
  HStack,
  Box,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import { Web3Context } from "../../contexts/Web3Provider";
import { brandColors } from "helpers";

type Tags = {
  name: string;
};

interface TopMemeCardProps {
  src: string;
  address: string;
  tags?: Tags[];
}

function TopMemeCard({ src, address, tags }: TopMemeCardProps) {
  const { staticProvider } = useContext(Web3Context);
  const [ens, setEns] = useState<string | null>(null);
  const borderColor = useColorModeValue("#8C65F7", "white");
  const bg = useColorModeValue("white", brandColors.mainPurple);

  useEffect(() => {
    async function getEns() {
      if (staticProvider && address) {
        try {
          const resolvedEns = await staticProvider.lookupAddress(address);
          console.log("ens: ", resolvedEns);
          setEns(resolvedEns);
        } catch (error) {
          console.log({ error });
          setEns(null);
        }
      }
    }
    getEns();
  }, [staticProvider, address]);

  return (
    <Flex
      bg={bg}
      rounded="3xl"
      overflow="hidden"
      borderColor={borderColor}
      borderWidth="medium"
      alignItems="center"
    >
      <Image src={src} boxSize="250px" />
      <VStack padding="2.5" alignItems="flex-start">
        <Heading color={borderColor} fontSize="2xl">
          Name:
          {ens ||
            `${address.substring(0, 4)}...${address.substring(
              address.length - 4
            )}`}
        </Heading>
        <HStack justifyContent="center" alignItems="flex-start">
          <Heading color={borderColor} fontSize="2xl">
            Tags:
          </Heading>
          <VStack>
            {tags &&
              tags?.length > 0 &&
              tags?.map((tag, index) => (
                <Box
                  key={tag.name}
                  borderColor={borderColor}
                  borderWidth="1px"
                  paddingX="2"
                  rounded="full"
                >
                  {tag.name}
                </Box>
              ))}
          </VStack>
        </HStack>
      </VStack>
    </Flex>
  );
}

export default TopMemeCard;
