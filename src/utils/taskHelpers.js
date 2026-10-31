export const TASK_STATUSES = ["todo", "in-progress", "completed"];

export function createOrUpdateTask(
  tasks,
  formData,
  taskToEdit,
  createId = () => crypto.randomUUID(),
) {
  if (taskToEdit) {
    return tasks.map((task) =>
      task.id === taskToEdit.id ? { ...task, ...formData } : task,
    );
  }

  return [...tasks, { ...formData, id: createId() }];
}

export function removeTaskById(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export function updateTaskStatus(tasks, id, status) {
  if (!id || !TASK_STATUSES.includes(status)) return tasks;

  const task = tasks.find((item) => item.id === id);
  if (!task || task.status === status) return tasks;

  return tasks.map((item) =>
    item.id === id ? { ...item, status } : item,
  );
}

export function filterTasks(tasks, { status, searchText = "", priority = "" }) {
  const query = searchText.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesStatus = !status || task.status === status;
    const matchesTitle = (task.title ?? "").toLowerCase().includes(query);
    const matchesPriority =
      !priority ||
      task.priority === priority ||
      (priority === "urgent" && task.priority === "expedite");

    return matchesStatus && matchesTitle && matchesPriority;
  });
}
