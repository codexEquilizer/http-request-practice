import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  @ViewChild('postForm', { static: false }) postData: NgForm;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string, content: string }) {
    console.log(postData);
    this.postData.reset();

    //Send Http Request
    this.http.post('https://ng-complete-guide-5eca2-default-rtdb.firebaseio.com/posts.json', postData).subscribe(responseBody => {
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
    this.http.get('https://ng-complete-guide-5eca2-default-rtdb.firebaseio.com/posts.json').subscribe(post => {
      console.log(post);
    })
  }
}
