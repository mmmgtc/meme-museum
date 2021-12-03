import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
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

  const particlesLoaded = (container) => {
    // console.log(container);
  };
  return (
    <>
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
        maxWidth="8xl"
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
