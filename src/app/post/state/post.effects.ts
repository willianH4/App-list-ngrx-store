import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "src/app/data/services/post/post.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPost, loadPostSuccess, updatePost, updatePostSuccess } from "./post.action";
import { filter, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { getCurrentRoute, selectRouterId } from "src/app/store/router/router.selector";
import { Update } from "@ngrx/entity";
import { Post } from "src/app/data/models/post.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { getPosts } from "./post.selector";
import { dummyAction } from "src/app/auth/state/auth.actions";

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private postS: PostService,
    private store: Store<AppState>
  ){}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPost),
      withLatestFrom(this.store.select(getPosts)),
      mergeMap(([action, post]) => {
        if ( !post.length || post.length === 1 ) {
          return this.postS.getPost().pipe(
            map((post) => {
              return loadPostSuccess({ post })
            })
          );
        }
        return of(dummyAction());
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
            const updatedPost: Update<Post> = {
              id: action.post.id?.toString()!,
              changes: {
                ...action.post
              }
            }
            return updatePostSuccess({ post: updatedPost })
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

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/post/details');
      }),
      map((r: RouterNavigatedAction) => {
        const urlSegments = r.payload.routerState.url.split('/');
        const id = urlSegments.slice(-1);
        return id[0];
      }),
      withLatestFrom(this.store.select(getPosts)),
      switchMap(([id, posts]) => {
        if ( !posts.length ) {
          return this.postS.getPostById(id).pipe(map((post) => {
            const postData = [{ ...post, id }];
            return loadPostSuccess({ post: postData })
          }))
        }
        return of(dummyAction());
      })
    );
  });

}
