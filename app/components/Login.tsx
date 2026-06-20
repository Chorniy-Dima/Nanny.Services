import Modal from "./Modal";
import { useState } from "react";
import EyeOff from "../assets/icons/eye-off.svg?react";
import Eye from "../assets/icons/eye.svg?react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema } from "~/validation/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";

type LoginProps = {
  onClose: () => void;
};
type ILoginForm = {
  email: string;
  password: string;
};

const inpStyle =
  "h-13 w-full bg-transparent border border-black-10 rounded-xl px-4.5 py-4 outline-none transition-all duration-300 ease-in-out focus:border-black-50 text-black text-[16px] placeholder:text-black placeholder:text-[16px]";

export default function Login({ onClose }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    console.log(data);
    onClose();
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Modal onClose={onClose}>
      <div className="">
        <h6 className="font-medium text-[40px] tracking-tight mb-5">Log In</h6>
        <p className="text-black-50 font-normal text-base pb-10">
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4.5"
        >
          <div className="flex flex-col">
            <input
              placeholder="Email"
              className={inpStyle}
              {...register("email")}
            />
            <p className="text-[13px] text-red mt-2 ml-1">
              {errors.email?.message}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={inpStyle}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute top-4 right-4 cursor-pointer"
                onClick={toggleShowPassword}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <p className="text-[13px] text-red mt-2 ml-1">
              {errors.password?.message}
            </p>
          </div>

          <button
            type="submit"
            className="h-13 w-full mt-5.5 bg-red text-white font-medium rounded-full flex justify-center items-center"
          >
            Log In
          </button>
        </form>
      </div>
    </Modal>
  );
}
