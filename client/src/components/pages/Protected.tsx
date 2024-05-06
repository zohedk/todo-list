import React from "react";
import { useFetchUser } from "../../hooks";
import { Navigate } from "react-router-dom";

export const Protected: React.FC<{ component: React.ReactNode }> = ({
  component,
}) => {
  const { user } = useFetchUser();
  if (user) {
    return <div>{component}</div>;
  }
  return <Navigate to={"/login"} />;
};
