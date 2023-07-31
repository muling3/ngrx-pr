import {
  Component,
  ElementRef,
  Injector,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ActionTypes } from '../counter.actions';
import { ModalComponent } from '../modal/modal.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  count$!: Observable<number>;

  @ViewChild('myRow') tRow!: ElementRef;
  @ViewChild('amount')
  amount!: ElementRef;

  constructor(
    private store: Store<{ count: number }>,
    private resolver: ViewContainerRef,
    private injector: Injector
  ) {
    this.count$ = store.select('count');
  }

  ngOnInit() {}

  increment() {
    this.store.dispatch({ type: ActionTypes.IncrementCount });
  }

  decrement() {
    this.store.dispatch({ type: ActionTypes.DecrementCount });
  }

  reset() {
    this.store.dispatch({ type: ActionTypes.ResetCount });
  }

  incrementByValue() {
    console.log(this.amount.nativeElement.value);
    this.store.dispatch({
      type: ActionTypes.IncrementByValue,
      payload: { value: parseInt(this.amount.nativeElement.value) },
    });
    
      }

  openModal(modal: TemplateRef<any>): void {
    const componentRef = this.resolver.createComponent(ModalComponent);
    componentRef;
  }

  checkboxChange(e: any) {
    let obj = {};
    // console.log('tRow', this.tRow.nativeElement.cells);
    // let cells = Array.from(this.tRow.nativeElement.cells).splice(0, 1);
    // for (let i = 0; i < cells.length; i++) {
    //   const element = cells[i] as HTMLTableCellElement;
    //   console.log('val', element.innerText);
    // }

    const cells = this.tRow.nativeElement.querySelectorAll('td');
    const rowValues = Array.from(cells).map((cell: any) => cell.textContent);
    rowValues.splice(0, 1);
    console.log('Row Values:', rowValues);
  }
}
