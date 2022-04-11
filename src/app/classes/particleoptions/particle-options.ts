import BackgroundMaskOptions from './background-mask-options';
import BigParticlesOptions from './big-particles-options';
import MultipleImagesOptions from './multiple-images-options';
import ParallaxOptions from './parallax-options';

export default class ParticleOptions {
  constructor() {}

  backgroundMask(darkMode: boolean): BackgroundMaskOptions {
    return new BackgroundMaskOptions(darkMode);
  }

  bigParticles(darkMode: boolean): BigParticlesOptions {
    return new BigParticlesOptions(darkMode);
  }

  multipleImages(darkMode: boolean): MultipleImagesOptions {
    return new MultipleImagesOptions(darkMode);
  }

  parallax(darkMode: boolean): ParallaxOptions {
    return new ParallaxOptions(darkMode);
  }
}
