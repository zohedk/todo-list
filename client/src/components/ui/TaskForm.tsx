import React, { useContext, useEffect, useRef, useState } from "react";
import { TaskFromContext } from "../../context";
import { useAddTask } from "../../hooks";
import toast from "react-hot-toast";
interface TaskFormProp {
  cardTitle: string;
}

export const TaskForm: React.FC<TaskFormProp> = ({}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const [status] = useState<"pending" | "processing" | "completed">("pending");
  const { setTaskForm, setTaskCard } = useContext(TaskFromContext)!;

  const taskForm = useRef<HTMLDivElement | null>(null);
  const taskCard = useRef<HTMLDivElement | null>(null);

  const { taskMutation } = useAddTask();
  function resetState() {
    setTitle("");
    setDescription("");
    setImportant(false);
  }

  useEffect(() => {
    setTaskForm(taskForm.current);
    setTaskCard(taskCard.current);
  }, []);

  return (
    <div
      ref={taskForm}
      className=" hide relative w-screen  flex justify-center items-center transition-all duration-100  z-[12] overflow-hidden "
    >
      <div
        onClick={() => {
          taskForm.current?.classList.toggle("hide");
          taskForm.current?.classList.toggle("show");
          taskCard.current?.classList.toggle("hide");
        }}
        className="absolute top-0 w-[100%] h-[100%]  bg-[rgba(0,0,0,0.4)] z-[6]"
      ></div>
      {/* modal */}
      <div
        ref={taskCard}
        className=" hide relative  w-screen h-screen mobile:w-[500px] mobile:h-[550px] bg-black rounded-lg overflow-scroll z-[7]"
      >
        {/* modal closer */}
        <span
          onClick={() => {
            taskForm.current?.classList.toggle("hide");
            taskForm.current?.classList.toggle("show");
            taskCard.current?.classList.toggle("hide");
          }}
          className="absolute top-[10px] right-[20px] text-white text-[25px] cursor-pointer"
        >
          X
        </span>

        <div className="w-[100%] flex flex-col items-center z-[12]">
          <h1 className="text-white text-[25px] font-[500] mt-[20px]">
            Add To-do
          </h1>
          <div className="w-[100%]  flex flex-col items-center mt-[50px] gap-[20px]">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="w-[90%] h-[55px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-[20px] p-[10px] "
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="w-[90%] h-[300px] mobile:h-[200px] bg-transparent outline-none text-white text-[20px] border border-[#ffffff88] rounded-lg placeholder:text-[20px] placeholder:text-start p-[10px] "
            />
            <div className="w-[90%] flex justify-start items-center gap-[5px] ">
              <input
                type={"checkbox"}
                id="imp-task"
                readOnly={true}
                onClick={() => {
                  setImportant((crnt) => !crnt);
                }}
                checked={important ? true : false}
              />
              <label htmlFor="imp-task" className="text-white text-[20px]">
                Important
              </label>
            </div>
          </div>
          <div className="w-[100%] flex justify-center items-center mt-[20px]">
            <button
              className="w-[90%] flex justify-center items-center text-white font-[500] bg-[#2F94C4] hover:bg-[#60b8e0] p-[10px] pl-[15px] pr-[15px] rounded-lg"
              onClick={() => {
                if (title.length === 0) {
                  return toast.error("Tittle cannont be empty");
                }
                taskMutation.mutate({ title, description, status, important });
                resetState();
                taskForm.current?.classList.toggle("hide");
                taskForm.current?.classList.toggle("show");
                taskCard.current?.classList.toggle("hide");
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
