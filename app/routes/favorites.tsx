import { Filter } from "~/components/Filter";
import { NannyCard } from "~/components/NannyCard";
import type { Route } from "./+types/favorites";
import { redirect, useNavigate } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/lib/firebase";

export async function clientLoader() {
  const user = await new Promise((resolve) => {
    if (!auth) return resolve(null);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      unsubscribe();
      resolve(currentUser);
    });
  });

  if (!user) {
    throw redirect("/?auth=login");
  }

  return { user };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Favorites page" },
    { name: "favorites", content: "Welcome to favorites page" },
  ];
}

export default function Favorites() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate("/?auth=login");
    }
  }, [user, loading]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="py-16 px-32 bg-white-bg mx-auto">
      <Filter />
      <div className="w-full h-max flex flex-col gap-8">
        <NannyCard />
        <NannyCard />
        <NannyCard />
      </div>
      <button
        type="button"
        className="w-39.75 h-12 mt-16 bg-red text-white rounded-full flex justify-self-center justify-center items-center"
      >
        Load More
      </button>
    </div>
  );
}
