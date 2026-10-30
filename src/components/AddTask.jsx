// if (status === "todo") {
//       localStorage.setItem("todo_tasks", JSON.stringify([...allTasks, obj]));
//     } else if (status === "in-progress") {
//       localStorage.setItem("in_progress_tasks", JSON.stringify([...allTasks, obj]));
//     } else if (status === "completed") {
//       localStorage.setItem("completed_tasks", JSON.stringify([...allTasks, obj]));
//     }

import { useForm } from "react-hook-form";

const AddTask = ({ allTasks, setShowAddTaskForm }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = (data) => {
    const { title, description, priority, status, due_date } = data;

    const obj = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      status,
      due_date,
    };

    localStorage.setItem("all_tasks", JSON.stringify([...allTasks, obj]));

    reset();
    setShowAddTaskForm(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
        <label htmlFor="title">Title: </label>
        <input
          {...register("title")}
          type="text"
          name="title"
          placeholder="Enter title"
        />
        <label for="description">Description:</label>
        <textarea
          {...register("description")}
          id="description"
          name="description"
          rows="4"
          cols="50"
          placeholder="Enter your description here..."
        ></textarea>
        <label htmlFor="priority">Priority: </label>
        <select {...register("priority")} name="priority" id="">
          <option value="expedite">Expedite</option>
          <option value="expedite">Normal Priority</option>
          <option value="expedite">Not Critical</option>
          <option value="expedite">Low Priority</option>
        </select>
        <label htmlFor="status">Status: </label>
        <select {...register("status")} name="status" id="">
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <label htmlFor="due">Due Date: </label>
        <input {...register("due_date")} type="date" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
