export interface AuthResponse {
  localId:      string;
  email:        string;
  idToken:      string;
  registered:   boolean;
  expiresIn:    string;
  refreshToken: string;
}
