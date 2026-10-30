import React, { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

const Home = () => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  console.log(allTasks);

  function getAllTasks() {
    const data = JSON.parse(localStorage.getItem("all_tasks")) || [];
    setAllTasks(data);
  }

  useEffect(() => {
    getAllTasks();
  }, [showAddTaskForm]);

  return (
    <div>
      {showAddTaskForm === true && (
        <button onClick={() => setShowAddTaskForm(false)}>Back</button>
      )}
      {showAddTaskForm === true ? (
        <AddTask allTasks={allTasks} setShowAddTaskForm={setShowAddTaskForm} />
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
              <TaskCard
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                status="todo"
              />
            </td>
            <td>
              <TaskCard
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                status="in-progress"
              />
            </td>
            <td>
              <TaskCard
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                status="completed"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
