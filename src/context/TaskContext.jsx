import { useState } from "react";
import { TasksContext } from "./TasksContext";
import {
  createOrUpdateTask,
  removeTaskById,
  updateTaskStatus,
} from "../utils/taskHelpers";

function getStoredTasks() {
  try {
    const storedTasks = JSON.parse(localStorage.getItem("all_tasks") ?? "[]");
    return Array.isArray(storedTasks)
      ? storedTasks.flat(Infinity).filter((task) => task && typeof task === "object")
      : [];
  } catch (error) {
    console.error("Unable to load saved tasks from local storage.", error);
    return [];
  }
}

function TasksProvider({ children }) {
  const [allTasks, setAllTasks] = useState(getStoredTasks);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [dragTaskId, setDragTaskId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const saveTasks = (tasks) => {
    localStorage.setItem("all_tasks", JSON.stringify(tasks));
    setAllTasks(tasks);
  };

  const handleFormSubmit = (data) => {
    saveTasks(createOrUpdateTask(allTasks, data, taskToEdit));
    setShowAddTaskForm(false);
    setTaskToEdit(null);
  };

  const handleDeleteTask = (id) => {
    saveTasks(removeTaskById(allTasks, id));
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
    if (!allTasks.some((task) => task.id === id)) return;
    setDragTaskId(id);
  };

  const handleDragEnd = () => {
    setDragTaskId(null);
  };

  const handleSearchByTitle = (input) => {
    setSearchText(input);
  };

  const handleDrop = (newStatus) => {
    const taskId = dragTaskId;
    setDragTaskId(null);
    if (!taskId) return;

    handleChangeStatus(taskId, newStatus);
  };

  const handleChangeStatus = (id, newStatus) => {
    const updatedTasks = updateTaskStatus(allTasks, id, newStatus);
    if (updatedTasks !== allTasks) saveTasks(updatedTasks);
  };

  const handleFilterByPriority = (input) => {
    setFilterValue(input);
  };

  return (
    <TasksContext.Provider
      value={{
        allTasks,
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
        handleDragEnd,
        handleDrop,
        searchText,
        handleSearchByTitle,
        handleFilterByPriority,
        filterValue,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;
