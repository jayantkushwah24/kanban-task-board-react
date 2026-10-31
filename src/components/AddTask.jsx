import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TasksContext } from "../context/TasksContext";
import { useContext } from "react";

const AddTask = () => {
  const { handleCancelForm, handleFormSubmit, taskToEdit } =
    useContext(TasksContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: taskToEdit ?? {
      title: "",
      description: "",
      priority: "urgent",
      status: "todo",
      due_date: "",
    },
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleCancelForm();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleCancelForm]);

  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-indigo-400 dark:focus:bg-slate-900 dark:focus:ring-indigo-950";
  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/55 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleCancelForm();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/20 sm:max-h-[calc(100dvh-3rem)] sm:p-7 dark:border-slate-700 dark:bg-slate-800"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
              {taskToEdit ? "Make it better" : "A fresh start"}
            </p>
            <h2
              id="task-form-title"
              className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-white"
            >
              {taskToEdit ? "Edit task" : "Create a task"}
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add the details now. You can always change them later.
            </p>
          </div>
          <button
            type="button"
            onClick={handleCancelForm}
            aria-label="Close task form"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            Close
          </button>
        </div>

        <form
          className="grid gap-5 md:grid-cols-2"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="md:col-span-2">
            <label htmlFor="title" className={labelClass}>
              Task name <span className="text-rose-500">*</span>
            </label>
            <input
              {...register("title", {
                required: "Give your task a name.",
                maxLength: {
                  value: 100,
                  message: "Keep the title under 100 characters.",
                },
              })}
              id="title"
              autoFocus
              placeholder="e.g. Prepare the launch checklist"
              className={fieldClass}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p id="title-error" className="mt-1.5 text-sm text-rose-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className={labelClass}>
              Description{" "}
              <span className="font-normal text-slate-400">· optional</span>
            </label>
            <textarea
              {...register("description")}
              id="description"
              rows={3}
              placeholder="Add a few details to help you get started..."
              className={`${fieldClass} resize-y`}
            />
          </div>

          <div>
            <label htmlFor="priority" className={labelClass}>
              Priority
            </label>
            <select {...register("priority")} id="priority" className={fieldClass}>
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
              <option value="not-critical">Not critical</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select {...register("status")} id="status" className={fieldClass}>
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="due_date" className={labelClass}>
              Due date{" "}
              <span className="font-normal text-slate-400">· optional</span>
            </label>
            <input
              {...register("due_date")}
              id="due_date"
              type="date"
              className={fieldClass}
            />
          </div>

          <div className="flex items-end justify-end gap-3">
            <button
              type="button"
              onClick={handleCancelForm}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {taskToEdit ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddTask;
