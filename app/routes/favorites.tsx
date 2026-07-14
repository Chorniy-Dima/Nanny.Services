import { Filter } from "~/components/Filter";
import { NannyCard } from "~/components/NannyCard";
import type { Route } from "./+types/favorites";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Favorites page" },
    { name: "favorites", constent: "Welcome to favorites page" },
  ];
}

export default function Favorites() {
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
