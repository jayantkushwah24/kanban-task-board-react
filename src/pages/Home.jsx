import { useContext, useEffect } from "react";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import { TasksContext } from "../context/TaskContext";

const Home = () => {
  const { showAddTaskForm, handleStartAddTask, handleCancelForm } =
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
            <td>
              <TaskCard status="todo" />
            </td>
            <td>
              <TaskCard status="in-progress" />
            </td>
            <td>
              <TaskCard status="completed" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
