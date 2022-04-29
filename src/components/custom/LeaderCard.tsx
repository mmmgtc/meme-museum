import { Box, Flex, Heading, Link, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";

import { Web3Context } from "../../contexts/Web3Provider";
import { brandColors } from "helpers";

interface LeaderCardProps {
  id: number;
  name: string;
  karma: number;
  src?: string | null;
  index: number;
}

function LeaderCard({ name, karma, id, src, index }: LeaderCardProps) {
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
      paddingX="10"
      paddingY="9"
      borderColor={borderColor}
      borderWidth="medium"
      backgroundColor={bg}
      justifyContent="flex-start"
      rounded="lg"
      maxWidth="2xl"
    >
      {src && index <= 2 && (
        <Image src={src} alt="Medal" height="30px" width="50px" />
      )}
      <Heading paddingRight="12">{id}</Heading>
      <Flex direction="column">
        <Heading size="lg">
          Name:{" "}
          <Link
            textDecoration="underline"
            href={`/profile/${name}`}
            target="_blank"
          >
            {ens ||
              `${name.substring(0, 4)}...${name.substring(name.length - 4)}`}
          </Link>
        </Heading>
        <Heading size="lg">Karma: {karma}</Heading>
      </Flex>
    </Flex>
  );
}

export default LeaderCard;
