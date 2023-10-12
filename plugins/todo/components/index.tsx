import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useTodo } from "../hooks/useTodo";
import { Columns, Todo, TypedColumn } from "../type";
import { Column } from "./column";

export const TodoContainer = () => {
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState(new Map());
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [currentSelectedTodo, setCurrentSelectedTodo] = useState<{
    item: Todo | null;
    columnId: string;
  }>({
    item: null,
    columnId: "",
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // Check if user is dragging outside
    if (!destination) {
      return;
    }

    // Handle column drag
    if (type === "column") {
      const entries = Array.from(board.entries()); // get array
      const [removed] = entries.splice(source.index, 1); // get current column is dragging
      entries.splice(destination.index, 0, removed); // `destination.index` is the location where you want to insert the element `removed` 0 is note element want to remove
      const rearrangedColumn = new Map(entries);
      setBoard(rearrangedColumn);
    } else {
      //Dragging task
      const columns = Array.from(board);
      const startColIndex = columns[Number(source.droppableId)];
      const endColIndex = columns[Number(destination.droppableId)];

      const startCol: Columns = {
        id: startColIndex[0],
        todos: startColIndex[1].todos,
      };

      const finishCol: Columns = {
        id: endColIndex[0],
        todos: endColIndex[1].todos,
      };

      if (!startCol || !finishCol) return;

      if (source.index == destination.index && startCol == finishCol) return;

      const newTodos = startCol.todos;
      const [todoMoved] = newTodos.splice(source.index, 1); // get current column is dragging

      if (startCol.id == finishCol.id) {
        // Same column task drag
        newTodos.splice(destination.index, 0, todoMoved);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };

        const newColumns = new Map(board);
        newColumns.set(startCol.id, newCol);

        setBoard(newColumns);
      } else {
        // Draging to another column
        const finishTodos = Array.from(finishCol.todos);
        finishTodos.splice(destination.index, 0, todoMoved);
        const newColumns = new Map(board);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };

        newColumns.set(startCol.id, newCol);
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todos: finishTodos,
        });

        setBoard(newColumns);
      }
    }
  };

  const handleSubmitEdit = () => {
    if (currentSelectedTodo.item) {
      const { columnId, item } = currentSelectedTodo;
      const updatedBoard = new Map(board);

      if (updatedBoard.has(columnId)) {
        const todoColumn = { ...updatedBoard.get(columnId) }; // get current column by column id
        const findIndex = todoColumn.todos.findIndex(
          (i: Todo) => i.id === item.id
        ); // Find index

        if (findIndex >= 0) {
          const updatedItem = {
            ...item,
            title: title,
            description: description,
          };

          todoColumn.todos[findIndex] = updatedItem;
          updatedBoard.set(columnId, todoColumn);
          setBoard(updatedBoard);
          handleClose();
        }
      }
    }
  };

  const handleClickOpenModalEdit = (item: Todo, columnId: TypedColumn) => {
    setOpenModalEdit(true);

    setCurrentSelectedTodo({
      columnId: columnId,
      item: item,
    });

    setTitle(item.title);
    setDescription(item.description);
  };

  const handleClickAddIssue = (columnId: TypedColumn) => {
    setOpenModalEdit(true);
    setCurrentSelectedTodo({
      columnId: columnId,
      item: null,
    });
  };

  const handleSubmitAddIssue = () => {
    const { columnId, item } = currentSelectedTodo;
    const updatedBoard = new Map(board);

    if (board.has(columnId)) {
      const todoColumn = { ...updatedBoard.get(columnId) }; // get current column by column id
      const updatedItem: Todo = {
        id: Math.random(),
        status: columnId as TypedColumn,
        title: title,
        description: description,
      };

      todoColumn.todos = [...todoColumn.todos, updatedItem];
      updatedBoard.set(columnId, todoColumn);
      setBoard(updatedBoard);
      handleClose();
    }
  };

  const handleDeleteTasks = (item: Todo, columnId: TypedColumn) => {
    const deleteBoard = new Map(board);

    if (deleteBoard.has(columnId)) {
      const todoColumn = deleteBoard.get(columnId);

      const findIndex = todoColumn.todos.findIndex(
        (i: Todo) => i.id === item.id
      );

      if (findIndex !== -1) {
        // Remove the task from the todos array
        todoColumn.todos.splice(findIndex, 1);

        // Update the state with the modified board
        deleteBoard.set(columnId, todoColumn);
        setBoard(deleteBoard);
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setOpenModalEdit(false);
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    const initialBoard = useTodo();
    setBoard(initialBoard);
    setLoading(false);
  }, []);

  return (
    <Box mt={10}>
      {!loading && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="column">
            {(provided) => (
              <Grid
                container
                {...provided.droppableProps}
                ref={provided.innerRef}
                spacing={2}
                minHeight={"220px"}
              >
                {Array.from(board.entries()).map(([id, column], index) => (
                  <Column
                    key={id}
                    id={id}
                    todos={column.todos}
                    index={index}
                    handleClickOpenModalEdit={handleClickOpenModalEdit}
                    handleDeleteTasks={handleDeleteTasks}
                    handleClickAddIssue={handleClickAddIssue}
                  />
                ))}

                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Dialog edit todo  */}
      <Dialog
        open={openModalEdit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="small"
              label="Title"
              variant="filled"
            />
            <TextField
              size="small"
              label="Description"
              variant="filled"
              multiline
              minRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>

          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button
              onClick={() => {
                if (currentSelectedTodo.item) {
                  handleSubmitEdit();
                } else {
                  handleSubmitAddIssue();
                }
              }}
            >
              Save changes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
