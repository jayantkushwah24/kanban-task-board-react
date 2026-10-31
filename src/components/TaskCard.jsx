import React, { useContext } from "react";
import { TasksContext } from "../context/TaskContext";

const TaskCard = ({ status }) => {
  const { allTasks, handleDeleteTask, handleUpdateTask } =
    useContext(TasksContext);

  return (
    <div>
      {allTasks.filter((t) => t.status === status)?.length !== 0 ? (
        allTasks
          ?.filter((t) => t.status === status)
          ?.map((task) => {
            return (
              <div key={task.id} className="border">
                <h1>Title: {task.title}</h1>
                <p>Description: {task.description}</p>
                <p>Status: {task.status}</p>
                <p>Due Date: {task.due_date}</p>
                <p>Priority: {task.priority}</p>
                <button onClick={() => handleUpdateTask(task.id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
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
