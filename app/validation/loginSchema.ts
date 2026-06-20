import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid format")
      .required("This field is required"),
    password: yup
      .string()
      .min(8, "Password must have at least 8 symbols")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password is too weak")
      .matches(
        /^[A-Za-z0-9@$!%*?&_\-]+$/,
        "Password can only contain English letters, numbers or special caracters",
      )
      .required("This field is required"),
  })
  .required();
