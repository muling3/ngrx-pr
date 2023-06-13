import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTestStructural]',
})
export class TestStructuralDirective {
  constructor(private tmpl: TemplateRef<HTMLDivElement>, private viewContainer: ViewContainerRef) {}

  @Input() set appTestStructural(cond: boolean) {
    // console.log('condition', cond);
    // console.log(this.tmpl);
    
    // show the view
    if(cond) this.viewContainer.createEmbeddedView(this.tmpl)

    // else clear the view
    else this.viewContainer.clear()
  }
}
