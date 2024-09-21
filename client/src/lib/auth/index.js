import { string, object } from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

export const loginInputSchema = object({
  email: string().email("Invalid email adress").required("Required"),
  password: string().required("The password value is required"),
});

export const initialLoginInputsValue = {
  email: "yousseftaoussi@gmail.com",
  password: "password",
};

export const initialRegisterInputsValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const registetInputsSchema = object({
  firstName: string()
    .min(5, "Must be less than 40 and more than 5 characters")
    .max(40, "Must be less than 40 and more than 5 characters")
    .required("Required"),
  lastName: string()
    .min(5, "Must be less than 40 and more than 5 characters")
    .max(40, "Must be less than 40 and more than 5 characters")
    .required("Required"),
  email: string().email("Invalid email adress").required("Required"),
  password: string().matches(passwordRegex).required("Required"),
});
