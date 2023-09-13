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

}
