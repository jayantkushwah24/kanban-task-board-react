import { useContext } from "react";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import { TasksContext } from "../context/TaskContext";

const Home = () => {
  const {
    showAddTaskForm,
    handleStartAddTask,
    handleCancelForm,
    handleDrop,
    handleSearchByTitle,
    handleFilterByPriority,
  } = useContext(TasksContext);

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

      <div>
        <input
          type="text"
          placeholder="search by title..."
          onChange={(e) => handleSearchByTitle(e.target.value)}
        />
      </div>
      <label htmlFor="priority">Filter by priority: </label>
      <select
        name="priority"
        id="priority"
        onChange={(e) => handleFilterByPriority(e.target.value)}
      >
        <option value="">All Tasks</option>
        <option value="urgent">Urgent</option>
        <option value="normal">Normal Priority</option>
        <option value="not-critical">Not Critical</option>
        <option value="low">Low Priority</option>
      </select>

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
