import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      await register(name, email, password);
      navigate("/todos");
    } catch (err) {
      alert(err.response?.data.message || "Registration failed");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Sign Up</Typography>
      <TextField label="Name" fullWidth sx={{ my: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" fullWidth sx={{ my: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth sx={{ my: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>Register</Button>
    </Container>
  );
}

export default SignUp;
