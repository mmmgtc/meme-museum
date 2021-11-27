import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Particles from "react-tsparticles";

import Card from "../custom/Card";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const particlesInit = (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <>
      <Header />
      <Particles
        key="bg"
        style={{
          zIndex: -1,
        }}
        url="particles-link.json"
        init={particlesInit}
        loaded={particlesLoaded}
      />

      <Box
        zIndex="10"
        pt="12"
        margin="0 auto"
        maxWidth="7xl"
        transition="0.5s ease-out"
      >
        <Box margin="8">
          <Box as="main" marginY={22}>
            <Card>{children}</Card>
          </Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
