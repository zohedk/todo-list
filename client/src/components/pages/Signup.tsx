import { SignupForm } from "../ui";
import { useFetchUser } from "../../hooks";
import { Navigate } from "react-router-dom";

export const Signup = () => {
  const { user } = useFetchUser();
  if (user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="flex w-[100%] h-[100%] justify-center items-center">
      <SignupForm />
    </div>
  );
};
