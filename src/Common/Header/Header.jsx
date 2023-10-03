import React from "react";
import Typography from "@mui/material/Typography";
import "./Header.css";

function Header() {
  return (
    <header>
      <Typography variant="h6" component="h2" align="center" gutterBottom>
        Cryptocurrency Market Data
      </Typography>
    </header>
  );
}

export default Header;