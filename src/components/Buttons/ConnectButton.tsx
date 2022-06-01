import {
  Badge,
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import Blockies from "react-blockies";
import { FiLogOut } from "react-icons/fi";

import { Web3Context } from "../../contexts/Web3Provider";
import { brandColors } from "../../helpers";

function ConnectButton() {
  const { account, ens, connectWeb3, logout } = useContext(Web3Context);
  const bg = useColorModeValue("white", "white");
  const color = useColorModeValue(
    brandColors.mainPurple,
    brandColors.mainPurple
  );
  const borderColor = useColorModeValue("#8C65F7", "#8C65F7");

  return (
    <Flex gridGap="4" w="full" justifyContent="flex-end">
      {account && (
        <Badge
          rounded="full"
          fontWeight="600"
          w="fit-content"
          variant="solid"
          bg={bg}
          border={`solid 4px ${borderColor}`}
          color={color}
        >
          <HStack w="full">
            <Blockies
              size={10}
              seed={account.toLowerCase()}
              className="blockies"
              scale={3}
            />
            <Text
              display={["none", "none", "flex", "flex"]}
              fontWeight="bold"
              color={color}
              isTruncated
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
            variant="solid"
            bg={bg}
            border={`solid 4px ${borderColor}`}
            color={color}
            _hover={{
              bg: brandColors.darkPurple,
              color: "white",
            }}
            onClick={logout}
            display={["none", "none", "flex", "flex"]}
          >
            LOGOUT
          </Button>
          {/** MOBILE* */}
          <IconButton
            aria-label="logout"
            icon={<FiLogOut />}
            rounded="full"
            variant="solid"
            bg={bg}
            border={`solid 4px ${borderColor}`}
            color={color}
            _hover={{
              bg: brandColors.darkPurple,
              color: "white",
            }}
            onClick={logout}
            display={["flex", "flex", "none", "none"]}
          />
        </>
      ) : (
        <Button
          rounded="full"
          bg={bg}
          border={`solid 4px ${borderColor}`}
          color={color}
          _hover={{
            bg: brandColors.darkPurple,
            color: "white",
          }}
          onClick={connectWeb3}
        >
          CONNECT
        </Button>
      )}
    </Flex>
  );
}

export default ConnectButton;
