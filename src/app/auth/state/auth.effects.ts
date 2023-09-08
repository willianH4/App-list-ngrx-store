import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { exhaustMap, map } from "rxjs";
import { AuthService } from "../../data/services/auth/auth.service";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private auths: AuthService
    ) {
  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.auths.login(action.email, action.password).pipe(
          map((data) => {
            const user = this.auths.formatUser(data);
            return loginSuccess({ user });
          })
        );
      })
    );
  });

}
