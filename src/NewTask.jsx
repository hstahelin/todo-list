import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import AddIcon from "@mui/icons-material/Add";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

import { useState } from "react";

export default function NewTask({ add }) {
  const [state, setState] = useState(false);
  const [required, setRequired] = useState(false);
  const toggleDrawer = (open) => () => {
    setState(open);
  };

  const [task, setTask] = useState({
    description: "",
    period: "D",
    todoDate: dayjs(new Date()),
  });

  function updateTask(e) {
    setTask({ ...task, description: e.target.value });
  }

  function updateFrecuency(e) {
    setTask({ ...task, period: e.target.value });
  }

  function updateStartDate(e) {
    setTask({ ...task, todoDate: dayjs(e).toISOString() });
  }

  function hanldeSubmit(e) {
    if (!task.description) {
      setRequired(true);
      return;
    }
    add(task);
    setState(false);
    setTask({
      description: "",
      period: "D",
      todoDate: dayjs(new Date()),
    });
    setRequired(false);
  }
  function cancelNewTask() {
    setTask({
      description: "",
      period: "D",
      todoDate: dayjs(new Date()),
    });
    setState(false);
    setRequired(false);
  }

  const list = () => (
    <Box
      sx={{
        m: "1rem",
      }}
      role="presentation"
    >
      <FormControl onSubmit={hanldeSubmit} sx={{ width: "95%" }}>
        <ListItem sx={{ display: "block" }}>
          <TextField
            error={required}
            fullWidth
            id="outlined-basic"
            label="New Task"
            variant="outlined"
            onChange={updateTask}
            value={task.description}
          />
        </ListItem>

        <FormLabel
          id="demo-radio-buttons-group-label"
          sx={{
            marginLeft: "1rem",
            marginTop: "1rem",
            marginBottom: "0",
          }}
        >
          Frecuency
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="daily"
          name="radio-buttons-group"
          value={task.period}
          onChange={updateFrecuency}
          sx={{
            marginLeft: "1rem",
          }}
        >
          <FormControlLabel value="D" control={<Radio />} label="Daily" />
          <FormControlLabel value="W" control={<Radio />} label="Weekly" />
          <FormControlLabel value="M" control={<Radio />} label="Monthly" />
          <FormControlLabel value="Q" control={<Radio />} label="Quarterly" />
          <FormControlLabel value="Y" control={<Radio />} label="Yearly" />
        </RadioGroup>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ m: "1rem" }}>
            <DatePicker
              label="Start Date"
              value={dayjs(task.todoDate)}
              onChange={updateStartDate}
              defaultValue={dayjs(new Date())}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={2}>
            <IconButton
              aria-label="cancel"
              size="large"
              color="error"
              onClick={cancelNewTask}
            >
              <CancelTwoToneIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              aria-label="save"
              size="large"
              color="success"
              onClick={hanldeSubmit}
            >
              <AddCircleTwoToneIcon fontSize="inherit" size="large" />
            </IconButton>
          </Grid>
        </Grid>
      </FormControl>
    </Box>
  );

  return (
    <div>
      <Box key={"bottom"}>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={toggleDrawer(true)}
          sx={{ mt: "10px" }}
        >
          New Task
        </Button>
        <Drawer anchor="bottom" open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Box>
    </div>
  );
}
