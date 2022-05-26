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
import { useImageResizer } from "helpers/hooks";

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

  const imageSrc = useImageResizer(src, 250, 250);
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
      <Image src={imageSrc} boxSize="250px" />
    </Flex>
  );
}

export default TopMemeCard;
