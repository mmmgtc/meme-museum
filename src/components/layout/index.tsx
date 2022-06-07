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

  const TopHeading = () => {
    const isMemePaloozaDay = () => {
      const currentDate = new Date();
      if (
        new Date("Fri Jun 03 2022 23:30:00 GMT+0530 (India Standard Time)") <=
          currentDate &&
        currentDate <=
          new Date("Sat Jun 04 2022 01:30:00 GMT+0530 (India Standard Time)")
      ) {
        return true;
      }
      return false;
    };

    return (
      <Box ml={10} fontWeight="semibold">
        {isMemePaloozaDay()
          ? "🎉  MEMEPALOOZA DAY 🎉 "
          : "Next Palooza is in July"}{" "}
        <Link
          target="_blank"
          textDecoration="underline"
          href={`${
            isMemePaloozaDay()
              ? "https://discord.gg/gitcoin "
              : "https://calendar.google.com/event?action=TEMPLATE&tmeid=NWFmOWVpMWVkOTFkNGI1M2NxMHNlN21wYnIgY184YWJuZ2thY292cjZ0NGpncXZrZWRiaW5vMEBn&tmsrc=c_8abngkacovr6t4jgqvkedbino0%40group.calendar.google.com"
          }`}
        >
          {isMemePaloozaDay() ? "Join Now!" : "Add to calendar"}
        </Link>
      </Box>
    );
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
          background="purple.200"
          color="white"
          status="info"
        >
          {/* <Marquee
            style={{
              width: "100%",
            }}
            pauseOnHover
            gradient={false}
            loop={0}
            speed={60}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <TopHeading key={i} />
            ))}
          </Marquee> */}
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
          opacity: 0.2,
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
