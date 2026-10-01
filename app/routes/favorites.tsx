import { Filter } from "~/components/Filter";
import { NannyCard } from "~/components/NannyCard";
import type { Route } from "./+types/favorites";
import { redirect, useNavigate } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "~/lib/firebase";
import { PAGE_SIZE } from "~/constants";
import { doc, getDoc } from "firebase/firestore";
import type { Nanny } from "~/types/Nanny";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Favorites page" },
    { name: "favorites", content: "Welcome to favorites page" },
  ];
}

export async function clientLoader() {
  const user: User | null = await new Promise((resolve) => {
    if (!auth) return resolve(null);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      unsubscribe();
      resolve(currentUser);
    });
  });

  if (!user) {
    throw redirect("/?auth=login");
  }

  return null;
}

export default function Favorites() {
  const { user, loading: authLoading, favoriteIds } = useAuth();
  const navigate = useNavigate();

  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/?auth=login");
    }
  }, [user, authLoading, navigate]);

  const favoriteIdsKey = favoriteIds.join(",");

  useEffect(() => {
    if (favoriteIds.length === 0) {
      setNannies([]);
      setPage(1);
      return;
    }

    const fetchInitialNannies = async () => {
      setLoading(true);
      try {
        const firstBatchIds = favoriteIds.slice(0, PAGE_SIZE);

        const promises = firstBatchIds.map(async (id) => {
          const nannyRef = doc(db, "nannies", id);
          const snap = await getDoc(nannyRef);
          if (snap.exists()) {
            return { id: snap.id, ...(snap.data() as Omit<Nanny, "id">) };
          }
          return null;
        });

        const results = await Promise.all(promises);
        const validNannies = results.filter((n): n is Nanny => n !== null);

        setNannies(validNannies);
        setPage(1);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialNannies();
  }, [favoriteIdsKey]);

  if (authLoading || !user) {
    return null;
  }

  const handleLoadMore = async () => {
    const startIndex = page * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const nextBatchIds = favoriteIds.slice(startIndex, endIndex);

    if (nextBatchIds.length === 0) return;

    setLoading(true);
    try {
      const promises = nextBatchIds.map(async (id) => {
        const nannyRef = doc(db, "nannies", id);
        const snap = await getDoc(nannyRef);
        if (snap.exists()) {
          return { id: snap.id, ...(snap.data() as Omit<Nanny, "id">) };
        }
        return null;
      });

      const results = await Promise.all(promises);
      const newNannies = results.filter((n): n is Nanny => n !== null);

      setNannies((prev) => [...prev, ...newNannies]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasMore = nannies.length < favoriteIds.length;

  return (
    <div className="py-16 px-32 bg-white-bg mx-auto min-h-171.75">
      {/* <Filter /> */}
      <div className="w-full h-max flex flex-col gap-8">
        {nannies.length === 0 && !loading ? (
          <p className="flex self-center">There are no favorite nannies yet</p>
        ) : (
          <ul className="w-full h-max flex flex-col gap-8">
            {nannies.map((nanny) => (
              <li key={nanny.id}>
                <NannyCard nanny={nanny} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {hasMore && (
        <button
          type="button"
          disabled={loading}
          className="w-39.75 h-12 mt-16 bg-red text-white rounded-full flex justify-self-center justify-center items-center cursor-pointer disabled:opacity-50"
          onClick={handleLoadMore}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
