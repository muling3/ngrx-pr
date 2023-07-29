import { Component, SimpleChanges } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { FormsModule } from '@angular/forms';
import { TestDirective } from '../directive/test.directive';
import { RouterLink } from '@angular/router';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ChildComponent, FormsModule, TestDirective, RouterLink, DynamicTableComponent],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {

  childData: number = 12

  _searchText: string = '';
  search: string = ''

  get searchText(): string {
    return this._searchText
  }

  set searchText(val: string) {
    this._searchText = val
    console.log("searchText", this._searchText)
  }

  onChange(e: KeyboardEvent) {
    const search = document.getElementById("search") as HTMLInputElement
    console.log("key up", e.key)
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("changes invoked", changes)
  }

  btnClick() {
    console.log("clicked")
  }
}
