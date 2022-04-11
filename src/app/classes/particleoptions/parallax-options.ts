export default class ParallaxOptions {
  constructor(darkMode: boolean) {
    let bgColor = darkMode ? '#212121' : '#F5F5F5';
    return {
      background: {
        color: {
          value: bgColor,
        },
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover',
      },
      fullScreen: {
        zIndex: -1000,
      },
      interactivity: {
        events: {
          onClick: {
            mode: 'push',
          },
          onHover: {
            mode: 'grab',
            parallax: {
              enable: true,
              force: 60,
            },
          },
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
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
          value: '#2df6a2',
        },
        links: {
          color: {
            value: '#006892',
          },
          distance: 150,
          enable: true,
          opacity: 0.4,
          shadow: {
            color: {
              value: '#000000',
            },
            enabled: true,
          },
        },
        move: {
          attract: {
            rotate: {
              x: 600,
              y: 1200,
            },
          },
          enable: true,
          path: {},
          outModes: {
            bottom: 'out',
            left: 'out',
            right: 'out',
            top: 'out',
          },
          speed: 1,
          spin: {
            acceleration: 10,
          },
          warp: true,
        },
        number: {
          density: {
            enable: true,
          },
          limit: 125,
          value: 125,
        },
        opacity: {
          random: {
            enable: true,
          },
          value: {
            min: 0.1,
            max: 0.5,
          },
          animation: {
            enable: true,
            speed: 3,
            minimumValue: 0.1,
          },
        },
        repulse: {
          value: 1,
        },
        size: {
          random: {
            enable: true,
          },
          value: {
            min: 0.1,
            max: 10,
          },
          animation: {
            enable: true,
            speed: 20,
            minimumValue: 0.1,
          },
        },
        wobble: {
          enable: true,
        },
      },
    };
  }
}
