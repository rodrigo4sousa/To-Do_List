import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { auth, googleProvider } from '../../../shared/firebase/firebase';

export const authService = {
  loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  },

  logout() {
    return signOut(auth);
  },
};
