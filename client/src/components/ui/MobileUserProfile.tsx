import { useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { useFetchUser } from "../../hooks";
import { LuLogOut } from "react-icons/lu";

export const MobileUserProfile = () => {
  const modal = useRef<HTMLDivElement | null>(null);

  const { user } = useFetchUser();

  function handleToggle() {
    modal.current?.classList.toggle("hide");
  }

  return (
    <div className="fixed top-[10px] right-[20px] flex flex-col items-end gap-[5px] mobile:hidden z-[11]">
      {/* toggler */}
      <div
        className=""
        onClick={() => {
          handleToggle();
        }}
      >
        <FaUserCircle className="w-[45px] h-[45px] flex justify-center items-center rounded-full bg-[#585858] cursor-pointer" />
      </div>
      {/* modal */}
      <div
        ref={modal}
        className="hide w-[150px]  bg-[#585858] rounded-lg transition-all duration-300 overflow-hidden"
      >
        {/*login logout*/}
        {user ? (
          <div
            className="flex items-center text-[#E91E62] hover:text-[#ff76a3] p-[15px]  gap-[5px]"
            onClick={() => {
              localStorage.removeItem("organizer_user_token");
              <Navigate to={"/login"} />;
              window.location.reload();
            }}
          >
            <LuLogOut className="text-[25px]" />
            <button className="">Log out</button>
          </div>
        ) : (
          <div className="flex justify-evenly items-center text-white font-bold">
            <Link to={"/login"}>
              <button className="w-[100px] flex justify-center items-center bg-[#3dcf8dd7] hover:bg-[#3dcf8db0] p-[10px] pl-[15px] pr-[15px] rounded-full">
                Log In
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className="w-[100px] flex justify-center items-center bg-[#2F94C4] hover:bg-[#60b8e0] p-[10px] pl-[15px] pr-[15px] rounded-full">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
