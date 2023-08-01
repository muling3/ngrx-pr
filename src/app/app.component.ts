import { Component } from '@angular/core';
import { TestComponent } from './test/test.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // standalone: true,
  // imports: [CounterComponent, TestComponent, RouterOutlet, RouterLink]
})
export class AppComponent {
  title = 'ngrx-app';

  ngOnInit(): void {
    localStorage.setItem("allowedRoles", JSON.stringify({"roles": ['two', 'five', 'four']}))
  }
}
