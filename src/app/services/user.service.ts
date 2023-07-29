import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + '/users');
  }

  login(username: string, email: string): Observable<User[]> {
    let params = {
      username,
      email,
    };

    return this.http.get<User[]>(this.API_URL + '/users', { params });
  }
}
