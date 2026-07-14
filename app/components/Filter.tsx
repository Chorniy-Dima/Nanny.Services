import Chevron from "../assets/icons/chevron-down.svg?react";
import { useState } from "react";

const options = [
  "A to Z",
  "Z to A",
  "Less than 10$",
  "Greater than 10$",
  "Popular",
  "Not popular",
  "Show all",
];

export const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("A to Z");

  const handleOpen = () => setIsOpen(!isOpen);
  const handleSelect = (option: string) => {
    setSelectedOption(option);
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
          {selectedOption ? selectedOption : options[0]}
          <Chevron
            className={`transform transition-all duration-150 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {isOpen && (
          <ul className="w-56.5 h-61 bg-white py-3.5 px-4.5 flex flex-col gap-3 rounded-[14px] absolute z-20 shadow-[0_20px_69px_0_rgba(0,0,0,0.07)]">
            {options.map((item) => {
              return (
                <li
                  key={item}
                  className={`text-lg leading-5 hover:text-black transition-all duration-150 ease-in-out cursor-pointer ${selectedOption === item ? "text-black" : "text-black-30"}`}
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
