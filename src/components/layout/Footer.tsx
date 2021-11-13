import { Box, Flex, Link, Text } from "@chakra-ui/react";

import QDIcon from "../Icons/LogoIcon";

const Footer = () => {
  return (
    <Box as="footer" width="full" alignContent="center" py="6">
      <Flex alignItems="center" justifyContent="center">
        <QDIcon />
        <Text ml="4">
          <Link
            href="https://m-m-m.xyz/"
            isExternal
            rel="noopener noreferrer"
            target="_blank"
          >
            MMM 2021
          </Link>
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
