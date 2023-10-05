import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TodoItem from "./TodoItem";
import NewTask from "./NewTask";

import { useState } from "react";

function getInitialData() {
  const data = [
    {
      id: 1,
      description: "Laundry",
      period: "W",
      completed: false,
      todoDate: new Date("October 5, 2023"),
      completedDates: [],
    },
    {
      id: 2,
      description: "Garbage",
      period: "W",
      completed: false,
      todoDate: new Date("October 6, 2023"),
      completedDates: [],
    },
    {
      id: 3,
      description: "Make Bed",
      period: "D",
      completed: false,
      todoDate: new Date("October 5, 2023"),
      completedDates: [
        new Date("October 3, 2023"),
        new Date("October 4, 2023"),
      ],
    },
    {
      id: 4,
      description: "Dishes",
      period: "D",
      completed: false,
      todoDate: new Date("October 6, 2023"),
      completedDates: [
        new Date("October 4, 2023"),
        new Date("October 5, 2023"),
      ],
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

  function calculateNext(frecuency) {
    switch (frecuency) {
      case "D":
        return 1;
        break;
      case "W":
        return 7;
        break;
      case "M":
        return 30;
        break;
      case "Q":
        return 90;
        break;
      case "Y":
        return 365;
        break;
    }
  }
  function toggletodo(id) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            //completed: !todo.completed,
            completedDates: [
              ...todo.completedDates,
              new Date(new Date(day).setHours(0, 0, 0, 0)),
            ],
            todoDate: new Date(
              new Date(day).setDate(
                new Date(day).getDate() + calculateNext(todo.period)
              )
            ),
          };
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
          completedDates: [],
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
        {todos
          .filter((todo) =>
            todo.completedDates.map((c) => c.toISOString()).includes(day)
          )
          .map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              remove={removeTodo}
              toggle={toggletodo}
              completed={true}
            />
          ))}
        <Divider />
        <NewTask add={addTodo} />
      </List>
    </Box>
  );
}

export default TodoList;
