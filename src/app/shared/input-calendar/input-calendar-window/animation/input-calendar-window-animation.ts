import {animate, state, style, transition, trigger} from "@angular/animations";

export const inputCalendarWindowAnimation = [
  trigger('toggleCalendar', [
    state('open',
      style({
        minWidth: '275px',
        maxWidth: '300px',
        width: '100%',
        maxHeight: '240px',
        minHeight: '0',
        position: 'absolute',
        bottom: '0',
        right: '0',
        background: 'black',
        color: 'white',
        opacity: 1
      })),
    state('close',
      style({
        minWidth: '0',
        maxWidth: '0',
        width: '0',
        maxHeight: '0',
        minHeight: '0',
        top: '-10px',
        right: '10px',
        opacity: 0
      })
    ),
    transition('close <=> open', animate('200ms ease-in'))
  ])
]
