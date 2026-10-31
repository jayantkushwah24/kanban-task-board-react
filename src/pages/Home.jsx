import { useContext, useEffect } from "react";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import { TasksContext } from "../context/TaskContext";

const Home = () => {
  const { showAddTaskForm, handleStartAddTask, handleCancelForm, handleDrop } =
    useContext(TasksContext);

  return (
    <div>
      <h1>Kanban Task Board</h1>
      {showAddTaskForm === true && (
        <button onClick={() => handleCancelForm()}>Back</button>
      )}
      {showAddTaskForm === true ? (
        <AddTask />
      ) : (
        <button onClick={() => handleStartAddTask()}>Add Task</button>
      )}

      <table>
        <thead>
          <tr>
            <th>Todo</th>
            <th>In Progess</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              onDrop={() => handleDrop("todo")}
              onDragOver={(e) => e.preventDefault()}
            >
              <TaskCard status="todo" />
            </td>
            <td
              onDrop={() => handleDrop("in-progress")}
              onDragOver={(e) => e.preventDefault()}
            >
              <TaskCard status="in-progress" />
            </td>
            <td
              onDrop={() => handleDrop("completed")}
              onDragOver={(e) => e.preventDefault()}
            >
              <TaskCard status="completed" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
