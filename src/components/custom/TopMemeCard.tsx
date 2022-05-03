import { Flex, Heading, Image, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import { Web3Context } from "../../contexts/Web3Provider";

interface TopMemeCardProps {
  src: string;
  address: string;
  tags?: string[];
}

function TopMemeCard({ src, address, tags }: TopMemeCardProps) {
  const { staticProvider } = useContext(Web3Context);
  const [ens, setEns] = useState<string | null>(null);

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
    <Flex bg="white">
      <Image src={src} boxSize="250px" />
      <VStack>
        <Heading color="black">
          Name:
          {ens ||
            `${address.substring(0, 4)}...${address.substring(
              address.length - 4
            )}`}
        </Heading>
        tags: {tags}
      </VStack>
    </Flex>
  );
}

export default TopMemeCard;
