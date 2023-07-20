import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
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
  error: boolean = false;
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
          let returned = this.loadBlog(p['id']);
          console.log('returned', returned);
        },
        error: (err: Error) => {
          //set loading to false
          this.loading = false;

          //update error state
          this.error = true;

          // set error
          this.errorMsg = 'Error occurred' + err.message;

          console.log('Error occurred ' + err);
        },
      });
    }, 500);
  }

  async loadBlog(blogId: number) {
    let msg: Error | null = null;
    let array = [213, 214, 216, 217];
    for (let blogId of array) {
      let hasError = false;

      // this.blogService
      //   .getBlog(blogId)
      //   .pipe(
      //     catchError((error) => {
      //       // Handle the error here
      //       console.error('Error occurred:', error);

      //       // Use 'return' here to stop further processing in the observable chain
      //       return of(null); // Replace 'null' with a default value or empty response if needed
      //     })
      //   )
      //   .subscribe({
      //     next: (blog) => {
      //       if(blog)
      //       this.blog = blog;
      //     },
      //     error: (err) => {
      //       hasError = true;
      //       console.log('error handling');
      //       //set loading to false
      //       this.loading = false;

      //       // set error
      //       this.errorMsg = 'Error occurred' + err.message;

      //       //catcherror
      //       // catchError((err) => {
      //       msg = err;
      //       // });

      //       console.log(err);
      //     },
      //     complete: () => {
      //       console.log('error msg', this.errorMsg);
      //     },
      //   });

      try {
        const response = await this.blogService.getBlog(212).toPromise();

        console.log('response', response);
      } catch (error) {
        hasError = true;
      }

      if (hasError) break;
    }
  }
}
