import { useState } from "react";
import { forwardRef } from "react";
import Eye from "../assets/icons/eye.svg?react";
import EyeOff from "../assets/icons/eye-off.svg?react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : "text";

    return (
      <div className="flex flex-col">
        <div className="w-full relative">
          <input
            type={inputType}
            className="h-13 w-full bg-transparent border border-black-10 rounded-xl px-4.5 py-4 outline-none transition-all duration-300 ease-in-out focus:border-black-50 text-black text-[16px] placeholder:text-black placeholder:text-[16px]"
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
        <p className="text-[13px] text-red mt-2 ml-1">{error}</p>
      </div>
    );
  },
);

Input.displayName = "Input";
