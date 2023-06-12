import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //get user from local storage
    const user = JSON.parse(localStorage.getItem('user') as string);

    if (user) return true;

    // redirect to auth page
    this.router.navigate(['auth'], { queryParams: { next: state.url } });
    return false;
  }
}
