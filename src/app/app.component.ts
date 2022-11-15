import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from './post.model';
import { PostsService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  @ViewChild('postForm', { static: false }) postData: NgForm;

  constructor(private postsService: PostsService) { }


  ngOnInit(): void {
    this.isFetching = true;

    this.postsService.fetchPosts().subscribe(posts => {
      console.log(posts);
      this.isFetching = false;
      this.loadedPosts = posts;
    })
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content)
      .subscribe(responseBody => {
        console.log(responseBody);
        this.postData.reset();  // This will reset the form
        this.onFetchPosts();    //This will reflect on the template after creating a post
      })
  }

  onFetchPosts() {
    //Send Http request
    this.postsService.fetchPosts().subscribe(posts => {
      console.log(posts);
      this.isFetching = false;
      this.loadedPosts = posts;
    })
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      console.log('All Data deleted 😈');
      this.loadedPosts = [];
    });
  }

}
