import {
  Alert,
  Box,
  CloseButton,
  Flex,
  Link,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import Marquee from "react-fast-marquee";
import Particles from "react-tsparticles";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { memeticles } from "./particles-options";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const particlesInit = (main) => {
    // console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const { colorMode } = useColorMode();

  const particlesLoaded = (container) => {
    // console.log(container);
  };

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      {isVisible && (
        <Alert
          bg="transparent"
          background={`${colorMode === "dark" ? "purple.200" : "white"}`}
          color={colorMode === "dark" ? "white" : "purple.200"}
          status="info"
        >
          <Marquee
            style={{
              width: "100%",
            }}
            gradient={false}
            loop={0}
            speed={60}
          >
            <Box ml={10} fontWeight="semibold">
              Next Palooza is on the 6th of May 2022,{" "}
              <Link
                target="_blank"
                textDecoration="underline"
                href="http://www.google.com/calendar/event?action=TEMPLATE&text=Memepalooza%206&dates=20220506T010000Z/20220506T020000Z&details=Event%20Details%20Here&location=https://memes.party"
              >
                Add it to your calendar
              </Link>
            </Box>
            <Box ml={10} fontWeight="semibold">
              Next Palooza is on the 6th of May 2022,{" "}
              <Link
                target="_blank"
                textDecoration="underline"
                href="http://www.google.com/calendar/event?action=TEMPLATE&text=Memepalooza%206&dates=20220506T010000Z/20220506T020000Z&details=Event%20Details%20Here&location=https://memes.party"
              >
                Add it to your calendar
              </Link>
            </Box>
            <Box ml={10} fontWeight="semibold">
              Next Palooza is on the 6th of May 2022,{" "}
              <Link
                target="_blank"
                textDecoration="underline"
                href="http://www.google.com/calendar/event?action=TEMPLATE&text=Memepalooza%206&dates=20220506T010000Z/20220506T020000Z&details=Event%20Details%20Here&location=https://memes.party"
              >
                Add it to your calendar
              </Link>
            </Box>
            <Box ml={10} fontWeight="semibold">
              Next Palooza is on the 6th of May 2022,{" "}
              <Link
                target="_blank"
                textDecoration="underline"
                href="http://www.google.com/calendar/event?action=TEMPLATE&text=Memepalooza%206&dates=20220506T010000Z/20220506T020000Z&details=Event%20Details%20Here&location=https://memes.party"
              >
                Add it to your calendar
              </Link>
            </Box>
            <Box ml={10} fontWeight="semibold">
              Next Palooza is on the 6th of May 2022,{" "}
              <Link
                target="_blank"
                textDecoration="underline"
                href="http://www.google.com/calendar/event?action=TEMPLATE&text=Memepalooza%206&dates=20220506T010000Z/20220506T020000Z&details=Event%20Details%20Here&location=https://memes.party"
              >
                Add it to your calendar
              </Link>
            </Box>
          </Marquee>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={0}
            onClick={onClose}
          />
        </Alert>
      )}
      <Navbar />
      <Particles
        key="bg"
        style={{
          zIndex: -1,
        }}
        init={particlesInit}
        loaded={particlesLoaded}
        options={memeticles as any}
      />

      <Box
        zIndex="10"
        margin="0 auto"
        maxWidth="10xl"
        transition="0.5s ease-out"
      >
        <Box>
          <Box as="main" marginY={22}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
