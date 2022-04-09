import { ISourceOptions } from 'tsparticles';
import BackgroundMaskOptions from './background-mask-options';
import BigParticlesOptions from './big-particles-options';
import MultipleImagesOptions from './multiple-images-options';
import ParallaxOptions from './parallax-options';

export default class ParticleOptions {
  constructor() {
    this.BACKGROUND_MASK = new BackgroundMaskOptions();
    this.BIG_PARTICLES = new BigParticlesOptions();
    this.MULTIPLE_IMAGES = new MultipleImagesOptions();
    this.PARALLAX = new ParallaxOptions();
  }

  BACKGROUND_MASK: ISourceOptions;
  BIG_PARTICLES: ISourceOptions;
  MULTIPLE_IMAGES: ISourceOptions;
  PARALLAX: ISourceOptions;
}
