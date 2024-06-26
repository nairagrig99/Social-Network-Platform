import {animate, state, style, transition, trigger} from "@angular/animations";

export const inputCalendarWindowAnimation = [
  trigger('toggleCalendar', [
    state('open',
      style({
        minWidth: '225px',
        maxWidth: '300px',
        maxHeight: '270px',
        height: '270px',
        minHeight: '0',
        right: '-13px',
        width: 'fit-content',
        padding: '12px',
        top: '5px',
        opacity: 1,
        backgroundColor: '#F3EAD2',
        display: 'block'
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
        display: 'none',
        opacity: 0
      })
    ),
    transition('close <=> open', animate('200ms  ease-in'))
  ])
]
