import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      className="footer"
      sx={{
        bgcolor: "secondary.main",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <div className="footer-text">
        <Typography variant="h6">Teerex Store</Typography>
        <p style={{ marginBottom: "0" }}>
          © 2023 Teerex Store. All Rights Reserved.
        </p>
      </div>
    </Box>
  );
};

export default Footer;
