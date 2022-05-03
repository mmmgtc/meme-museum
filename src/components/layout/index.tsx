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
      Next Palooza is on the 6th of May 2022,{" "}
      <Link
        target="_blank"
        textDecoration="underline"
        href="http://www.google.com/calendar/event?action=TEMPLATE&text=Memepalooza%208&dates=20220506T180000Z/20220506T200000Z&details=MEMEPALOOZA%3A%20A%20GREAT%20DAY%20FOR%20MEMES%0A%0A%F0%9F%8E%89%20Opening%20Ceremony%20at%202pm%20EST%2F%206pm%20UTC%2C%20going%20until%204pm%20EST%2F8pm%20UTC%0A%0A%F0%9F%93%8D%20Where%3A%20Gitcoin%20Discord%20-%20gitcoin.co%2Fdiscord%20%F0%9F%8E%A8%20%23memes%20%26%20%F0%9F%97%A3%EF%B8%8F%20%23MEMEPALOOZA%0A%0ACome%20have%20fun%20and%20make%20memes%20with%20the%20MMM%20Workstream%20and%20be%20early%20testers%20of%20Moonshot%20Collectives%20projects%20and%20tools%21%0A%0A%F0%9F%91%89%20Memepalooza%20is%20not%20a%20contest%2C%20it%27s%20a%20collaborative%20jam%20session%20and%20a%20celebration%20of%20meme%20lords%20and%20great%20memes%20on%20the%20topic%20of%20public%20goods%2C%20web3%20and%20the%20values%20of%20Gitcoin%20DAO%20-%20and%20it%E2%80%99s%20super%20fun%21%0A%0AParticipants%20will%20have%20a%20chance%20to%20receive%20GTC%20airdrops%2C%20swag%20and%20POAPs%21&location=https://memes.party"
      >
        Add it to your calendar
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
