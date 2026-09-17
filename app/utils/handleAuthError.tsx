import { getFirebaseErrorMessage } from "./getFirebaseErrorMessage";
import toast from "react-hot-toast";

export const handleAuthError = (error: unknown) => {
  const message = getFirebaseErrorMessage(error);
  return toast.error(message, {
    className: "h-15",
  });
};
