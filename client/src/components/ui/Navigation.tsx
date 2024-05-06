import { FaUserCircle } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { Link, Navigate } from "react-router-dom";
import { useFetchUser } from "../../hooks";

export const Navigation = () => {
  const { user } = useFetchUser();
  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-between pt-[50px] pb-[50px] ">
      {/* user detail */}
      <div className="flex flex-col   text-white pl-[15px] pr-[15px] cursor-pointer gap-[50px]">
        <div className="w-[100%] flex flex-col justify-center gap-[20px] pl-[15px] pr-[15px]">
          <FaUserCircle className="text-[50px]" />
          <div className="text-[20px]">
            Hi <span className="capitalize">{user?.name}</span> !
          </div>
        </div>
        {/* nav buttons */}
        <nav className="w-[100%] text-[#ffffffc1] ">
          <ul className="w-[100%] flex flex-col   gap-[15px]">
            <Link to={"/"}>
              <li className="w-[100%] flex  items-center gap-[15px] p-[10px] pl-[15px] pr-[15px] bg-transparent hover:bg-[#ffffff29] hover:text-white cursor-pointer">
                <span>
                  <IoMdHome className="text-[22px]" />
                </span>
                <span className="">All Task</span>
              </li>
            </Link>
            <Link to={"/important"}>
              <li className="flex items-center gap-[15px] p-[10px] pl-[15px] pr-[15px] bg-transparent hover:bg-[#ffffff29] hover:text-white cursor-pointer">
                <span>
                  <FaListCheck className="text-[22px]" />
                </span>
                <span className="">Important</span>
              </li>
            </Link>
          </ul>
        </nav>
      </div>

      {/*login logout*/}
      {user ? (
        <div
          className="flex items-center text-[#E91E62] hover:text-[#ff76a3] pl-[15px] pr-[15px]  gap-[5px]"
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
  );
};
