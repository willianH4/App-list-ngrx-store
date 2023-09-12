import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { signUpStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup = this.fb.group({
    email: [ '', [Validators.required, Validators.email] ],
    password: [ '', [Validators.required] ]
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  invalidInput( campo: string ) {
    return this.signUpForm.get(campo)?.invalid && this.signUpForm.get(campo)?.touched;
  }

  get emailErrorMsg(): string {
    const errors = this.signUpForm.get('email')?.errors;
    if ( errors?.['required'] ) {
      return 'The email is required';
    } else if ( errors?.['email'] ) {
      return 'The email is invalid';
    }
    return '';
  }

  get passwordErrorMsg(): string {
    const errors = this.signUpForm.get('password')?.errors;
    if ( errors?.['required'] ) {
      return 'The password is required';
    }
    return '';
  }

  onSignUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signUpForm.value;
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(signUpStart({ email, password }));
  }

}
