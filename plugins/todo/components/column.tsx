import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CardTodo } from "./card-todo";
import { Add, Check } from "@mui/icons-material";
import { Todo, TypedColumn } from "../type";

interface IProps {
  id: TypedColumn;
  todos: Todo[];
  index: number;
  handleClickOpenModalEdit: (item: Todo, columnId: TypedColumn) => void;
  handleDeleteTasks: (item: Todo, columnId: TypedColumn) => void;
  handleClickAddIssue: (columnId: TypedColumn) => void;
}

const idColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "Todo",
  "in-progress": "In Progress",
  done: "Done",
};

export const Column = ({
  index,
  todos,
  id,
  handleClickAddIssue,
  handleClickOpenModalEdit,
  handleDeleteTasks,
}: IProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Grid
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          item
          md={4}
        >
          <Box width={"100%"}>
            {/* render dropable todos in the column */}
            <Droppable droppableId={index.toString()} type="card">
              {(provided, snapshot) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  bgcolor={snapshot.isDraggingOver ? grey[200] : grey[100]}
                  borderRadius={2}
                  minHeight={"220px"}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    p={2}
                  >
                    <Box
                      textTransform={"uppercase"}
                      fontWeight={500}
                      fontSize={"14px"}
                      color={grey[700]}
                    >
                      {idColumnText[id]}
                      {id == "done" && (
                        <Check sx={{ fontSize: "12px" }} color="success" />
                      )}
                    </Box>

                    <Typography fontSize={"12px"}>{todos.length}</Typography>
                  </Stack>

                  <Stack spacing={0.8} p={0.8} height={"100%"}>
                    {todos.length > 0 &&
                      todos.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <CardTodo
                              key={item.id}
                              todo={item}
                              index={index}
                              id={id}
                              dragHandleProps={provided.dragHandleProps}
                              draggableProps={provided.draggableProps}
                              innerRef={provided.innerRef}
                              snapshot={snapshot}
                              handleClickOpenModalEdit={
                                handleClickOpenModalEdit
                              }
                              handleDeleteTasks={handleDeleteTasks}
                            />
                          )}
                        </Draggable>
                      ))}

                    {provided.placeholder}
                  </Stack>

                  <Button
                    startIcon={<Add />}
                    variant="text"
                    fullWidth
                    size="small"
                    onClick={() => handleClickAddIssue(id)}
                  >
                    Add issue
                  </Button>
                </Box>
              )}
            </Droppable>
          </Box>
        </Grid>
      )}
    </Draggable>
  );
};
