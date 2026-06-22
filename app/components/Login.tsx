import Modal from "./Modal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema } from "~/validation/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";

type LoginProps = {
  onClose: () => void;
};
type ILoginForm = {
  email: string;
  password: string;
};

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

  return (
    <Modal onClose={onClose}>
      <div>
        <h6 className="font-medium text-[40px] tracking-tight mb-5">Log In</h6>
        <p className="text-black-50 font-normal text-base mb-10">
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4.5"
        >
          <Input
            type="text"
            {...register("email")}
            placeholder="Email"
            error={errors.email?.message}
          />
          <Input
            type="password"
            {...register("password")}
            placeholder="Password"
            error={errors.password?.message}
          />
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
