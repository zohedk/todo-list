import { LoginForm } from "../ui";
import { useFetchUser } from "../../hooks";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const { user } = useFetchUser();
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <LoginForm />
    </div>
  );
};
