import { createContext, useEffect, useState } from "react";

export const TasksContext = createContext();

function TasksProvider({ children }) {
  const [allTasks, setAllTasks] = useState(
    JSON.parse(localStorage.getItem("all_tasks")) || [],
  );
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [dragTaskId, setDragTaskId] = useState(null);

  const handleFormSubmit = (data) => {
    const updatedTasks = taskToEdit
      ? allTasks.map((task) =>
          task.id === taskToEdit.id ? { ...task, ...data } : task,
        )
      : [...allTasks, { ...data, id: crypto.randomUUID() }];

    localStorage.setItem("all_tasks", JSON.stringify(updatedTasks));
    setAllTasks(updatedTasks);
    setShowAddTaskForm(false);
    setTaskToEdit(null);
  };

  const handleDeleteTask = (id) => {
    const data = allTasks.filter((task) => task.id !== id);
    setAllTasks(data);
    localStorage.setItem("all_tasks", JSON.stringify(data));
  };

  const handleUpdateTask = (id) => {
    const task = allTasks.find((task) => task.id === id);
    if (!task) return;

    setTaskToEdit(task);
    setShowAddTaskForm(true);
  };

  const handleStartAddTask = () => {
    setShowAddTaskForm(true);
    setTaskToEdit(null);
  };

  const handleCancelForm = () => {
    setShowAddTaskForm(false);
    setTaskToEdit(null);
  };

  const handleDragStart = (id) => {
    setDragTaskId(id);
  };

  const handleDrop = (newStatus) => {
    if (!dragTaskId) return;

    const updatedTasks = allTasks.map((task) =>
      task.id === dragTaskId ? { ...task, status: newStatus } : task,
    );

    setAllTasks(updatedTasks);
    localStorage.setItem("all_tasks", JSON.stringify(updatedTasks));
  };

  const handleChangeStatus = (id, newStatus) => {
    if (!newStatus) return;
    const updatedTasks = allTasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task,
    );
    setAllTasks(updatedTasks);
    localStorage.setItem("all_tasks", JSON.stringify(updatedTasks));
  };

  return (
    <TasksContext.Provider
      value={{
        allTasks,
        setAllTasks,
        showAddTaskForm,
        setShowAddTaskForm,
        taskToEdit,
        handleDeleteTask,
        handleFormSubmit,
        handleUpdateTask,
        handleStartAddTask,
        handleCancelForm,
        handleChangeStatus,
        handleDragStart,
        handleDrop
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
