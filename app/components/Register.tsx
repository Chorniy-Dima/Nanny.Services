import Modal from "./Modal";
import { registerSchema } from "~/validation/registerSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";
import { auth } from "~/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

type RegisterProps = {
  onClose: () => void;
  setLogged: () => void;
};
type IRegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function Register({ onClose, setLogged }: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log(result);
      onClose();
      setLogged();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <h6 className="text-[40px] font-medium tracking-tight mb-5">
          Registration
        </h6>
        <p className="text-black-50 font-normal text-base mb-10">
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
        <form
          className="w-full flex flex-col gap-4.5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            {...register("name")}
            placeholder="Name"
            error={errors.name?.message}
          />
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
            Sign Up
          </button>
        </form>
      </div>
    </Modal>
  );
}
