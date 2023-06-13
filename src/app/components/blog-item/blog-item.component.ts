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
  errorMsg: string | undefined;
  error: boolean = false
  loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      //subscribing to activated route
      this.activatedRoute.params.subscribe({
        next: (p) => {
          //set loading to false
          this.loading = false;

          //get the blog
          this.loadBlog(p['id']);
        },
        error: (err: Error) => {
          //set loading to false
          this.loading = false;

          //update error state
          this.error = true
          
          // set error
          this.errorMsg = 'Error occurred' + err.message;
          console.log('Error occurred ' + err);
        },
      });
    }, 500);
  }

  loadBlog(blogId: number): void {
    this.blogService.getBlog(blogId).subscribe({
      next: (blog) => {
        this.blog = blog;
      },
      error: (err) => {
        //set loading to false
        this.loading = false;

        // set error
        this.errorMsg = 'Error occurred' + err.message;
        console.log(err);
      },
    });
  }
}
