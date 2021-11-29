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
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
    // const nyanConfig = {
    //   background: {
    //     image:
    //       "url('http://vincentgarreau.com/particles.js/assets/img/kbLd9vb_new.gif')",
    //     position: "0 50%",
    //     repeat: "no-repeat",
    //     opacity: 0.2,
    //     size: "100%",
    //   },
    //   fullScreen: {
    //     zIndex: -1,
    //   },
    //   interactivity: {
    //     events: {
    //       onClick: {
    //         enable: true,
    //         mode: "push",
    //       },
    //       onHover: {
    //         enable: true,
    //         mode: "bubble",
    //       },
    //     },
    //     modes: {
    //       bubble: {
    //         distance: 200,
    //         duration: 2,
    //         opacity: 1,
    //         size: 10,
    //       },
    //       repulse: {
    //         distance: 100,
    //       },
    //     },
    //   },
    //   particles: {
    //     color: {
    //       value: "#8C65F7",
    //     },
    //     links: {
    //       color: {
    //         value: "#ffffff",
    //       },
    //       distance: 150,
    //       opacity: 0.4,
    //     },
    //     move: {
    //       attract: {
    //         rotate: {
    //           x: 600,
    //           y: 1200,
    //         },
    //       },
    //       direction: "left",
    //       enable: true,
    //       outModes: {
    //         default: "out",
    //         bottom: "out",
    //         left: "out",
    //         right: "out",
    //         top: "out",
    //       },
    //       speed: 6,
    //       straight: true,
    //     },
    //     opacity: {
    //       value: 0.5,
    //       animation: {
    //         speed: 1,
    //         minimumValue: 0.1,
    //       },
    //     },
    //     shape: {
    //       options: {
    //         star: {
    //           sides: 5,
    //         },
    //       },
    //       type: "star",
    //     },
    //     size: {
    //       random: {
    //         enable: true,
    //         minimumValue: 0.1,
    //       },
    //       value: {
    //         min: 1,
    //         max: 4,
    //       },
    //       animation: {
    //         speed: 40,
    //         minimumValue: 0.1,
    //       },
    //     },
    //   },
    // }
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
        maxWidth="7xl"
        transition="0.5s ease-out"
      >
        <Box margin="8">
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
