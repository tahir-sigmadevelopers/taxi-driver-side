import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmyZSDwqOcyKlxc79F5nhWKR4rYOPBSc4",
    authDomain: "react-native-with-db.firebaseapp.com",
    projectId: "react-native-with-db",
    storageBucket: "react-native-with-db.appspot.com",
    messagingSenderId: "712561930588",
    appId: "1:712561930588:web:71b93f12be4c928beb9199"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const storage = getStorage(app);

export { auth, storage };

// Authentication functions
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    let errorMessage = 'An error occurred during sign in';
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled';
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'Invalid email or password';
        break;
      default:
        errorMessage = error.message;
    }
    console.log('Login error:', error.code, error.message);
    return { user: null, error: errorMessage };
  }
};

export const registerWithEmailAndPassword = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update the user's profile with their name
    await updateProfile(userCredential.user, {
      displayName: name
    });
    return { user: userCredential.user, error: null };
  } catch (error) {
    let errorMessage = 'An error occurred during registration';
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Email already registered';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Email/password accounts are not enabled';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password is too weak';
        break;
      default:
        errorMessage = error.message;
    }
    console.log('Registration error:', error.code, error.message);
    return { user: null, error: errorMessage };
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error) {
    let errorMessage = 'An error occurred while sending reset email';
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No user found with this email';
        break;
      default:
        errorMessage = error.message;
    }
    console.log('Reset password error:', error.code, error.message);
    return { error: errorMessage };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    console.log('Logout error:', error.code, error.message);
    return { error: error.message };
  }
}; 