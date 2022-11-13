import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedPosts = [];
  @ViewChild('postForm', { static: false }) postData: NgForm;

  onCreatePost(postData: { title: string, content: string }) {
    console.log(postData);
    this.postData.reset();

    //Send Http Request
  }

  onFetchPosts() {
    //Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
