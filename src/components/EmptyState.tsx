import {EmptyStateProps} from "../types";

const EmptyState = ({ filter }: EmptyStateProps) => {
  const message =
    filter === "all"
      ? "There are no todos."
      : `There are no ${filter === "active" ? "active" : "completed"} todos.`;

  return (
    <>
    <div className="bg-white dark:bg-gray-800 w-[90%] px-1 m-2 flex gap-2 items-center justify-between overflow-hidden select-none">
      <label className="flex justify-stretch items-center gap-2 cursor-pointer w-[90%]" aria-label={message}>
        <span className="w-4 h-4 flex items-center justify-center rounded-full bg-transparent border border-gray-500"></span>
        <span className="font-medium text-sm w-[95%] text-gray-500 truncate">
          {message}
        </span>
      </label>
    </div>
    <div className="h-[1px] bg-gray-500 w-full"></div>
    </>
  );
};

export default EmptyState;