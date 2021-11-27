import { Box, Button, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";

import MotionBox from "components/motion/Box";

const Page404 = () => {
  return (
    <Box mb={8} w="full">
      <MotionBox
        animate={{ y: 20 }}
        pt="10"
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        width={["100%", "70%", "60%", "60%"]}
        margin="0 auto"
      >
        <Image
          src="/404 Error-pana.svg"
          alt="Error 404 not found Illustration"
        />
      </MotionBox>

      <Box>
        <Heading textAlign="center" pt="10">
          ლ(ಠ益ಠლ) PAGE NOT FOUND ლ(ಠ益ಠლ)
        </Heading>
        <Box textAlign="center" pt="10">
          <Link href="/" passHref>
            <Button>GO BACK!!</Button>
          </Link>
        </Box>
      </Box>
      <Box h="180" />
    </Box>
  );
};

export default Page404;
