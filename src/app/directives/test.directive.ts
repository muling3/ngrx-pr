import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTest]',
})
export class TestDirective {
  constructor(private elem: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    console.log(this.elem.nativeElement);
    // adding styles here
    this.elem.nativeElement.style.color = 'red';

    // using rendere 2
    // this.renderer.setStyle(
    //   this.elem.nativeElement,
    //   'backgroundColor',
    //   'yellow'
    // );
  }

  @Input() set innerStyles(stylesObject: Object) {
    // destructuring the object into array
    const styleEntries = Object.entries(stylesObject);

    //looping thru the array
    for (let [key, value] of styleEntries) {
      // apply the styles to the view
      this.renderer.setStyle(
        this.elem.nativeElement,
        key,
        value
      );
    }

  }
}
