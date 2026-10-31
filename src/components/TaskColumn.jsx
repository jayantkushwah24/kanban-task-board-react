import { useContext, useState } from "react";
import { TasksContext } from "../context/TasksContext";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, status, tasks, accent }) => {
  const { handleDrop } = useContext(TasksContext);
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <section
      aria-labelledby={`column-${status}`}
      className="min-w-0"
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setIsDragOver(true);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsDragOver(false);
        }
      }}
      onDrop={(event) => {
        event.preventDefault();
        handleDrop(status);
        setIsDragOver(false);
      }}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 rounded-full ${accent}`} />
          <h2
            id={`column-${status}`}
            className="text-sm font-bold tracking-wide text-slate-700 dark:text-slate-200"
          >
            {title}
          </h2>
          <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:bg-slate-700 dark:text-slate-300">
            {tasks.length}
          </span>
        </div>
        <span className="hidden text-xs text-slate-400 sm:inline">
          Drop tasks here
        </span>
      </div>
      <div
        className={`flex min-h-56 flex-col gap-3 rounded-2xl border p-3 transition-colors sm:min-h-72 ${
          isDragOver
            ? "border-indigo-400 bg-indigo-50 ring-4 ring-indigo-100 dark:border-indigo-400 dark:bg-indigo-950/40 dark:ring-indigo-950"
            : "border-transparent bg-slate-100/80 dark:bg-slate-800/60"
        }`}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center dark:border-slate-600">
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-slate-400 dark:bg-slate-700">
              {isDragOver ? "↓" : "+"}
            </span>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {isDragOver ? `Move to ${title}` : "Nothing here yet"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {isDragOver ? "Release to update status" : "Tasks will show up here"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskColumn;
