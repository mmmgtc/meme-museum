import { Box, Flex, Heading, Link, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";

import { Web3Context } from "../../contexts/Web3Provider";
import { brandColors } from "helpers";

interface LeaderCardProps {
  id: number;
  name: string;
  karma: number;
}

function LeaderCard({ name, karma, id }: LeaderCardProps) {
  const borderColor = useColorModeValue("#8C65F7", "white");
  const bg = useColorModeValue("white", brandColors.mainPurple);
  const { staticProvider } = useContext(Web3Context);
  const [ens, setEns] = useState<string | null>(null);

  useEffect(() => {
    async function getEns() {
      if (staticProvider && name) {
        try {
          const resolvedEns = await staticProvider.lookupAddress(name);
          console.log("ens: ", resolvedEns);
          setEns(resolvedEns);
        } catch (error) {
          console.log({ error });
          setEns(null);
        }
      }
    }
    getEns();
  }, [staticProvider, name]);
  return (
    <Flex
      paddingX="16"
      paddingY="9"
      borderColor={borderColor}
      borderWidth="medium"
      backgroundColor={bg}
      justifyContent="flex-start"
      rounded="lg"
    >
      <Heading paddingRight="12">{id}</Heading>
      <Flex direction="column">
        <Heading size="lg">
          Name:{" "}
          <Link href={`/profile/${name}`} target="_blank">
            {ens || name}
          </Link>
        </Heading>
        <Heading size="lg">Karma: {karma}</Heading>
      </Flex>
    </Flex>
  );
}

export default LeaderCard;
