import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  AnimationTriggerMetadata,
} from '@angular/animations';

const startupSlideOut: AnimationTriggerMetadata[] = [
  trigger('startupSlideOut', [
    state('inactive', style({
      transform: "translateY(0)"
    })),
    state('active', style({})),
    transition(
      'inactive => active', [
        animate(
          '1s ease-in-out',
          keyframes([
            style({
              transform: 'translateY(10%)',
              offset: 0.2
            }),
            style({
              transform: 'translateY(-100%)',
              offset: 1
            }),
          ])
        )
      ]
    ),
  ]),
];

const timelineSlideIn: AnimationTriggerMetadata[] = [
  trigger('timelineSlideIn', [
    state('void', style({
      transform: "translateX(-120%)"
    })),
    state('active', style({
      transform: "translateX(0)"
    })),
    transition(
      'void => active', [
        animate(
          '0.2s 1s ease-in-out'
        )
      ]
    ),
  ]),
];

export {
  startupSlideOut,
  timelineSlideIn
};
