import Chevron from "../assets/icons/chevron-down.svg?react";
import { useState } from "react";
import { FILTER_OPTIONS, type FilterOption } from "~/constants";
import { useSearchParams } from "react-router";

export const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("filter") || "a-z";

  const activeOption = FILTER_OPTIONS.find((opt) => opt.id === currentFilter);

  const handleOpen = () => setIsOpen(!isOpen);
  const handleSelect = (option: FilterOption) => {
    setSearchParams((prev) => {
      if (option?.id === "a-z") {
        prev.delete("filter");
      } else {
        prev.set("filter", option.id);
      }
      return prev;
    });
    handleOpen();
  };

  return (
    <div className="mb-8">
      <p className="mb-2 text-[14px]  text-black-50">Filter</p>

      <div className="relative">
        <button
          className="w-57 h-12 bg-red rounded-[14px] flex items-center justify-between px-4.5 py-3.5 mb-2 text-white cursor-pointer group"
          onClick={handleOpen}
          type="button"
        >
          {activeOption?.label}
          <Chevron
            className={`transform transition-all duration-150 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {isOpen && (
          <ul className="w-56.5 h-61 bg-white py-3.5 px-4.5 flex flex-col gap-3 rounded-[14px] absolute z-20 shadow-[0_20px_69px_0_rgba(0,0,0,0.07)]">
            {FILTER_OPTIONS.map((option) => {
              return (
                <li
                  key={option.id}
                  className={`text-lg leading-5 hover:text-black transition-all duration-150 ease-in-out cursor-pointer ${activeOption?.label === option.label ? "text-black" : "text-black-30"}`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
