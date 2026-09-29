import type { Route } from "./+types/nannies";
import { NannyCard } from "~/components/NannyCard";
import { Filter } from "~/components/Filter";
import { db } from "~/lib/firebase";
import {
  getDocs,
  collection,
  query,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import type { Nanny } from "~/types/Nanny";
import { useEffect, useState } from "react";
import { FILTER_OPTIONS } from "~/constants";
import { useSearchParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nannies page" },
    { name: "nannies", constent: "Welcome to nannies page" },
  ];
}

const PAGE_SIZE = 3;

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const filterId = url.searchParams.get("filter") || "a-z";
  const activeOption =
    FILTER_OPTIONS.find((opt) => opt.id === filterId) || FILTER_OPTIONS[0];

  const nanniesRef = collection(db, "nannies");
  const q = query(
    nanniesRef,
    limit(PAGE_SIZE + 1),
    ...activeOption?.getConstraints(),
  );

  try {
    const snapshot = await getDocs(q);

    const hasMore = snapshot.docs.length > PAGE_SIZE;
    const docsToRender = hasMore
      ? snapshot.docs.slice(0, PAGE_SIZE)
      : snapshot.docs;

    const nannies = docsToRender.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Nanny, "id">),
    }));
    const lastDoc = docsToRender[docsToRender.length - 1];

    return { nannies, hasMore, lastDoc };
  } catch (error) {
    console.log(error);
    return { nannies: [], hasMore: false, lastDoc: null };
  }
}

export default function Nannies({ loaderData }: Route.ComponentProps) {
  const [nannies, setNannies] = useState<Nanny[]>(loaderData.nannies);
  const [hasMore, setHasMore] = useState<boolean>(loaderData.hasMore);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(loaderData.lastDoc);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const filterId = searchParams.get("filter");
  const activeOption =
    FILTER_OPTIONS.find((opt) => opt.id === filterId) || FILTER_OPTIONS[0];

  useEffect(() => {
    setNannies(loaderData.nannies);
    setHasMore(loaderData.hasMore);
    setLastDoc(loaderData.lastDoc);
  }, [loaderData]);

  const handleLoadMore = async () => {
    if (!lastDoc) return;

    setLoading(true);

    try {
      const nanniesRef = collection(db, "nannies");
      const nextQuery = query(
        nanniesRef,
        ...activeOption.getConstraints(),
        startAfter(lastDoc),
        limit(PAGE_SIZE + 1),
      );

      const snapshot = await getDocs(nextQuery);

      const hasNextPage = snapshot.docs.length > PAGE_SIZE;
      const docsToRender = hasNextPage
        ? snapshot.docs.slice(0, PAGE_SIZE)
        : snapshot.docs;

      const newNannies = docsToRender.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Nanny, "id">),
      }));
      const newLastDoc = docsToRender[docsToRender.length - 1];

      setNannies((prev) => [...prev, ...newNannies]);
      setLastDoc(newLastDoc);
      setHasMore(hasNextPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-32 bg-white-bg mx-auto min-h-171.75">
      <Filter />
      <ul className="w-full h-max flex flex-col gap-8">
        {nannies.map((nanny) => (
          <li key={nanny.id}>
            <NannyCard nanny={nanny} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={handleLoadMore}
          className="w-39.75 h-12 mt-16 bg-red text-white rounded-full flex justify-self-center justify-center items-center cursor-pointer"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
