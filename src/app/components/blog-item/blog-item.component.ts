import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';

import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css'],
})
export class BlogItemComponent {
  //initialising blog
  blog: Post | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    //subscribing to activated route
    this.activatedRoute.params.subscribe({
      next: (p) => {
        //get the blog
        this.loadBlog(p['id'])
      },
      error: (err) => {
        console.log('Error occurred ' + err);
      },
    });
  }

  loadBlog(blogId: number): void {
    this.blogService.getBlog(blogId).subscribe({
      next: (blog) => {
        this.blog = blog;
      },
      error: (err) => console.log('error occurred ' + err),
    });
  }
}
