import { Check, Delete, Edit, MoreHoriz } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { Todo, TypedColumn } from "../type";

interface IProps {
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  innerRef: (element: HTMLElement | null) => void;
  todo: Todo;
  id: TypedColumn;
  index: number;
  snapshot: DraggableStateSnapshot;
  handleClickOpenModalEdit: (item: Todo, columnId: TypedColumn) => void;
  handleDeleteTasks: (item: Todo, columnId: TypedColumn) => void;
}

export const CardTodo = ({
  dragHandleProps,
  draggableProps,
  id,
  index,
  innerRef,
  todo,
  snapshot,
  handleClickOpenModalEdit,
  handleDeleteTasks,
}: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type: string) => {
    setAnchorEl(null);
    if (type == "edit") {
      handleClickOpenModalEdit(todo, id);
    } else if (type == "remove") {
      handleDeleteTasks(todo, id);
    }
  };

  return (
    <>
      <Box
        {...dragHandleProps}
        {...draggableProps}
        ref={innerRef}
        p={1}
        bgcolor={"#fff"}
        boxShadow={
          snapshot.draggingOver
            ? "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
            : "none"
        }
        borderRadius={1}
      >
        <Stack
          direction={"row"}
          alignItems={"start"}
          justifyContent={"space-between"}
        >
          <Stack>
            <Typography
              fontSize={"13px"}
              lineHeight={"110%"}
              pb={1}
              fontWeight={600}
              sx={{ wordBreak: "break-word" }}
            >
              {todo.title}
            </Typography>

            <Typography
              fontSize={"12px"}
              fontWeight={400}
              lineHeight={"110%"}
              sx={{ wordBreak: "break-word" }}
            >
              {todo.description}
            </Typography>
          </Stack>

          <Box mt={"-8px"} mr={"-2px"}>
            <IconButton
              edge="end"
              size="small"
              sx={{ height: "24px", width: "24px" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHoriz fontSize="small" />
            </IconButton>
          </Box>
        </Stack>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ fontSize: "12px" }} onClick={() => handleClose("edit")}>
          <Edit sx={{ fontSize: "1rem", mr: "0.8rem" }} /> Edit
        </MenuItem>
        <MenuItem
          sx={{ fontSize: "12px" }}
          onClick={() => handleClose("remove")}
        >
          <Delete sx={{ fontSize: "1rem", mr: "0.8rem" }} color="error" />
          Remove
        </MenuItem>
      </Menu>
    </>
  );
};
