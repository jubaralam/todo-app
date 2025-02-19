import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo or Brand */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Todo
        </Typography>

        {/* Navigation Links */}
        <Box>
          {["Home", "About", "Contact", "Login"].map((text, index) => (
            <Button
              key={index}
              component={NavLink}
              to={text.toLowerCase()}
              sx={{
                color: "white",
                textTransform: "none",
                mx: 1,
                fontSize: "16px",
                "&.active": {
                  borderBottom: "2px solid white",
                },
              }}
            >
              {text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
