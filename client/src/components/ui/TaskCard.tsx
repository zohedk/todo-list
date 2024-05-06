import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDeleteTask, useUpdateStatus } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";

interface TaskCardProp {
  id: string;
  title: string;
  description: string;
  status: "pending" | "processing" | "completed";
}

export const TaskCard: React.FC<TaskCardProp> = ({
  id,
  title,
  description,
  status,
}) => {
  const queryClient = useQueryClient();
  const { deleteTaskMutation } = useDeleteTask();
  const { statusMutation } = useUpdateStatus();

  return (
    <div className=" flex flex-col justify-between min-h-[250px] bg-[#3f3f3f] border border-[#ffffff3d] text-[#ffffffcc] rounded-lg p-[10px]">
      <div className="flex flex-col gap-[15px]">
        <h3 className="capitalize text-[25px] font-[500]">{title}</h3>
        <p className="text-[18px]">{description}</p>
      </div>
      <div className="flex justify-between ">
        <div className="flex flex-col gap-[10px]">
          <button
            onClick={() => {
              switch (status) {
                case "pending":
                  statusMutation.mutate({ id, status: "processing" });
                  break;
                case "processing":
                  statusMutation.mutate({ id, status: "completed" });
              }
            }}
            className={`w-[120px] flex justify-center items-center 
            ${
              status === "completed" && "bg-[#3dcf8dd7] hover:bg-[#32a873b0]"
            } ${status === "processing" && "bg-[#2F94C4] hover:bg-[#60b8e0]"} ${
              status === "pending" && "bg-[#ff4747] hover:bg-[#c50000d2] "
            } p-[7px]  rounded-full font-bold capitalize`}
          >
            {status}
          </button>
        </div>
        <div className="flex items-end gap-[10px]">
          <button>
            <FaEdit className=" hover:text-[#32a873b0] text-[22px] cursor-pointer" />
          </button>
          <button
            onClick={() => {
              deleteTaskMutation.mutate({ id });
              queryClient.invalidateQueries({ queryKey: ["fetch-task"] });
            }}
          >
            <MdDelete className=" hover:text-[#c50000d2] text-[22px] cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};
