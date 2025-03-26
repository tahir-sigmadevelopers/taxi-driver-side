import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  initializeAuth,
  getReactNativePersistence,
  sendEmailVerification,
  applyActionCode,
  ActionCodeInfo
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

// Store verification codes temporarily
const verificationCodes = new Map();

// Generate a random 4-digit code
const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send verification code via email
export const sendVerificationCode = async (email) => {
  try {
    // Generate a 4-digit code
    const code = generateVerificationCode();
    
    // Store the code with timestamp (valid for 10 minutes)
    verificationCodes.set(email, {
      code,
      timestamp: Date.now(),
      attempts: 0
    });

    // TODO: Replace this with your actual email sending service
    // For now, we'll just log the code
    console.log(`Verification code for ${email}: ${code}`);
    
    // In a real app, you would use an email service like SendGrid, AWS SES, etc.
    // await sendEmail({
    //   to: email,
    //   subject: 'Your Verification Code',
    //   text: `Your verification code is: ${code}. This code will expire in 10 minutes.`
    // });

    return { error: null };
  } catch (error) {
    console.log('Send verification code error:', error);
    return { error: 'Failed to send verification code' };
  }
};

// Verify the code
export const verifyCode = async (email, code) => {
  try {
    const storedData = verificationCodes.get(email);
    
    if (!storedData) {
      return { error: 'No verification code found' };
    }

    // Check if code has expired (10 minutes)
    if (Date.now() - storedData.timestamp > 10 * 60 * 1000) {
      verificationCodes.delete(email);
      return { error: 'Verification code has expired' };
    }

    // Check if too many attempts
    if (storedData.attempts >= 3) {
      verificationCodes.delete(email);
      return { error: 'Too many failed attempts. Please request a new code.' };
    }

    // Increment attempts
    storedData.attempts++;

    // Verify the code
    if (storedData.code !== code) {
      return { error: 'Invalid verification code' };
    }

    // Clear the code after successful verification
    verificationCodes.delete(email);
    return { error: null };
  } catch (error) {
    console.log('Verify code error:', error);
    return { error: 'Failed to verify code' };
  }
};

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

// Email verification functions
export const sendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user);
    return { error: null };
  } catch (error) {
    let errorMessage = 'An error occurred while sending verification email';
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
    console.log('Verification email error:', error.code, error.message);
    return { error: errorMessage };
  }
};

export const verifyEmailCode = async (code) => {
  try {
    await applyActionCode(auth, code);
    return { error: null };
  } catch (error) {
    let errorMessage = 'An error occurred while verifying email';
    switch (error.code) {
      case 'auth/invalid-action-code':
        errorMessage = 'Invalid or expired verification code';
        break;
      case 'auth/expired-action-code':
        errorMessage = 'Verification code has expired';
        break;
      default:
        errorMessage = error.message;
    }
    console.log('Email verification error:', error.code, error.message);
    return { error: errorMessage };
  }
}; 