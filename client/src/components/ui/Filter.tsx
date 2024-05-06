import { FilterModal } from "./FilterModal";

export const Filter = ({
  setSearch,
  setFilter,
}: {
  setSearch: any;
  setFilter: any;
}) => {
  return (
    <div className=" relative w-[100%] h-[60px] flex mobile:justify-between items-center text-white bg-[#2e2e2e] gap-[30px] ">
      <FilterModal setFilter={setFilter} />
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        placeholder="Search"
        className="w-[200px] mobile:w-[350px] h-[40px] bg-transparent border border-[#ffffff3d] outline-none text-white p-[10px] rounded-md"
      />
    </div>
  );
};
