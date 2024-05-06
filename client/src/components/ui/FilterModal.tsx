import { useRef } from "react";
import { IoFilterSharp } from "react-icons/io5";

export const FilterModal = ({ setFilter }: { setFilter: any }) => {
  const modal = useRef<HTMLDivElement | null>(null);

  function handleToggle() {
    modal.current?.classList.toggle("hidden");
  }

  return (
    <div className="relative flex flex-col items-end gap-[5px] z-[11]">
      {/* toggler */}
      <div
        onClick={() => {
          handleToggle();
        }}
      >
        <IoFilterSharp className="text-[30px] cursor-pointer" />
      </div>
      {/* modal */}
      <div
        ref={modal}
        className="hidden absolute top-[30px] translate-x-[100%] bg-[#585858] rounded-lg transition-all duration-300 overflow-hidden"
      >
        <ul className="flex flex-col gap-[5px] pb-[5px] pt-[5px]">
          <li
            className="cursor-pointer hover:bg-[#ffffff29] hover:text-white  pl-[7px] pr-[7px]"
            onClick={() => {
              setFilter("");
              handleToggle();
            }}
          >
            All
          </li>
          <li
            className="cursor-pointer hover:bg-[#ffffff29] hover:text-white pl-[7px] pr-[7px]"
            onClick={() => {
              setFilter("pending");
              handleToggle();
            }}
          >
            Pending
          </li>
          <li
            className="cursor-pointer hover:bg-[#ffffff29] hover:text-white pl-[7px] pr-[7px]"
            onClick={() => {
              setFilter("processing");
              handleToggle();
            }}
          >
            Processing
          </li>
          <li
            className="cursor-pointer hover:bg-[#ffffff29] hover:text-white pl-[7px] pr-[7px]"
            onClick={() => {
              setFilter("completed");
              handleToggle();
            }}
          >
            Completed
          </li>
        </ul>
      </div>
    </div>
  );
};
