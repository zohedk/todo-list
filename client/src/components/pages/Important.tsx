import { useContext, useState } from "react";
import { TaskCard, TaskAdder, Filter } from "../ui";
import { IoMdAdd } from "react-icons/io";
import { TaskFromContext } from "../../context";
import { useFetchImpTasks } from "../../hooks";

export const Important = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { taskForm, taskCard } = useContext(TaskFromContext)!;
  const { tasks } = useFetchImpTasks()!;

  return (
    <div className="flex flex-col p-[20px] gap-[20px] max-mobile:mb-[100px]">
      <div className="flex justify-between items-center ">
        <div className="flex flex-col gap-[10px]">
          <h1 className="font-[monospace] text-white text-[28px] mobile:text-[35px]">
            Important Task
          </h1>
          <div className="w-[50%] h-[5px] bg-[#3dcf8dd7] rounded-full"></div>
          <button
            onClick={() => {
              taskForm?.classList.toggle("hide");
              taskForm?.classList.toggle("show");
              taskCard?.classList.toggle("hide");
            }}
            className="max-mobile:hidden absolute right-[20px] mobile:right-[50px] flex justify-center items-center w-[40px] h-[40px] bg-transparent hover:bg-[#555454] rounded-full border border-[#ffffff96]"
          >
            <IoMdAdd className="text-[20px]  text-white" />
          </button>
        </div>
      </div>
      <div className="sticky w-[100%] top-0 mt-[10px] mb-[10px]">
        <Filter setSearch={setSearch} setFilter={setFilter} />
      </div>
      <div className="w-[100%]  task-container  overflow-scroll">
        {tasks &&
          tasks
            .filter((task) => {
              return filter.toLowerCase() === ""
                ? task
                : task.status.toLowerCase().includes(filter.toLowerCase());
            })
            .filter((task) => {
              return search.toLowerCase() === ""
                ? task
                : task.title.toLowerCase().includes(search.toLowerCase());
            })
            .map(({ id, title, description, status }) => {
              const taskStatus = status as
                | "pending"
                | "processing"
                | "completed";
              return (
                <TaskCard
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  status={taskStatus}
                />
              );
            })}
        <TaskAdder />
      </div>
    </div>
  );
};
