import {AfterViewInit, Directive, ElementRef} from "@angular/core";

@Directive({
  selector: '[selectHeight]'
})
export class CustomSelectHeightDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    const children = this.elementRef.nativeElement.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].children.length > 10) {
        this.elementRef.nativeElement.style.height = '250px'
      } else {
        this.elementRef.nativeElement.style.height = 'fit-content';
        this.elementRef.nativeElement.style.overflowY = 'hidden';
      }
    }
  }

}
