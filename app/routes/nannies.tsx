import type { Route } from "./+types/nannies";
import { NannyCard } from "~/components/NannyCard";
import { Filter } from "~/components/Filter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nannies page" },
    { name: "nannies", constent: "Welcome to nannies page" },
  ];
}

export default function Nannies() {
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
