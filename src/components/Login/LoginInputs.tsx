import type { AuthForm } from "../../types/AuthFormType";
import LoginInputsUsername from "./LoginInputsUsername";
import LoginInputsPassword from "./LoginInputsPassword";
import LoginInputsPasswordAuthType from "./LoginInputsPasswordAuthType";
import LoginInputsType from "./LoginInputsPasswordType";

export interface LoginInputsProps {
  authForm: AuthForm;
  setAuthForm: React.Dispatch<React.SetStateAction<AuthForm>>;
}

export default function LoginInputs({ authForm, setAuthForm }: LoginInputsProps) {
  return (
    <>
      <LoginInputsUsername authForm={authForm} setAuthForm={setAuthForm}></LoginInputsUsername>
      <LoginInputsPassword authForm={authForm} setAuthForm={setAuthForm}></LoginInputsPassword>
      <LoginInputsPasswordAuthType authForm={authForm} setAuthForm={setAuthForm}></LoginInputsPasswordAuthType>
      <LoginInputsType authForm={authForm} setAuthForm={setAuthForm}></LoginInputsType>
    </>
  );
}