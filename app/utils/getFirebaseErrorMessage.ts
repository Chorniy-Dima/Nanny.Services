import { FirebaseError } from "firebase/app";

export const getFirebaseErrorMessage = (error: unknown) => {
  if (import.meta.env.DEV) {
    console.log(error);
  }
  if (error instanceof FirebaseError) {
    switch (error.code) {
      // Login / Registration
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Invalid email or password";
      case "auth/email-already-in-use":
        return "This email is already in use";
      case "auth/too-many-requests":
        return "Too many login attempts. Please try again later";

      // Network
      case "auth/network-request-failed":
        return "Network problem. Please, check your internet connection";

      // Session error / logout
      case "auth/no-current-user":
        return "No user is currently signed in";
      case "auth/user-token-expired":
        return "Your session has expired. Please sign in again";

      default:
        return "Authentication error. Please try later";
    }
  }
  return "Unknown error";
};
