import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

let slide = trigger('slide', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', position: 'absolute' }),
    animate('500ms', style({ transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', position: 'absolute' }),
    animate('500ms', style({ transform: 'translateX(-100%)' })),
  ]),
]);

export { slide };
