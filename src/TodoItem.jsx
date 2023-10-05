import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

function TodoItem({ todo, remove, toggle, completed = false }) {
  const labelId = `checkbox-list-label-${todo.id}`;

  function removeTodo() {
    remove(todo.id);
  }

  function toggleTodo() {
    toggle(todo.id);
  }

  return (
    <ListItem
      secondaryAction={
        <ButtonGroup size="small" aria-label="small button group">
          {/* <IconButton aria-label="edit" color="primary">
            <EditTwoToneIcon />
          </IconButton> */}
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={removeTodo}
            disabled={completed}
          >
            <DeleteForeverTwoToneIcon />
          </IconButton>
        </ButtonGroup>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.completed || completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
            onChange={toggleTodo}
            disabled={completed}
          />
        </ListItemIcon>

        <ListItemText
          id={labelId}
          primary={
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Typography variant="caption" display="flex" gutterBottom>
                {todo.description}
              </Typography>
              <Typography
                variant="overline"
                display="flex"
                sx={{ color: "slateblue" }}
                gutterBottom
              >
                {todo.period}
              </Typography>
            </Stack>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

export default TodoItem;
