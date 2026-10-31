import { useContext, useMemo, useState } from "react";
import AddTask from "../components/AddTask";
import TaskColumn from "../components/TaskColumn";
import { TasksContext } from "../context/TasksContext";
import { filterTasks } from "../utils/taskHelpers";

const columns = [
  { title: "To do", status: "todo", accent: "bg-violet-500" },
  { title: "In progress", status: "in-progress", accent: "bg-blue-500" },
  { title: "Completed", status: "completed", accent: "bg-emerald-500" },
];

const Home = () => {
  const {
    allTasks,
    showAddTaskForm,
    handleStartAddTask,
    handleSearchByTitle,
    handleFilterByPriority,
    searchText,
    filterValue,
  } = useContext(TasksContext);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("kanban-theme") === "dark",
  );

  const filteredTasks = useMemo(() => {
    return filterTasks(allTasks, {
      searchText,
      priority: filterValue,
    });
  }, [allTasks, filterValue, searchText]);

  const stats = [
    { label: "Total tasks", status: null, color: "text-slate-900 dark:text-white" },
    { label: "To do", status: "todo", color: "text-violet-700 dark:text-violet-300" },
    {
      label: "In progress",
      status: "in-progress",
      color: "text-blue-700 dark:text-blue-300",
    },
    {
      label: "Completed",
      status: "completed",
      color: "text-emerald-700 dark:text-emerald-300",
    },
  ];

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    localStorage.setItem("kanban-theme", nextIsDark ? "dark" : "light");
  };

  return (
    <div
      className={`${isDark ? "dark" : ""} min-h-screen bg-[#f7f8fc] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100`}
    >
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-black text-white shadow-md shadow-indigo-200 dark:shadow-indigo-950">
              K
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              kinboard
            </span>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-slate-500 sm:block dark:text-slate-400">
              Your space to get things done
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-amber-300 dark:hover:bg-slate-700"
            >
              {isDark ? (
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                  <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10 2v1.5m0 13V18m8-8h-1.5m-13 0H2m13.66-5.66-1.06 1.06m-9.2 9.2-1.06 1.06m11.32 0-1.06-1.06m-9.2-9.2L4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                  <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <section className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">
              Your workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Kanban board
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base dark:text-slate-400">
              Keep your tasks moving and make progress one step at a time.
            </p>
          </div>
          <button
            type="button"
            onClick={handleStartAddTask}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200/70 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:shadow-indigo-950"
          >
            <span aria-hidden="true" className="text-lg leading-none">+</span>
            New task
          </button>
        </section>

        <section
          aria-label="Task summary"
          className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const count = stat.status
              ? allTasks.filter((task) => task.status === stat.status).length
              : allTasks.length;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <p className="text-xs font-semibold text-slate-500 sm:text-sm dark:text-slate-400">
                  {stat.label}
                </p>
                <p className={`mt-2 text-2xl font-bold tracking-tight ${stat.color}`}>
                  {count}
                </p>
              </div>
            );
          })}
        </section>

        <section aria-label="Task board">
          <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Your tasks
              </h2>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                Search, prioritize, and keep everything in motion.
              </p>
            </div>
            <div className="grid w-full gap-2 sm:grid-cols-2 lg:max-w-xl">
              <label className="relative block min-w-0">
                <span className="sr-only">Search tasks by title</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                >
                  <circle cx="8.75" cy="8.75" r="5.75" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={searchText}
                  onChange={(event) => handleSearchByTitle(event.target.value)}
                  placeholder="Search by title..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-950"
                />
              </label>
              <label>
                <span className="sr-only">Filter by priority</span>
                <select
                  value={filterValue}
                  onChange={(event) => handleFilterByPriority(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:ring-indigo-950"
                >
                  <option value="">All priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="normal">Normal</option>
                  <option value="not-critical">Not critical</option>
                  <option value="low">Low</option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
            {columns.map((column) => (
              <TaskColumn
                key={column.status}
                {...column}
                tasks={filteredTasks.filter(
                  (task) => task.status === column.status,
                )}
              />
            ))}
          </div>

          {filteredTasks.length === 0 && (searchText || filterValue) && (
            <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
              No tasks match your search and priority. Try clearing a filter.
            </p>
          )}
        </section>
      </main>

      {showAddTaskForm && <AddTask />}
    </div>
  );
};

export default Home;
