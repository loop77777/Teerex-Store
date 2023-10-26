import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { loadCartProducts } from "../pages/Products";

const ProductCard = ({ product, handleAddToCart }) => {
  const cartProducts = loadCartProducts();
  const cartItem = cartProducts.find((item) => item.id === product.id);

  return (
    <Card
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      sx={{
        bgcolor: "background.main",
        ":hover": {
          transform: "scale(1.05)",
          transition: "ease-out",
          boxShadow: "2",
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.imageURL}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="subtitle2">{product.type}</Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold" }}
          marginY={"0.3rem"}
        >
          Rs{product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginBottom: "1rem" }}>
        {cartItem ? (
          <Button variant="contained" fullWidth disabled>
            <ShoppingCartCheckoutSharpIcon />
            added to cart
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleAddToCart(product)}
          >
            <AddShoppingCartSharpIcon />
            add to cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
