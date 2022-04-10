export default class BackgroundMaskOptions {
  constructor() {
    return {
      background: {
        color: {
          value: '#ffffff',
        },
        image: "url('https://particles.js.org/images/background3.jpg')",
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover',
      },
      backgroundMask: {
        cover: {
          color: {
            value: {
              r: 255,
              g: 255,
              b: 255,
            },
          },
        },
        enable: true,
      },
      fullScreen: {
        zIndex: -1000,
      },
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: 'push',
          },
          onHover: {
            enable: false,
            mode: 'bubble',
            parallax: {
              force: 60,
            },
          },
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 1,
            size: 100,
          },
          grab: {
            distance: 400,
          },
        },
      },
      particles: {
        color: {
          value: '#ffffff',
        },
        links: {
          color: {
            value: '#ffffff',
          },
          distance: 150,
          enable: true,
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
            bottom: 'out',
            left: 'out',
            right: 'out',
            top: 'out',
          },
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          animation: {
            speed: 1,
            minimumValue: 0.1,
          },
        },
        size: {
          random: {
            enable: true,
          },
          value: {
            min: 1,
            max: 30,
          },
          animation: {
            speed: 40,
            minimumValue: 0.1,
          },
        },
      },
    };
  }
}