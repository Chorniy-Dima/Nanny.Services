import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "~/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  favoriteIds: string[];
  toggleFavorite: (nannyId: string) => Promise<void>;
  isFavorite: (nannyId: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (!user) {
      setFavoriteIds([]);
      return;
    }

    const userRef = doc(db, "users", user.uid);

    const unsubscribeFirestore = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setFavoriteIds(docSnap.data().favorites || []);
        } else {
          setFavoriteIds([]);
        }
      },
      (error) => {
        console.log(error);
      },
    );

    return unsubscribeFirestore;
  }, [user?.uid]);

  const toggleFavorite = async (nannyId: string) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const exists = favoriteIds.includes(nannyId);

    try {
      if (exists) {
        await setDoc(
          userRef,
          { favorites: arrayRemove(nannyId) },
          { merge: true },
        );
      } else {
        await setDoc(
          userRef,
          { favorites: arrayUnion(nannyId) },
          { merge: true },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isFavorite = (nannyId: string) => favoriteIds.includes(nannyId);

  return (
    <AuthContext.Provider
      value={{ user, loading, favoriteIds, toggleFavorite, isFavorite }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
