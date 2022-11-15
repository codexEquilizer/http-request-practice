import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostsService {

    constructor(private http: HttpClient,) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        console.log(postData);

        //Send Http Request
        return this.http.post<{ name: string }>('https://ng-complete-guide-5eca2-default-rtdb.firebaseio.com/posts.json', postData);
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-5eca2-default-rtdb.firebaseio.com/posts.json')
            .pipe(
                map(responseData => {
                    console.log('ResponseData from Pipe method: ', responseData);

                    //To convert the object of key into an array
                    const postArray: Post[] = [];
                    for (const key in responseData) {
                        // responseData=> {"-NGmuC2z71gYVLryRW5J": {"content": "This is a good book to read.","title": "Kafka on the Shore"}, {...} }
                        if (responseData.hasOwnProperty(key))
                            postArray.push({ ...responseData[key], tokenId: key })
                    }
                    return postArray;
                })
            )
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-5eca2-default-rtdb.firebaseio.com/posts.json');
    }
}