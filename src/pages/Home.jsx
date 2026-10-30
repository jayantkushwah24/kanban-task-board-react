import React, { useState } from "react";
import AddTask from "../components/AddTask";

const Home = () => {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

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
            <td>gym</td>
            <td>coding</td>
            <td>frontend</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
