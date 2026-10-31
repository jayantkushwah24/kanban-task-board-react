import { useContext } from "react";
import { useForm } from "react-hook-form";
import { TasksContext } from "../context/TaskContext";

const AddTask = () => {
  const { handleFormSubmit, taskToEdit } = useContext(TasksContext);
  const { register, handleSubmit } = useForm({
    defaultValues: taskToEdit ?? {
      title: "",
      description: "",
      priority: "expedite",
      status: "todo",
      due_date: "",
    },
  });

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
        <label htmlFor="description">Description:</label>
        <textarea
          {...register("description")}
          id="description"
          name="description"
          rows="4"
          cols="50"
          placeholder="Enter your description here..."
        ></textarea>
        <label htmlFor="priority" id="priority">
          Priority:{" "}
        </label>
        <select {...register("priority")} name="priority" id="">
          <option value="expedite">Expedite</option>
          <option value="normal">Normal Priority</option>
          <option value="not-critical">Not Critical</option>
          <option value="low">Low Priority</option>
        </select>
        <label htmlFor="status">Status: </label>
        <select {...register("status")} name="status" id="status">
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <label htmlFor="due_date">Due Date: </label>
        <input {...register("due_date")} type="date" id="due_date" />
        <button type="submit">{taskToEdit ? "Edit Task" : "Add Task"}</button>
      </form>
    </div>
  );
};

export default AddTask;
