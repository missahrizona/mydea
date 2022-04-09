export default class BigParticlesOptions {
  constructor() {
    return {
      background: {
        color: {
          value: '#ffffff',
        },
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover',
      },
      fullScreen: {
        zIndex: -1000,
      },
      particles: {
        collisions: {
          enable: true,
          overlap: {
            enable: false,
          },
        },
        color: {
          value: ['#5bc0eb', '#fde74c', '#9bc53d', '#e55934', '#fa7921'],
        },
        move: {
          direction: 'top',
          enable: true,
          path: {},
          outModes: {
            bottom: 'out',
            left: 'out',
            right: 'out',
            top: 'out',
          },
          speed: 3,
          spin: {},
        },
        number: {
          limit: 50,
          value: 30,
        },
        opacity: {
          random: {
            enable: true,
            minimumValue: 0.4,
          },
          value: {
            min: 0.4,
            max: 0.8,
          },
          animation: {
            speed: 1,
            minimumValue: 0.1,
          },
        },
        size: {
          random: {
            enable: true,
            minimumValue: 100,
          },
          value: {
            min: 25,
            max: 300,
          },
          animation: {
            enable: true,
            speed: 100,
            minimumValue: 100,
          },
        },
      },
    };
  }
}
