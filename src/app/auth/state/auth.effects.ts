import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { autoLogin, loginStart, loginSuccess, signUpStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "../../data/services/auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setErrroMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private auths: AuthService,
    private store: Store<AppState>,
    private router: Router
    ) {
  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.auths.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrroMessage({ message: '' }));
            const user = this.auths.formatUser(data);
            this.auths.setUserInLocalStorage(user);
            return loginSuccess({ user });
          }),
          catchError(({ error }) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.auths.getErrorMessage(error.error.message);
            return of(setErrroMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
        ofType( ...[loginSuccess, signupSuccess] ),
        tap((action) => {
          this.store.dispatch(setErrroMessage({ message: '' }));
          this.router.navigate(['/']);
        })
      );
    },
    {
      dispatch: false
    }
  );

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signUpStart),
      exhaustMap((action) => {
        return this.auths.signUp(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.auths.formatUser(data);
            return signupSuccess({ user });
          }),
          catchError(({ error }) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.auths.getErrorMessage(error.error.message);
            return of(setErrroMessage({ message: errorMessage }));
          }),
        );
      }),
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      map((action) => {
        const user = this.auths.getUsarFromLocalStorage();
        console.log('local', user);
      })
    )
  }, {
    dispatch: false
  });

}
