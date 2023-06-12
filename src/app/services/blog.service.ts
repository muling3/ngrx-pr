import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly API_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL + '/posts');
  }

  getBlog(blogId: number): Observable<Post> {
    return this.http.get<Post>(this.API_URL + '/posts/' + blogId);
  }
}
