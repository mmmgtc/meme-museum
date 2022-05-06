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

  const TopHeading = () => (
    <Box ml={10} fontWeight="semibold">
      🎉 MEMEPALOOZA DAY 🎉{" "}
      <Link
        target="_blank"
        textDecoration="underline"
        href="https://discord.gg/gitcoin"
      >
        Join now!
      </Link>
    </Box>
  );
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
          <Marquee
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
