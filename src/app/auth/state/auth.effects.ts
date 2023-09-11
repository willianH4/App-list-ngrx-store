import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AuthService } from "../../data/services/auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setErrroMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private auths: AuthService,
    private store: Store<AppState>
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

}
