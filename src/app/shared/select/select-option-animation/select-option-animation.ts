import {animate, state, style, transition, trigger} from "@angular/animations";

export const selectOptionAnimation = [
  trigger('toggleSelectOption',
    [
      state('open',
        style({
         display:'block'
        })),
      state('close',
        style({
          display: 'none'
        })
      ),
      transition('close<=>open', animate('200ms  ease-in'))
    ]
  )
]
