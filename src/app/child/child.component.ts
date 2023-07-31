import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class ChildComponent {

  n: number = 0.5

  @Input() set parentData (n: number){
    this.n = this.n * n 
  }

  get parentData(): number{
    return this.n
  }

  get currentAge(): number{
    return this.n * 0.5
  }
  ngOnInit() : void {
  }
}
