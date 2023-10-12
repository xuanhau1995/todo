export type TypedColumn = "todo" | "in-progress" | "done";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TypedColumn;
}

export interface Columns {
  id: string;
  todos: Todo[];
}
