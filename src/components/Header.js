import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { Badge, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { loadCartProducts } from "../pages/Products";

const Header = () => {
  // const theme = useTheme();
  // bgcolor={theme.palette.secondary.main}

  const cartProducts = loadCartProducts();
  const cartCount = cartProducts.length;
  const navigate = useNavigate();


  return (
    <div>
      <Box className="header" sx={{ bgcolor: "secondary.main" }}>
        <Typography variant="h4" className="header-title">
          Teerex Store
        </Typography>
        <Box>
          <Button onClick={() => navigate("/")} sx={{ marginRight: "0.5rem" }} size="large">
            <Typography variant="h6" className="header-subtitle">
              Products
            </Typography>
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "primary.dark" }}
            onClick={() => navigate("/cart")}
          >
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartSharpIcon />
            </Badge>
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Header;
