import * as yup from "yup";

const phoneRegExp = /^\+?[0-9]{10,15}$/;

export const appointmentSchema = yup
  .object({
    address: yup.string().required("This field is required"),
    number: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("This field is required"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .positive("Age must be a positive number")
      .required("This field is required"),
    time: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Invalid format")
      .required("This field is required"),
    name: yup.string().required("This field is required"),
    comment: yup.string().max(350, "Comment is too long").optional(),
  })
  .required();

export type IAppointmentForm = yup.InferType<typeof appointmentSchema>;
