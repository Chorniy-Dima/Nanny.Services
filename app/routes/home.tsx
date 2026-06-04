import type { Route } from "./+types/home";
import { Link } from "react-router";
import Arrow from "../assets/icons/arrow.svg?react";
import Check from "../assets/icons/check.svg?react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nanny.services" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="p-8">
      <section className="max-w-344 h-184 mx-auto flex flex-row">
        <div className="h-auto w-169.25 bg-red rounded-l-[30px]">
          <div className="mt-63 ml-24 text-white">
            <h1 className="text-4xl font-medium tracking-tight">
              Make Life Easier for the Family:
            </h1>
            <h3 className="text-3xl font-normal mt-7 tracking-tight">
              Find Babysitters Online for All Occasions
            </h3>
            <Link
              to={"/nannies"}
              className="mt-16 bg-none h-15 w-57.5 border rounded-full flex justify-center items-center gap-4 group/item"
            >
              Get started{" "}
              <Arrow className=" group-hover/item:transform group-hover/item:rotate-53 transition-all duration-300 ease-in-out" />
            </Link>
          </div>
        </div>
        <div
          className="h-auto w-174.75 rounded-r-[30px] 
        bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(/app/assets/img/Baby-img-1x.jpg)] bg-cover bg-center relative"
        >
          <div className="absolute bottom-12.5 right-12.5 h-29.5 w-71 bg-white rounded-[20px] flex justify-center items-center row gap-4">
            <div className="bg-red w-13.5 h-13.5 rounded-[13px] flex justify-center items-center">
              <Check />
            </div>
            <div>
              <h6 className="text-base font-normal text-black-50">
                Experienced nannies
              </h6>
              <h6 className="text-2xl font-bold text-black">15,000</h6>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
