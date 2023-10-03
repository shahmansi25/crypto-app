import React from "react";
import Typography from "@mui/material/Typography";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} Coins Details
      </Typography>
    </footer>
  );
}

export default Footer;
