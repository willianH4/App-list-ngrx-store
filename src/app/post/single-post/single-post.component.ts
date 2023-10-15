import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/data/models/post.model';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/post.selector';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit ,OnDestroy {

  post!: Post;
  postSubcription?: Subscription;

  constructor(
    private store: Store<AppState>
  ) {
   }

  ngOnInit(): void {
    this.postSubcription = this.store.select(getPostById).subscribe((post) => {
      if ( post ) {
        this.post = post;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.postSubcription) this.postSubcription.unsubscribe();
}

}
