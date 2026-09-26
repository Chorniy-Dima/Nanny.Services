import type { Route } from "./+types/nannies";
import { NannyCard } from "~/components/NannyCard";
import { Filter } from "~/components/Filter";
import { db } from "~/lib/firebase";
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import type { Nanny } from "~/types/Nanny";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nannies page" },
    { name: "nannies", constent: "Welcome to nannies page" },
  ];
}

export async function clientLoader(): Promise<Nanny[]> {
  const nanniesRef = collection(db, "nannies");

  const firsPageQuery = query(nanniesRef, orderBy("name"), limit(3));
  try {
    const snapshot = await getDocs(firsPageQuery);
    const nannies = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Nanny, "id">),
    }));

    return nannies;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Nannies({ loaderData }: Route.ComponentProps) {
  return (
    <div className="py-16 px-32 bg-white-bg mx-auto">
      <Filter />
      <ul className="w-full h-max flex flex-col gap-8">
        {loaderData.map((nanny) => (
          <li key={nanny.id}>
            <NannyCard nanny={nanny} />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="w-39.75 h-12 mt-16 bg-red text-white rounded-full flex justify-self-center justify-center items-center cursor-pointer"
      >
        Load More
      </button>
    </div>
  );
}
