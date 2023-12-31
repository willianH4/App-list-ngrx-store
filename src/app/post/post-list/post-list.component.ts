import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/data/models/post.model';
import { AppState } from '../../store/app.state';
import { getPosts } from '../state/post.selector';
import { deletePost, loadPost } from '../state/post.action';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts?: Observable<Post[]>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPost());
  }

  onDeletePost(id?: number) {
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(deletePost({ id }));
    }
  }

}
