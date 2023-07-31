import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[myTest]',
  standalone: true
})
export class TestDirective {
  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {}

  ngOnInit() : void {
    console.log("this.template", this.template)
  }

  @Input() set myTest(rules: string[]) {

    const allowedRoles = JSON.parse(localStorage.getItem("allowedRoles") as string)

    console.log("allowed roles", allowedRoles)

    let intersection = []
    for(let rule of rules){
        for(let role of allowedRoles.roles) {
            if(rule.match(RegExp(role, 'i'))) intersection.push(rule)
        }
    }

    if(intersection.length > 1) this.container.createEmbeddedView(this.template)
    else this.container.clear()
    // if(cond) this.container.createEmbeddedView(this.template)
    // else this.container.clear()
    // for(let [cls, cond] of Object.entries(obj)){
    //     if(cond) this.renderer.addClass(this.element.nativeElement, cls)
    // }
  }
}
