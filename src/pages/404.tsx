import {
  Box,
  Button,
  Heading,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import { brandColors } from "../helpers";
import MotionBox from "components/motion/Box";

const Page404 = () => {
  const color = useColorModeValue(brandColors.mainPurple, "white");
  const altColor = useColorModeValue("white", brandColors.darkPurple);
  const borderColor = useColorModeValue("#8C65F7", "white");
  return (
    <Box w="full">
      <MotionBox
        animate={{ y: 20 }}
        pt="10"
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        width={["100%", "70%", "60%", "60%"]}
        margin="0 auto"
      >
        <Image src="/404FACE.png" alt="Error 404 not found Illustration" />
      </MotionBox>

      <Box textAlign="center" py="10">
        <Link href="/" passHref>
          <Button
            size="lg"
            rounded="full"
            variant="solid"
            bg="purple.200"
            border={`solid 5px ${borderColor}`}
            color="white"
            _hover={{
              bg: altColor,
              color,
            }}
            fontSize="xl"
            leftIcon={<FaArrowLeft />}
          >
            GO BACK!!
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Page404;
