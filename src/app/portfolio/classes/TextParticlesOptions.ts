import { ISourceOptions } from 'tsparticles';
export default class TextParticlesOptions implements ISourceOptions {
  constructor(params: any) {
    return {
      background: {
        color: {
          value: '#212121',
        },
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover',
      },
      fullScreen: {
        enable: true,
        zIndex: 1,
      },
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: 'push',
          },
          onHover: {
            enable: false,
            mode: 'repulse',
            parallax: {
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
            divs: {
              distance: 200,
              duration: 0.4,
              mix: false,
              selectors: [],
            },
          },
          grab: {
            distance: 400,
          },
          repulse: {
            divs: {
              distance: 200,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: 'ease-out-quad',
              selectors: [],
            },
          },
        },
      },
      particles: {
        color: {
          value: 'random',
        },
        links: {
          color: {
            value: '#ffffff',
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
          path: {},
          outModes: {
            bottom: 'out',
            left: 'out',
            right: 'out',
            top: 'out',
          },
          spin: {},
        },
        number: {
          density: {
            enable: true,
          },
          limit: 30,
          value: 30,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 0.5,
          },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
          },
        },
        shape: {
          options: {
            character: {
              value: [
                'Love',
                'Bliss',
                'Beauty',
                'Balance',
                'Build',
                'Create',
                'Dream',
                'Focus',
                'Fresh',
                'Imagine',
                'Innovate',
                'Inspire',
                'Lead',
                'Learn',
                'Passion',
                'Peace',
              ],
              font: '',
              style: '',
              weight: '700',
              fill: true,
            },
            char: {
              value: [
                'Love',
                'Bliss',
                'Beauty',
                'Balance',
                'Build',
                'Create',
                'Dream',
                'Focus',
                'Fresh',
                'Imagine',
                'Innovate',
                'Inspire',
                'Lead',
                'Learn',
                'Passion',
                'Peace',
              ],
              font: '',
              style: '',
              weight: '400',
              fill: true,
            },
          },
          type: 'char',
        },
        size: {
          value: 16,
          animation: {
            speed: 10,
            minimumValue: 10,
          },
        },
        stroke: {
          width: 1,
          color: {
            value: '#ffffff',
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
  }
}
