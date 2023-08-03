import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ListTest } from './ListOps';

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

  @ViewChild('blogsList') blogsList!: ElementRef;
  observer!: IntersectionObserver;

  constructor(
    private blogService: BlogService,
    private userService: UserService,
    private renderer: Renderer2
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
    const list1 = ListTest.create(1, 2);
    const list2 = ListTest.create(3);
    const list3 = ListTest.create();
    const list4 = ListTest.create(4, 5, 6);
    const listOfLists = ListTest.create(list2, list3, list4);

    // listTwo.forEach((item) => console.log('num ', item));

    // let updatedList: number[] = listTwo.concat(listOne, listThree);

    // console.log("updatedList ", updatedList)

    // console.log('reversed ', updatedList.reverse());

    // console.log('append ', listTwo.append(listThree));
    // console.log(
    //   'filter ',
    //   updatedList.filter((item) => item % 2 == 0)
    // );
    // console.log(
    //   'map ',
    //   updatedList.map((item) => item * 2)
    // );

    const blogsRef = document.getElementById('blogsList');
    console.log('native element ', document.getElementById('blogsList'));

    this.loading = true;
    setTimeout(() => {
      //get all users
      this.loadAllUsers();

      //getting all blogs
      this.loadAllBlogs();
    }, 600);
  }

  ngAfterViewInit(): void {

    let options: IntersectionObserverInit = {
      root: null,
      // rootMargin: '0px',
      threshold: [0.25, 0.5, 0.75, 1],
    };
    // registering intersection observer
    this.observer = new IntersectionObserver((entries) => {
      // if(entries.is)
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log('entries, entries ', entry);
        }
        if(entry.intersectionRatio > 0.25){
          this.renderer.setStyle(this.blogsList.nativeElement, "background-color", "yellow");
        }
        if (entry.intersectionRatio > 0.5) {
          this.renderer.setStyle(
            this.blogsList.nativeElement,
            'background-color',
            'orange'
          );
        }
        if (entry.intersectionRatio > 0.75) {
          this.renderer.setStyle(
            this.blogsList.nativeElement,
            'background-color',
            'blue'
          );
        }
        if (entry.intersectionRatio >= 1) {
          this.renderer.setStyle(
            this.blogsList.nativeElement,
            'background-color',
            'green'
          );
        }
      });
    }, options);

    this.observer.observe(this.blogsList.nativeElement);
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

  myObserverTest(): void {}
}
