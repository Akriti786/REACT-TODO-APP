import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        {/* <Button color="inherit" component={Link} to="/">Home</Button> */}
        {!user && <Button color="inherit" component={Link} to="/signin">Sign In</Button>}
        {!user && <Button color="inherit" component={Link} to="/signup">Sign Up</Button>}
        {user && <Button color="inherit" component={Link} to="/todos">Todos</Button>}
        {user && <Button color="inherit" onClick={logout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
