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
        opacity: 0.9,
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
            src: "https://i.kym-cdn.com/entries/icons/original/000/031/051/cover4.jpg",
            width: 52,
            height: 32,
          },
          {
            src: "https://i.kym-cdn.com/photos/images/newsfeed/001/865/673/cc9.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://i.kym-cdn.com/photos/images/newsfeed/001/936/373/58d.png",
            width: 72,
            height: 42,
          },
          {
            src: "https://pbs.twimg.com/media/FBwQdrSXEAAVX2w.jpg",
            width: 72,
            height: 42,
          },
          {
            src: "https://i.pinimg.com/originals/94/b5/65/94b565ce7e77eefdcef0fae4894e3fa2.gif",
            width: 32,
            height: 32,
          },
          {
            src: "https://i.kym-cdn.com/photos/images/newsfeed/001/865/686/07a.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/en/c/cc/Wojak_cropped.jpg",
            width: 32,
            height: 32,
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Mydoomer.png/220px-Mydoomer.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://ih1.redbubble.net/image.838053714.1459/pp,840x830-pad,1000x1000,f8f8f8.u2.jpg",
            width: 32,
            height: 32,
          },
          {
            src: "https://i.imgflip.com/5q4ohs.jpg",
            width: 32,
            height: 32,
          },
          {
            src: "https://c.tenor.com/Sya8sngqByoAAAAM/pump-and-dump-doge-coin.gif",
            width: 50,
            height: 50,
          },
          {
            src: "https://images.squarespace-cdn.com/content/v1/5d641c0fc8f92f0001cd9358/1568860160976-EZX0LXYDNLXXO54QB1GQ/green+wojak+crypto+meme+2.jpg",
            width: 73,
            height: 78,
          },
          {
            src: "https://c.tenor.com/TCKfBcXic2oAAAAd/ethereum-eth.gif",
            width: 64,
            height: 40,
          },
          {
            src: "https://data.whicdn.com/images/185332557/original.jpg",
            width: 64,
            height: 64,
          },
        ],
        images: [
          {
            src: "https://i.kym-cdn.com/entries/icons/original/000/031/051/cover4.jpg",
            width: 52,
            height: 32,
          },
          {
            src: "https://i.kym-cdn.com/photos/images/newsfeed/001/865/673/cc9.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://i.kym-cdn.com/photos/images/newsfeed/001/936/373/58d.png",
            width: 72,
            height: 42,
          },
          {
            src: "https://pbs.twimg.com/media/FBwQdrSXEAAVX2w.jpg",
            width: 72,
            height: 42,
          },
          {
            src: "https://i.pinimg.com/originals/94/b5/65/94b565ce7e77eefdcef0fae4894e3fa2.gif",
            width: 32,
            height: 32,
          },
          {
            src: "https://i.kym-cdn.com/photos/images/newsfeed/001/865/686/07a.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/en/c/cc/Wojak_cropped.jpg",
            width: 32,
            height: 32,
          },
          {
            src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Mydoomer.png/220px-Mydoomer.png",
            width: 32,
            height: 32,
          },
          {
            src: "https://ih1.redbubble.net/image.838053714.1459/pp,840x830-pad,1000x1000,f8f8f8.u2.jpg",
            width: 32,
            height: 32,
          },
          {
            src: "https://i.imgflip.com/5q4ohs.jpg",
            width: 32,
            height: 32,
          },
          {
            src: "https://c.tenor.com/Sya8sngqByoAAAAM/pump-and-dump-doge-coin.gif",
            width: 50,
            height: 50,
          },
          {
            src: "https://images.squarespace-cdn.com/content/v1/5d641c0fc8f92f0001cd9358/1568860160976-EZX0LXYDNLXXO54QB1GQ/green+wojak+crypto+meme+2.jpg",
            width: 73,
            height: 78,
          },
          {
            src: "https://c.tenor.com/TCKfBcXic2oAAAAd/ethereum-eth.gif",
            width: 64,
            height: 40,
          },
          {
            src: "https://data.whicdn.com/images/185332557/original.jpg",
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
