import {Directive, ElementRef, Input, Renderer2} from "@angular/core";


@Directive({
  selector: '[placeholderDir]'
})


export class PlaceholderDirective {

  @Input() set placeholderDirective(placeholder: string) {
    if (placeholder.length ) {
      const beforeElement = this.renderer.createElement('span');
      beforeElement.style.color = 'grey'
      beforeElement.style.fontFamily = 'sans-serif'
      this.renderer.appendChild(beforeElement, this.renderer.createText(placeholder));
      this.renderer.insertBefore(this.elementRef.nativeElement, beforeElement, this.elementRef.nativeElement.firstChild);
    } else if (this.elementRef.nativeElement.children.length > 0 && placeholder.length == 0) {
      const children = Array.from(this.elementRef.nativeElement.children);
      this.renderer.removeChild(this.elementRef.nativeElement, children[0])
    }

  };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {

  }
}
