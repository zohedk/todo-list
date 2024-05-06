import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserSignup } from "../../hooks";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export const SignupForm: React.FC = ({}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState<"text" | "password">(
    "password"
  );

  const { userSignupMutation } = useUserSignup();

  return (
    <div className="  w-[350px] h-[450px] mobile:w-[500px] mobile:h-[450px] bg-[#3f3f3f] rounded-lg overflow-scroll z-[6]">
      <div className="w-[100%] h-[100%] flex flex-col items-center">
        <h1 className="text-white text-[25px] font-[500] mt-[20px]">Sign Up</h1>
        <div className="w-[100%]  flex flex-col items-center mt-[50px] gap-[30px]">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-[90%] h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-[20px] p-[10px] "
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-[90%] h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-[20px] p-[10px] "
          />
          <div className="w-[90%] relative flex items-center gap-[10px]">
            <input
              type={passwordType}
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-[100%] h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-[20px] p-[10px] "
            />
            {passwordType === "password" ? (
              <FaEye
                onClick={() => {
                  setPasswordType("text");
                }}
                className="absolute top-[50%] right-[10px] translate-y-[-50%] text-[25px] text-white hover:text-[#d1d0d0] text-wite cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={() => {
                  setPasswordType("password");
                }}
                className="absolute top-[50%] right-[10px] translate-y-[-50%] text-[25px] text-white hover:text-[#d1d0d0] text-wite cursor-pointer"
              />
            )}
          </div>
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center mt-[20px] gap-[10px]">
          <button
            className="w-[90%] flex justify-center items-center text-white font-[500] bg-[#2F94C4] hover:bg-[#60b8e0] p-[10px] pl-[15px] pr-[15px] rounded-lg"
            onClick={() => {
              userSignupMutation.mutate({ name, email, password });
            }}
          >
            Submit
          </button>
          <div className="w-[90%] flex justify-end items-center cursor-pointer text-end">
            <Link to={"/login"}>
              <div className="flex items-center gap-[5px]">
                <button className=" text-white">Already a user?</button>
                <div className="text-[#2F94C4] hover:text-[#60b8e0] ">
                  Log In
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
