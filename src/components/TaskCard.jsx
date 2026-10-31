import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

const priorityClasses = {
  urgent: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
  normal: "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
  "not-critical":
    "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  low: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

const priorityLabels = {
  urgent: "Urgent",
  normal: "Normal",
  "not-critical": "Not critical",
  low: "Low",
};

const TaskCard = ({ task }) => {
  const {
    handleDeleteTask,
    handleUpdateTask,
    handleChangeStatus,
    handleDragStart,
    handleDragEnd,
  } = useContext(TasksContext);

  const dueDate = task.due_date
    ? new Date(`${task.due_date}T00:00:00`)
    : null;
  const isOverdue =
    dueDate &&
    dueDate < new Date(new Date().setHours(0, 0, 0, 0)) &&
    task.status !== "completed";

  return (
    <article
      draggable
      onDragStart={() => handleDragStart(task.id)}
      onDragEnd={handleDragEnd}
      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/60 active:cursor-grabbing dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/10 dark:hover:border-indigo-500/60 dark:hover:shadow-black/20"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
            priorityClasses[task.priority] ?? priorityClasses.low
          }`}
        >
          {priorityLabels[task.priority] ?? task.priority ?? "Low"}
        </span>
        <div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={() => handleUpdateTask(task.id)}
            aria-label={`Edit ${task.title}`}
            title="Edit task"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:hover:bg-slate-700 dark:hover:text-indigo-300"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path d="m13.5 3.5 3 3M4 16l3.2-.7L16 6.5a2.1 2.1 0 0 0-3-3L4.2 12.3 4 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleDeleteTask(task.id)}
            aria-label={`Delete ${task.title}`}
            title="Delete task"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-rose-600 dark:hover:bg-slate-700 dark:hover:text-rose-300"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path d="M3.5 5.5h13m-11.5 0 .7 11h7.6l.7-11m-7.5 0V3.8h4V5.5m-2 3v5m-2-5v5m4-5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <h3 className="mt-3 wrap-break-word font-semibold leading-6 text-slate-900 dark:text-slate-100">
        {task.title}
      </h3>
      {task.description && (
        <p className="mt-1.5 whitespace-pre-wrap wrap-break-word text-sm leading-5 text-slate-500 dark:text-slate-400">
          {task.description}
        </p>
      )}

      {dueDate && !Number.isNaN(dueDate.getTime()) && (
        <p
          className={`mt-4 flex items-center gap-2 text-xs font-medium ${
            isOverdue
              ? "text-rose-600 dark:text-rose-300"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            <rect x="3" y="4.5" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6.5 2.5v4m7-4v4M3 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {isOverdue ? "Overdue · " : ""}
          {dueDate.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
        <label
          htmlFor={`task-status-${task.id}`}
          className="text-xs font-medium text-slate-400"
        >
          Move to
        </label>
        <select
          id={`task-status-${task.id}`}
          value={task.status}
          onChange={(event) => handleChangeStatus(task.id, event.target.value)}
          onClick={(event) => event.stopPropagation()}
          className="max-w-36 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 outline-none transition hover:border-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-indigo-400"
        >
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </article>
  );
};

export default TaskCard;
