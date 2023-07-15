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
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class CounterComponent {
  count$!: Observable<number>;

  @ViewChild('amount') amount!: ElementRef;

  constructor(
    private store: Store<{ count: number }>,
    private resolver: ViewContainerRef,
    private injector: Injector
  ) {
    this.count$ = store.select('count');
  }

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
}
