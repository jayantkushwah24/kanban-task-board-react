import { useContext, useEffect } from "react";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import { TasksContext } from "../context/TaskContext";

const Home = () => {
  const { allTasks, setAllTasks, showAddTaskForm, setShowAddTaskForm } =
    useContext(TasksContext);

  function getAllTasks() {
    const data = JSON.parse(localStorage.getItem("all_tasks")) || [];
    setAllTasks(data);
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div>
      {showAddTaskForm === true && (
        <button onClick={() => setShowAddTaskForm(false)}>Back</button>
      )}
      {showAddTaskForm === true ? (
        <AddTask />
      ) : (
        <button onClick={() => setShowAddTaskForm(true)}>Add Task</button>
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
