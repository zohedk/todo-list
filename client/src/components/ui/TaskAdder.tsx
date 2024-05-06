import { IoMdAdd } from "react-icons/io";
import { TaskFromContext } from "../../context";
import { useContext } from "react";

export const TaskAdder = () => {
  const { taskForm, taskCard } = useContext(TaskFromContext)!;
  return (
    <div
      className="max-mobile:hidden min-h-[250px] flex justify-center items-center border border-dashed  border-[#ffffff77] rounded-lg cursor-pointer hover:bg-[#3f3f3f]"
      onClick={() => {
        taskForm?.classList.toggle("hide");
        taskForm?.classList.toggle("show");
        taskCard?.classList.toggle("hide");
      }}
    >
      <button>
        <IoMdAdd className="text-[35px] text-[#ffffff77]" />
      </button>
    </div>
  );
};
