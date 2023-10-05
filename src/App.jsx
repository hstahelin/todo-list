import TopBar from "./TopBar";
import CssBaseline from "@mui/material/CssBaseline";
import TodoList from "./TodoList";
import { useState } from "react";
import "./App.css";

function App() {
  const [day, setDay] = useState(new Date(new Date().setHours(0, 0, 0, 0)));

  function dayFwd() {
    const tomorrow = new Date(day);
    tomorrow.setDate(day.getDate() + 1);
    setDay(tomorrow);
  }

  function dayBack() {
    const yesterday = new Date(day);
    yesterday.setDate(day.getDate() - 1);
    setDay(yesterday);
  }

  function today() {
    setDay(new Date(new Date().setHours(0, 0, 0, 0)));
  }
  return (
    <>
      <CssBaseline />
      <TopBar
        date={day.toDateString()}
        dayFwd={dayFwd}
        dayBack={dayBack}
        today={today}
      />
      <TodoList day={day.toISOString()} />
    </>
  );
}

export default App;
