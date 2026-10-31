import  { useContext } from "react";
import { TasksContext } from "../context/TaskContext";

const TaskCard = ({ status }) => {
  const {
    allTasks,
    handleDeleteTask,
    handleUpdateTask,
    handleChangeStatus,
    handleDragStart,
    searchText,
    filterValue,
  } = useContext(TasksContext);

  const query = searchText.trim().toLowerCase();

  const visibleTasks = allTasks.filter(
    (task) =>
      task.status === status &&
      (task.title ?? "").toLowerCase().includes(query) &&
      (!filterValue || task.priority === filterValue),
  );

  return (
    <div>
      {visibleTasks?.length !== 0 ? (
        visibleTasks?.map((task) => {
          return (
            <div
              key={task.id}
              className="border"
              draggable
              onDragStart={() => handleDragStart(task.id)}
            >
              <h1>Title: {task.title}</h1>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due Date: {task.due_date}</p>
              <p>Priority: {task.priority}</p>
              <button onClick={() => handleUpdateTask(task.id)}>Update</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <select
                onChange={(e) => handleChangeStatus(task.id, e.target.value)}
                id="change-status"
              >
                <option value="">Move to</option>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          );
        })
      ) : (
        <div>no todo tasks</div>
      )}
    </div>
  );
};

export default TaskCard;
