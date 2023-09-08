import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { exhaustMap, map } from "rxjs";
import { AuthService } from "../../data/services/auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setLoadingSpinner } from "src/app/store/shared/shared.actions";

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
            const user = this.auths.formatUser(data);
            return loginSuccess({ user });
          })
        );
      })
    );
  });

}
