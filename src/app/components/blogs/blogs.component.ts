import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs: Post[] = [];
  users: User[] = [];

  loading: boolean = false;
  errorMsg: string | undefined;

  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) {}

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      //get all users
      this.loadAllUsers();

      //getting all blogs
      this.loadAllBlogs();
    }, 600);
  }
  
  isIntersecting(status: boolean, index: number) {
    console.log('Element #' + index + ' is intersecting ' + status);
  }

  loadAllBlogs(): void {
    this.blogService.getAllBlogs().subscribe({
      next: (data) => {
        //set loading to false
        this.loading = false;

        this.blogs = data;

        //shuffle blogs
        this.blogsShuffler(this.blogs);
      },
      error: (err: Error) => {
        //set loading to false
        this.loading = false;

        // set error
        this.errorMsg = 'Error occurred' + err.message;

        console.log('error occurred ' + err);
      },
    });
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.blogs, event.previousIndex, event.currentIndex);
  // }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('users', data);
      },
      error: (err) => {
        console.log('error occurred ' + err);
      },
    });
  }

  getBlogOwner(userId: number): string {
    return this.users.find((u) => u.id == userId)!.name!;
  }

  blogsShuffler(array: Post[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    console.log('users', array);
    return array;
  }
}
