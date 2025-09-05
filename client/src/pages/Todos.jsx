import React, { useState, useEffect } from "react";
import { Container, TextField, Button, List, ListItem, IconButton, Typography } from "@mui/material";
import { Delete, Edit, Check } from "@mui/icons-material";
import API from "../api/axios";

function Todos() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    API.get("/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  const addTask = async () => {
    if (!task.trim()) return;
    try {
      const res = await API.post("/todos", { text: task });
      setTodos([res.data, ...todos]);
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditingText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const res = await API.patch(`/todos/${id}`, { text: editingText });
      setTodos(todos.map(t => t._id === id ? res.data : t));
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const res = await API.patch(`/todos/${todo._id}`, { completed: !todo.completed });
      setTodos(todos.map(t => t._id === todo._id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Your Todos</Typography>
      <TextField
        label="New Task"
        fullWidth
        sx={{ my: 2 }}
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button variant="contained" onClick={addTask}>Add</Button>

      <List>
        {todos.map(todo => (
          <ListItem key={todo._id} sx={{ display: "flex", justifyContent: "space-between" }}>
            {editingId === todo._id ? (
              <>
                <TextField value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                <IconButton onClick={() => saveEdit(todo._id)}><Check /></IconButton>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <div>
                  <IconButton onClick={() => toggleComplete(todo)}><Check /></IconButton>
                  <IconButton onClick={() => startEdit(todo)}><Edit /></IconButton>
                  <IconButton onClick={() => deleteTask(todo._id)}><Delete /></IconButton>
                </div>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Todos;
