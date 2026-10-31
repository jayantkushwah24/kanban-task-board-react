import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TasksContext } from "../context/TaskContext";

const AddTask = () => {
  const { register, handleSubmit } = useForm();
  const { handleFormSubmit } = useContext(TasksContext);

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
