import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "src/app/data/services/post/post.service";
import { addPost, addPostSuccess, loadPost, loadPostSuccess } from "./post.action";
import { map, mergeMap } from "rxjs";

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private postS: PostService
  ){}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPost),
      mergeMap((action) => {
        return this.postS.getPost().pipe(
          map((post) => {
            return loadPostSuccess({ post })
          })
        );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap(action => {
        return this.postS.addPost(action.post)
        .pipe(map(data => {
          const post = { ...action.post, id: data.name };
          return addPostSuccess({ post })
        }))
      })
    )
  });

}
