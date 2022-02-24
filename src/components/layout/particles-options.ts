const url = "https://d2wwrm96vfy3z4.cloudfront.net/image";
export const connecticles = {
  background: {
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
  fullScreen: {
    zIndex: -1,
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onDiv: {
        selectors: "#repulse-div",
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: "connect",
        parallax: {
          force: 60,
        },
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 4,
        opacity: 0.8,
        size: 40,
      },
      grab: {
        distance: 400,
      },
    },
  },
  particles: {
    color: {
      value: "random",
    },
    links: {
      color: {
        value: "#ffffff",
      },
      distance: 150,
      opacity: 0.4,
    },
    move: {
      attract: {
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      enable: true,
      outModes: {
        default: "out",
        bottom: "out",
        left: "out",
        right: "out",
        top: "out",
      },
      speed: 2,
    },
    number: {
      density: {
        enable: true,
      },
      limit: 500,
      value: 300,
    },
    opacity: {
      value: 0.5,
      animation: {
        speed: 1,
        minimumValue: 0.1,
      },
    },
    size: {
      random: {
        enable: true,
        minimumValue: 0.1,
      },
      value: {
        min: 1,
        max: 5,
      },
      animation: {
        speed: 10,
        minimumValue: 0.1,
      },
    },
  },
};

export const memeticles = {
  background: {
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
  fullScreen: {
    zIndex: -1,
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onDiv: {
        selectors: "#repulse-div",
        mode: "repulse",
      },
      onHover: {
        enable: true,
        mode: "bubble",
        parallax: {
          force: 60,
        },
      },
    },
    modes: {
      bubble: {
        distance: 300,
        duration: 2,
        opacity: 0.6,
        size: 50,
      },
      grab: {
        distance: 400,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: {
        value: "#000",
      },
      distance: 150,
      opacity: 0.4,
    },
    move: {
      attract: {
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      enable: true,
      outModes: {
        default: "out",
        bottom: "out",
        left: "out",
        right: "out",
        top: "out",
      },
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      random: {
        enable: true,
        minimumValue: 0.1,
      },
      value: {
        min: 0.1,
        max: 1,
      },
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.2,
      },
    },
    rotate: {
      random: {
        enable: true,
        minimumValue: 0.1,
      },
      animation: {
        enable: true,
        speed: 5,
      },
      direction: "random",
    },
    shape: {
      options: {
        character: {
          fill: false,
          font: "Verdana",
          style: "",
          value: "*",
          weight: "400",
        },
        char: {
          fill: false,
          font: "Verdana",
          style: "",
          value: "*",
          weight: "400",
        },
        polygon: {
          sides: 5,
        },
        star: {
          sides: 5,
        },
        image: [
          {
            src: `${url}?height=32&width=32&url=https://cdn.discordapp.com/attachments/906238436028059698/915897767832997898/hey.gif`,
            width: 32,
            height: 32,
          },
          {
            src: `${url}?height=32&width=32&url=https://cdn.discordapp.com/attachments/906238436028059698/915897774665506836/feelsgood.png`,
            width: 32,
            height: 32,
          },
          {
            src: `${url}?height=32&width=32&url=https://cdn.discordapp.com/attachments/906238436028059698/915897773121998868/FEbkX93XIAAjvqm.jpg`,
            width: 32,
            height: 32,
          },
          {
            src: `${url}?height=72&width=52&url=https://cdn.discordapp.com/attachments/906238436028059698/915897777232441374/FEkmOy3XMAAMFBM.jpg`,
            width: 52,
            height: 72,
          },
          {
            src: `${url}?height=42&width=72&url=https://cdn.discordapp.com/attachments/906238436028059698/915897779698667530/gm.gif`,
            width: 72,
            height: 42,
          },
          {
            src: `${url}?height=80&width=80&url=https://cdn.discordapp.com/attachments/906238436028059698/915897782764716072/green_pill.png`,
            width: 80,
            height: 80,
          },
          {
            src: `${url}?height=50&width=50&url=https://cdn.discordapp.com/attachments/906238436028059698/914911104000467024/dark_theme.png`,
            width: 50,
            height: 50,
          },
          {
            src: `${url}?height=80&width=80&url=https://images.squarespace-cdn.com/content/v1/5d641c0fc8f92f0001cd9358/1568860160976-EZX0LXYDNLXXO54QB1GQ/green+wojak+crypto+meme+2.jpg`,
            width: 80,
            height: 80,
          },
          {
            src: `${url}?height=40&width=64&url=https://c.tenor.com/TCKfBcXic2oAAAAd/ethereum-eth.gif`,
            width: 64,
            height: 40,
          },
          {
            src: `${url}?height=64&width=64&url=https://data.whicdn.com/images/185332557/original.jpg`,
            width: 64,
            height: 64,
          },
        ],
        images: [
          {
            src: `${url}?height=32&width=32&url=https://cdn.discordapp.com/attachments/906238436028059698/915897767832997898/hey.gif`,
            width: 32,
            height: 32,
          },
          {
            src: `${url}?height=32&width=32&url=https://cdn.discordapp.com/attachments/906238436028059698/915897774665506836/feelsgood.png`,
            width: 32,
            height: 32,
          },
          {
            src: `${url}?height=32&width=32&url=https://cdn.discordapp.com/attachments/906238436028059698/915897773121998868/FEbkX93XIAAjvqm.jpg`,
            width: 32,
            height: 32,
          },
          {
            src: `${url}?height=72&width=52&url=https://cdn.discordapp.com/attachments/906238436028059698/915897777232441374/FEkmOy3XMAAMFBM.jpg`,
            width: 52,
            height: 72,
          },
          {
            src: `${url}?height=42&width=72&url=https://cdn.discordapp.com/attachments/906238436028059698/915897779698667530/gm.gif`,
            width: 72,
            height: 42,
          },
          {
            src: `${url}?height=80&width=80&url=https://cdn.discordapp.com/attachments/906238436028059698/915897782764716072/green_pill.png`,
            width: 80,
            height: 80,
          },
          {
            src: `${url}?height=50&width=50&url=https://cdn.discordapp.com/attachments/906238436028059698/914911104000467024/dark_theme.png`,
            width: 50,
            height: 50,
          },
          {
            src: `${url}?height=80&width=80&url=https://images.squarespace-cdn.com/content/v1/5d641c0fc8f92f0001cd9358/1568860160976-EZX0LXYDNLXXO54QB1GQ/green+wojak+crypto+meme+2.jpg`,
            width: 80,
            height: 80,
          },
          {
            src: `${url}?height=40&width=64&url=https://c.tenor.com/TCKfBcXic2oAAAAd/ethereum-eth.gif`,
            width: 64,
            height: 40,
          },
          {
            src: `${url}?height=64&width=64&url=https://data.whicdn.com/images/185332557/original.jpg`,
            width: 64,
            height: 64,
          },
        ],
      },
      type: "image",
    },
    size: {
      value: 16,
      animation: {
        speed: 40,
        minimumValue: 0.1,
      },
    },
    stroke: {
      color: {
        value: "#000000",
        animation: {
          h: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
          s: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
          l: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
        },
      },
    },
  },
};

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
