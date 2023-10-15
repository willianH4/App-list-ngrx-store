import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`https://examplengrxangular-default-rtdb.firebaseio.com/posts.json`).pipe(
      map((data:any) => {
        const posts: Post[] = [];
        for (const key in data) {
          posts.push({...data[key], id: key})
        }
        console.log(posts);
        return posts;
      })
    )
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{name: string}>(`https://examplengrxangular-default-rtdb.firebaseio.com/posts.json`, post)
  }

  updatePost(post: Post) {
    const postData = {
      [post.id!.toString()]: { title: post.title, description: post.description },
    };
    return this.http.patch(`https://examplengrxangular-default-rtdb.firebaseio.com/posts.json`, postData)
  }

  deletePost(id: string) {
    return this.http.delete(`https://examplengrxangular-default-rtdb.firebaseio.com/posts/${ id }.json`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`https://examplengrxangular-default-rtdb.firebaseio.com/posts/${ id }.json`);
  }

}
