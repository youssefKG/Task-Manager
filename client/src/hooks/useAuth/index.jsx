import { useState } from "react";
import { string, object } from "yup";
import { string } from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

const useLogin = () => {
  const loginInputSchema = object({
    email: string().email().required(),
    password: string()
      .matches(passwordRegex)
      .required("The password value is required"),
  });

  const initialLoginInputsValue = {
    email: "",
    password: "",
  };

  return {
    initialLoginInputsValue,
    loginInputSchema,
  };
};

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
};
