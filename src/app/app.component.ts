import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  @ViewChild('postForm', { static: false }) postData: NgForm;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string, content: string }) {
    console.log(postData);
    this.postData.reset();

    //Send Http Request
    this.http.post<{ name: string }>('https://ng-complete-guide-5eca2-default-rtdb.firebaseio.com/posts.json', postData).subscribe(responseBody => {
      console.log(responseBody);
    })
  }

  onFetchPosts() {
    //Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-5eca2-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
          console.log('ResponseData from Pipe method: ', responseData);
          // To convert the objects of key into an array
          const postArray: Post[] = [];
          // responseData=> {"-NGmuC2z71gYVLryRW5J": {"content": "This is a good book to read.","title": "Kafka on the Shore"}, {...} }
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], tokenId: key })
            }
          }
          return postArray;
        }))
      .subscribe(posts => {
        console.log(posts);
        this.isFetching = false;
        this.loadedPosts = posts;
      })
  }
}
