import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createOrUpdateTask,
  filterTasks,
  removeTaskById,
  updateTaskStatus,
} from "./taskHelpers.js";

const tasks = [
  {
    id: "task-1",
    title: "Review launch plan",
    priority: "urgent",
    status: "todo",
  },
  {
    id: "task-2",
    title: "Write project notes",
    priority: "normal",
    status: "in-progress",
  },
  {
    id: "task-3",
    title: "Check old task",
    priority: "expedite",
    status: "completed",
  },
];

describe("createOrUpdateTask", () => {
  it("adds a task with a generated ID", () => {
    const result = createOrUpdateTask(
      tasks,
      { title: "New task", status: "todo" },
      null,
      () => "task-new",
    );

    assert.equal(result.length, 4);
    assert.deepEqual(result[3], {
      title: "New task",
      status: "todo",
      id: "task-new",
    });
    assert.equal(tasks.length, 3);
  });

  it("updates the selected task without changing its ID or list length", () => {
    const result = createOrUpdateTask(
      tasks,
      { title: "Updated launch plan" },
      tasks[0],
    );

    assert.equal(result.length, tasks.length);
    assert.deepEqual(result[0], {
      ...tasks[0],
      title: "Updated launch plan",
    });
  });
});

describe("removeTaskById", () => {
  it("removes only the requested task", () => {
    assert.deepEqual(
      removeTaskById(tasks, "task-2").map((task) => task.id),
      ["task-1", "task-3"],
    );
  });
});

describe("updateTaskStatus", () => {
  it("moves an existing task into a supported status", () => {
    const result = updateTaskStatus(tasks, "task-1", "in-progress");

    assert.equal(result[0].status, "in-progress");
    assert.equal(result[1].status, "in-progress");
    assert.equal(tasks[0].status, "todo");
  });

  it("ignores an unknown task ID or invalid status", () => {
    assert.equal(updateTaskStatus(tasks, "missing", "completed"), tasks);
    assert.equal(updateTaskStatus(tasks, "task-1", "blocked"), tasks);
    assert.equal(updateTaskStatus(tasks, "", "completed"), tasks);
  });

  it("does not create a new list when the status is unchanged", () => {
    assert.equal(updateTaskStatus(tasks, "task-1", "todo"), tasks);
  });
});

describe("filterTasks", () => {
  it("searches titles case-insensitively and combines filters", () => {
    assert.deepEqual(
      filterTasks(tasks, {
        status: "todo",
        searchText: "  REVIEW ",
        priority: "urgent",
      }).map((task) => task.id),
      ["task-1"],
    );
  });

  it("matches the legacy expedite value for the urgent filter", () => {
    assert.deepEqual(
      filterTasks(tasks, { priority: "urgent" }).map((task) => task.id),
      ["task-1", "task-3"],
    );
  });

  it("returns all tasks when no filters are selected", () => {
    assert.deepEqual(filterTasks(tasks, {}), tasks);
  });
});
