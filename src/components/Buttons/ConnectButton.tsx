import {
  Button,
  HStack,
  Menu,
  Badge,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext } from "react";
import Blockies from "react-blockies";
import { AiFillSetting } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";

import { Web3Context } from "../../contexts/Web3Provider";

function ConnectButton() {
  const { account, connectWeb3, logout } = useContext(Web3Context);

  return (
    <HStack w="full" justifyContent="center">
      {account && (
        <Badge rounded="full" bg="purple.200" fontWeight="600" w="full">
          <HStack>
            <Blockies
              size={10}
              seed={account.toLowerCase()}
              className="blockies"
              scale={4}
            />
            <Text color="white" fontWeight="bold" isTruncated>
              {account}
            </Text>
          </HStack>
        </Badge>
      )}
      {account ? (
        <Button
          rounded="full"
          _hover={{
            background: "purple.700",
          }}
          color="white"
          bg="purple.200"
          onClick={logout}
        >
          LOGOUT
        </Button>
      ) : (
        <Button
          rounded="full"
          _hover={{
            background: "purple.700",
          }}
          color="white"
          bg="purple.200"
          onClick={connectWeb3}
        >
          CONNECT
        </Button>
      )}
    </HStack>
  );
}

export default ConnectButton;
