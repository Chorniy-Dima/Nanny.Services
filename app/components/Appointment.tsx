import avatar from "../assets/img/sample-img.jpg";
import { Input } from "./Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { appointmentSchema } from "~/validation/appointmentSchema";
import type { IAppointmentForm } from "~/validation/appointmentSchema";
import Modal from "./Modal";

type AppointmentProps = {
  onClose: () => void;
};

export const Appointment = ({ onClose }: AppointmentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentSchema),
  });

  const onSubmit: SubmitHandler<IAppointmentForm> = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-[36px] font-medium leading-tight">
        Make an appointment with a babysitter
      </h2>

      <p className="text-black-50 text-sm mt-2.5">
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>

      <div className="flex flex-row gap-3.5 mt-3.5">
        <img
          src={avatar}
          alt="avatar"
          className="bg-pale-red w-10 h-10 rounded-xl"
        />
        <div className="flex flex-col gap-px">
          <span className="text-sm text-black-50">Your nanny</span>
          <h3 className="font-medium">Anna Shevchenko</h3>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 grid-rows-7 gap-x-1 gap-y-1 mt-3"
      >
        <Input
          type="text"
          {...register("address")}
          placeholder="Address"
          error={errors.address?.message}
          height={12}
        />
        <Input
          type="text"
          {...register("number")}
          placeholder="+380"
          error={errors.number?.message}
          height={12}
        />
        <Input
          type="text"
          {...register("age")}
          placeholder="Child's age"
          error={errors.age?.message}
          height={12}
        />

        <div className="flex flex-col">
          <div className="w-full relative">
            <input
              type="text"
              {...register("time")}
              placeholder="00:00"
              className="h-12 w-full bg-transparent border border-black-10 rounded-xl px-4.5 py-4 outline-none transition-all duration-300 ease-in-out focus:border-black-50 text-black text-[16px] placeholder:text-black placeholder:text-[16px]"
            />
          </div>
          <p className="text-[13px] text-red mt-2 ml-1">
            {errors.time?.message}
          </p>
        </div>

        <Input
          type="text"
          {...register("email")}
          placeholder="Email"
          error={errors.email?.message}
          styles="col-span-2"
          height={12}
        />
        <Input
          type="text"
          {...register("name")}
          placeholder="Father's or mother's name"
          error={errors.name?.message}
          styles="col-span-2 row-start-4"
          height={12}
        />
        <textarea
          name="comment"
          placeholder="Comment"
          className="h-26 w-full bg-transparent border border-black-10 rounded-xl px-4.5 py-4 outline-none transition-all duration-300 ease-in-out focus:border-black-50 text-black text-[16px] placeholder:text-black placeholder:text-[16px] resize-none col-span-2 row-span-2"
        ></textarea>
        <button
          type="submit"
          className="w-full h-12 justify-self-end bg-red text-white rounded-full flex justify-center items-center cursor-pointer col-span-2"
        >
          Send
        </button>
      </form>
    </Modal>
  );
};
