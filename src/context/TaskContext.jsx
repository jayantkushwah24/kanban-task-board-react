import { createContext, useState } from "react";

export const TasksContext = createContext();

function TasksProvider({ children }) {
  const [allTasks, setAllTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const handleFormSubmit = (data) => {
    const { title, description, priority, status, due_date } = data;

    const obj = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      status,
      due_date,
    };

    localStorage.setItem("all_tasks", JSON.stringify([...allTasks, obj]));
    allTasks.push(obj);
    setAllTasks(allTasks);
    setShowAddTaskForm(false);
  };

  const handleUpdateTask = (id) => {
    const data = allTasks.filter((task) => task.id === id);
    setShowAddTaskForm(true);
  };

  return (
    <TasksContext.Provider
      value={{
        allTasks,
        setAllTasks,
        showAddTaskForm,
        setShowAddTaskForm,
        handleFormSubmit,
        handleUpdateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
