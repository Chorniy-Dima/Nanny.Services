import type { Route } from "./+types/nannies";
import { NannyCard } from "~/components/NannyCard";
import Chevron from "../assets/icons/chevron-down.svg?react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nannies page" },
    { name: "nannies", constent: "Welcome to nannies page" },
  ];
}

export default function Nannies() {
  return (
    <div className="py-16 px-32 bg-white-bg mx-auto">
      <div className="mb-8">
        <p className="mb-2 text-[14px]  text-black-50">Filter</p>
        <div className="w-57 h-12 bg-red rounded-[14px] flex items-center justify-between px-4.5 py-3.5 text-white">
          A to Z
          <Chevron />
        </div>
      </div>
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
