import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import "./Cart.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { loadCartProducts, saveCartProducts } from "./Products";

const Cart = () => {
  const cartProducts = loadCartProducts();
  const { enqueueSnackbar } = useSnackbar();

  const getTotalValue = () => {
    return cartProducts.reduce(
      (total, product) => total + product.price * product.qty,
      0
    );
  };

  const handleDelete = (product) => {
    console.log("delete", product);
    const index = cartProducts.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      cartProducts.splice(index, 1);
      // update the local storage
      saveCartProducts(cartProducts);
    }
    window.location.reload();
    enqueueSnackbar("Item removed from cart", {
      variant: "success",
      autoHideDuration: 1000,
    });
  };

  const ItemQuantity = ({ product }) => {
    const handleAdd = (product) => {
      console.log("add", product);
      const index = cartProducts.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        const availableQuantity = cartProducts[index].quantity;
        const currentQuantity = cartProducts[index].qty;
        if (currentQuantity < availableQuantity) {
          cartProducts[index].qty += 1;
          saveCartProducts(cartProducts);
        }
        if (currentQuantity === availableQuantity) {
          // alert("Only " + availableQuantity + " items are available");
          enqueueSnackbar(
            "Only " + availableQuantity + " items are available",
            {
              variant: "warning",
              autoHideDuration: 3000,
            }
          );
          return;
        }
      }
      window.location.reload();
    };
    const handleRemove = (product) => {
      console.log("remove", product);
      const index = cartProducts.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        if (cartProducts[index].qty > 1) {
          cartProducts[index].qty -= 1;
        } else {
          cartProducts.splice(index, 1);
        }
        saveCartProducts(cartProducts);
      }
      window.location.reload();
    };

    return (
      <Box className="cart-quantity" mx={2}>
        <Button variant="outlined" onClick={() => handleRemove(product)}>
          <RemoveOutlinedIcon />
        </Button>
        <Typography variant="body1">Qty:{product.qty}</Typography>
        <Button variant="outlined" onClick={() => handleAdd(product)}>
          <AddOutlinedIcon />
        </Button>
      </Box>
    );
  };

  return (
    <Box>
      <Header />
      <Box className="cart">
        <Box>
          <Typography variant="h4">Shopping Cart</Typography>
        </Box>
        <Box className="cart-body">
          {cartProducts.length > 0 ? (
            <Box>
              <Typography variant="h6" className="cart-header" my={2}>
                Your cart has {cartProducts.length} items.
              </Typography>
              <Card
                className="cart-products"
                sx={{ bgcolor: "background.main" }} //width: "30vw"
              >
                {cartProducts.map((product) => (
                  <Box className="cart-product" key={product.id}>
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      width="100"
                      height="100"
                    />
                    <CardContent className="cart-details">
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="subtitle2">
                        {product.type}
                      </Typography>
                      <Typography variant="body1">Rs{product.price}</Typography>
                    </CardContent>
                    <Box>
                      <Typography variant="subtitile1">
                        {product.quantity - product.qty === 0 ? (
                          <span style={{ color: "red" }}>Out of Stock</span>
                        ) : (
                          <span>
                            only {product.quantity - product.qty} more left{" "}
                          </span>
                        )}
                      </Typography>
                    </Box>
                    <ItemQuantity product={product} />
                    <Button
                      variant="contained"
                      className="cart-remove"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </Button>
                  </Box>
                ))}
              </Card>
              {/* <Divider variant="middle"> Cart</Divider> */}
              <hr />
              <Box className="cart-total" my={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Total: Rs {getTotalValue()}
                </Typography>
                <Button
                  variant="contained"
                  className="cart-checkout"
                  onClick={() =>
                    enqueueSnackbar("This feature will be available soon", {
                      variant: "info",
                      autoHideDuration: 3000,
                    })
                  }
                >
                  Checkout
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography variant="h6">Your cart is empty.</Typography>
          )}
        </Box>
      </Box>
      <div className="footer">
        <Footer />
      </div>
    </Box>
  );
};

export default Cart;
