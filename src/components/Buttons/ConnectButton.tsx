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

function ConnectButton() {
  const { account, connectWeb3, logout } = useContext(Web3Context);
  const hoverBg = "purple.700";
  return (
    <Flex gridGap="4" w="full" justifyContent="flex-end">
      {account && (
        <Badge rounded="full" bg="purple.200" fontWeight="600" w="fit-content">
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
            >
              {account}
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
              background: hoverBg,
            }}
            color="white"
            bg="purple.200"
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
              background: hoverBg,
            }}
            color="white"
            bg="purple.200"
            onClick={logout}
            display={["flex", "flex", "none", "none"]}
          />
        </>
      ) : (
        <Button
          rounded="full"
          _hover={{
            background: hoverBg,
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
