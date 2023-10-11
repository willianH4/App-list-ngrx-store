import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "src/app/data/services/post/post.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPost, loadPostSuccess, updatePost, updatePostSuccess } from "./post.action";
import { map, mergeMap, switchMap } from "rxjs";

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

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postS.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({ post: action.post })
          })
        )
      })
    )
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postS.deletePost(action.id.toString()).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id })
          })
        )
      })
    )
  });

}
