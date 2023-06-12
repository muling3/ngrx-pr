import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  login(value: { username: string; email: string }): void {
    this.userService.login(value.username, value.email).subscribe({
      next: (d) => {
        console.log('data', d);

        //check d.length
        if (d.length < 1) {
          this.toastr.error('User does not exist', 'Invalid credentials', {
            timeOut: 1000,
          });
          throw new Error('User not found');
        }

        //strore the user in local storage
        localStorage.setItem('user', JSON.stringify(d[0]));

        //redirect to home page
        this.route.navigate(['']);
      },
      error: (err) => {
        this.toastr.error('everything is broken', 'Major Error', {
          timeOut: 3000,
        });
        console.error('error', err);
      },
    });
  }
}
