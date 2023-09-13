import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../interfaces/AuthResponseData.interface';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  timeOutInterval: any;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
    {email, password, returnSecureToken: true});
  }

  signUp(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
    {email, password, returnSecureToken: true});
  }

  formatUser(data: AuthResponse) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeOutInterval(user);
  }

  runTimeOutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeOutInterval = setTimeout(() => {

    }, timeInterval);
  }

  getUsarFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if ( userDataString ) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(userData.email, userData.token, userData.localId, expirationDate);
      this.runTimeOutInterval(user);
      return user;
    }
    return null;
  }

  getErrorMessage( message: string ) {
    switch(message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found';
      case 'INVALID_PASSWORD':
        return 'Invalid password';
      case 'EMAIL_EXISTS':
        return 'The email address is already in use by another account.'
      case 'OPERATION_NOT_ALLOWED':
        return 'Password login is disabled for this project.'
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'We have blocked all requests for this device due to unusual activity. Try it again later.'
        default:
        return 'Unknown error occurred'
    }
  }

}
