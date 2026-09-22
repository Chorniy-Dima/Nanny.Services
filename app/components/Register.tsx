import Modal from "./Modal";
import { registerSchema } from "~/validation/registerSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "./Input";
import { auth } from "~/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { handleAuthError } from "~/utils/handleAuthError";
import { useAuth } from "~/context/AuthContext";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

type RegisterProps = {
  onClose: () => void;
};
type IRegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function Register({ onClose }: RegisterProps) {
  const { user, loading } = useAuth();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (user && !loading) {
      setSearchParams((prev) => {
        prev.delete("auth");
        return prev;
      });
    }
  }, [user, loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user, { displayName: data.name });
    } catch (error) {
      handleAuthError(error);
    }
  };

  if (user) {
    return null;
  }

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
