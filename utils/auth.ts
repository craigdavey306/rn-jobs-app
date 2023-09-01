import axios from 'axios';
import { FIREBASE_AUTH_API_BASE_URL } from '../constants/variables';
import { firebaseWebApiKey } from '../secrets/keys';

type AuthenticationMode = 'signUp' | 'signInWithPassword';

async function authenticate(
  mode: AuthenticationMode,
  email: string,
  password: string,
) {
  const url = `${FIREBASE_AUTH_API_BASE_URL}${mode}?key=${firebaseWebApiKey}`;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;

  return token;
}

export function createUser(email: string, password: string) {
  return authenticate('signUp', email, password);
}

export function login(email: string, password: string) {
  return authenticate('signInWithPassword', email, password);
}

// export function refreshToken() {

// }

export function isValidEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function isValidPassword(password: string): boolean {
  const regex = /^[a-zA-Z0-9.$@!?_%]{8,}$/;
  return regex.test(password);
}
