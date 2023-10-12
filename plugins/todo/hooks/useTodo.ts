import { Columns, Todo, TypedColumn } from "../type";

const listFromApi: Todo[] = [
  {
    id: 1,
    title: "Implement User Interface from figma",
    description: "Implement the user interface design",
    status: "todo",
  },
  {
    id: 2,
    title: "Develop Main Section",
    description: "Build the main section, including navigation and footer",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Handle profile",
    description: "Handle the profile",
    status: "in-progress",
  },
  {
    id: 4,
    title: "Handle Settings profile",
    description: "Handle settings profile",
    status: "in-progress",
  },
];

export const useTodo = () => {
  const columns = listFromApi.reduce((acc, todo) => {
    const status = todo.status;

    if (!acc.has(status)) {
      acc.set(status, {
        id: status,
        todos: [],
      });
    }

    acc.get(status)!.todos.push(todo); // Khằng định acc.get(status) không trả về null

    return acc;
  }, new Map<TypedColumn, Columns>());

  // if columns is haven't inprogress, todo and done, add them with empty todos
  const columnTypes: TypedColumn[] = ["todo", "in-progress", "done"];

  for (const columnType of columnTypes) {
    // if there is no column then i will set todos empty
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // Nếu không sort thì các column sẽ bị lộn xộn
  const sortedColumn = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board = sortedColumn;

  return board;
};
