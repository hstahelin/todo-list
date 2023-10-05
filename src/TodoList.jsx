import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import TodoItem from "./TodoItem";
import NewTask from "./NewTask";

function getInitialData() {
  const data = [
    {
      id: 1,
      description: "Laundry",
      period: "W",
      completed: false,
      todoDate: new Date("October 4, 2023"),
      nextDate: new Date("October 11, 2023"),
      completedDates: [],
    },
    {
      id: 2,
      description: "Garbage",
      period: "W",
      completed: false,
      todoDate: new Date("October 5, 2023"),
      nextDate: new Date("October 12, 2023"),
      completedDates: [],
    },
    {
      id: 3,
      description: "Make Bed",
      period: "D",
      completed: true,
      todoDate: new Date("October 4, 2023"),
      nextDate: new Date("October 5, 2023"),
      completedDates: [
        new Date("October 2, 2023"),
        new Date("October 3, 2023"),
      ],
    },
    {
      id: 4,
      description: "Dishes",
      period: "D",
      completed: false,
      todoDate: new Date("October 5, 2023"),
      nextDate: new Date("October 6, 2023"),
      completedDates: [],
    },
  ];
  return data;
}

function TodoList({ day }) {
  const [todos, setTodos] = useState(getInitialData());

  function removeTodo(id) {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  }

  function toggletodo(id) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
    });
  }

  function addTodo(newTask) {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: crypto.randomUUID(),
          description: newTask.description,
          period: newTask.period,
          completed: false,
          todoDate: new Date(new Date(newTask.todoDate).setHours(0, 0, 0, 0)),
        },
      ];
    });
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {todos
          .filter((todo) => day === todo.todoDate.toISOString())
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              remove={removeTodo}
              toggle={toggletodo}
            />
          ))}
        <Divider />
        <NewTask add={addTodo} />
      </List>
    </Box>
  );
}

export default TodoList;
