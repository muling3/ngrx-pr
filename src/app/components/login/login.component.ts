import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // defining next url
  nextUrl: string | undefined;

  //constructor
  constructor(
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((d) => {
      console.log('next url', d['next']);

      this.nextUrl = d['next'];
    });
  }

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

        // if nexturl isn't undefined
        if (this.nextUrl) {
          //redirect user to the next url
          this.route.navigateByUrl(this.nextUrl);
          return; // to exit
        }

        //redirect to home page
        this.route.navigate(['']);
      },
      error: (err) => {
        this.toastr.error('User does not exist', 'Invalid credentials', {
          timeOut: 1000,
        });
        console.error('error', err);
      },
    });
  }
}
