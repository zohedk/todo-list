import { IoMdAdd } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TaskFromContext } from "../../context";
import { useContext } from "react";

export const MobileNav = () => {
  const { taskForm } = useContext(TaskFromContext)!;
  return (
    <div className="flex justify-evenly items-center mobile:hidden  fixed bottom-0 w-screen h-[70px] bg-[#585858] z-[11]">
      <Link to={"/"}>
        <div>
          <IoMdHome className="text-white text-[25px]" />
        </div>
      </Link>
      <button
        className="flex justify-center items-center w-[50px] h-[50px] bg-transparent  hover:bg-[#555454] rounded-full border border-[#ffffff96]"
        onClick={() => {
          taskForm?.classList.toggle("hide");
          taskForm?.classList.toggle("show");
        }}
      >
        <IoMdAdd className="text-[23px]  text-white" />
      </button>
      <Link to={"/important"}>
        <div>
          <FaListCheck className="text-white text-[25px]" />
        </div>
      </Link>
    </div>
  );
};
