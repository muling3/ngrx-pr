import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs: Post[] = [];
  users: User[] = [];

  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    //getting all blogs
    this.loadAllBlogs();

    //get all users
    this.loadAllUsers();
  }

  loadAllBlogs(): void {
    this.blogService.getAllBlogs().subscribe({
      next: (data) => {
        this.blogs = data;

        //shuffle blogs
        this.blogsShuffler(this.blogs);
      },
      error: (err) => {
        console.log('error occurred ' + err);
      },
    });
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
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

    return array;
  }
}
