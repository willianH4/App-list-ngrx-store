import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/data/store-global/app.state';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formAuth: FormGroup = this.fb.group({
    email: [null, [ Validators.required, Validators.email ]],
    password: [null, [ Validators.required ]]
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  invalidInput( campo: string ) {
    return this.formAuth.get(campo)?.invalid && this.formAuth.get(campo)?.touched;
  }

  get emailErrorMsg(): string {
    const errors = this.formAuth.get('email')?.errors;
    if ( errors?.['required'] ) {
      return 'The email is required';
    } else if ( errors?.['email'] ) {
      return 'The email is invalid';
    }
    return '';
  }

  get passwordErrorMsg(): string {
    const errors = this.formAuth.get('password')?.errors;
    if ( errors?.['required'] ) {
      return 'The password is required';
    }
    return '';
  }

  onLogin() {
    if (!this.formAuth.valid) {
      this.formAuth.markAllAsTouched();
      return;
    }
    const { email, password } = this.formAuth.value;
    this.store.dispatch(loginStart({email, password}));
  }

}
