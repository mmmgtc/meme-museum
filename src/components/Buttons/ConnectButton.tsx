import {
  Button,
  HStack,
  Flex,
  Badge,
  Text,
  IconButton,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import Blockies from "react-blockies";
import { FiLogOut } from "react-icons/fi";

import { Web3Context } from "../../contexts/Web3Provider";
import { brandColors } from "../../helpers";

function ConnectButton() {
  const { account, ens, connectWeb3, logout } = useContext(Web3Context);
  const hoverBg = "purple.700";
  return (
    <Flex gridGap="4" w="full" justifyContent="flex-end">
      {account && (
        <Badge
          rounded="full"
          bg={brandColors.mainPurple}
          fontWeight="600"
          w="fit-content"
        >
          <HStack w="full">
            <Blockies
              size={10}
              seed={account.toLowerCase()}
              className="blockies"
              scale={4}
            />
            <Text
              display={["none", "none", "flex", "flex"]}
              color="white"
              fontWeight="bold"
              isTruncated
              p="2"
            >
              {ens || account}
            </Text>
          </HStack>
        </Badge>
      )}
      {account ? (
        <>
          {/** DESKTOP* */}
          <Button
            aria-label="logout"
            rounded="full"
            _hover={{
              background: "white",
              color: brandColors.mainPurple,
            }}
            color="white"
            bg={brandColors.mainPurple}
            onClick={logout}
            display={["none", "none", "flex", "flex"]}
          >
            LOGOUT
          </Button>
          {/** MOBILE* */}
          <IconButton
            aria-label="logout"
            rounded="full"
            icon={<FiLogOut />}
            _hover={{
              background: "white",
              color: brandColors.mainPurple,
            }}
            color="white"
            bg={brandColors.mainPurple}
            onClick={logout}
            display={["flex", "flex", "none", "none"]}
          />
        </>
      ) : (
        <Button
          rounded="full"
          _hover={{
            background: "white",
            color: "purple.200",
          }}
          color="white"
          bg="purple.200"
          onClick={connectWeb3}
        >
          CONNECT
        </Button>
      )}
    </Flex>
  );
}

export default ConnectButton;
