import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  SwipeableDrawer,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { API_URL } from "../App";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ItemFilter } from "../components/ItemFilter";
import ProductCard from "../components/ProductCard";
import "./Products.css";

// Load the cart products from local storage
export const loadCartProducts = () => {
  try {
    const serializedCartProducts = localStorage.getItem("cartProducts");
    if (serializedCartProducts === null) {
      return [];
    }
    return JSON.parse(serializedCartProducts);
  } catch (error) {
    console.log("Error loading cart products from local storage: ", error);
    return [];
  }
};

// Save the cart products to local storage
export const saveCartProducts = (cartProducts) => {
  try {
    const serializedCartProducts = JSON.stringify(cartProducts);
    localStorage.setItem("cartProducts", serializedCartProducts);
  } catch (error) {
    console.log("Error saving cart products to local storage: ", error);
  }
};

const Products = ({ products, searchResults, filteredProducts }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 960px)");

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // display filtered products if any, else display all products
  const displayProducts =
    searchResults && searchResults.length > 0
      ? searchResults
      : filteredProducts && filteredProducts.length > 0
      ? filteredProducts
      : products;

  const loading = () => {
    return (
      <div className="loading">
        <CircularProgress color="primary" />
      </div>
    );
  };

  // fetch products from API
  const fetchProducts = async () => {
    setLoader(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      dispatch({
        type: "SET_PRODUCTS",
        payload: data,
      });
      setLoader(false);
    } catch (error) {
      enqueueSnackbar("Error loading products", {
        variant: "error",
        autoHideDuration: 3000,
      });
      console.log("error ", error);
    }
  };
  // search for products
  const performSearch = (searchTerm) => {
    // don't filter if search term is empty, but if filtered products exist, display them
    if (searchTerm === "") {
      fetchProducts();
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: [],
      });
      return;
    }
    // search by name, color and type
    let searchedProducts = [];

    if (searchTerm !== "") {
      searchedProducts = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      if (filteredProducts.length > 0) {
        searchedProducts = filteredProducts.filter((product) => {
          return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.type.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        dispatch({
          type: "SET_FILTERED_PRODUCTS",
          payload: searchedProducts,
        });
      }
    }

    // if search term not found
    if (searchedProducts.length === 0) {
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: [],
      });
      enqueueSnackbar("No products found", {
        variant: "warning",
        autoHideDuration: 500,
      });
      return;
    }

    // else return Searched products
    dispatch({
      type: "SET_SEARCH_RESULTS",
      payload: searchedProducts,
    });

    return;
  };

  // add product to cart
  const handleAddToCart = (product) => {
    console.log("product added to cart ", product);
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    // store in local storage
    const cartProducts = loadCartProducts();
    const newProduct = { ...product, qty: 1 };
    cartProducts.push(newProduct);
    saveCartProducts(cartProducts);
    window.location.reload();
    // show snackbar
    enqueueSnackbar("Added to cart", {
      variant: "success",
      autoHideDuration: 1000,
    });
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Header />
      <div className="search">
        <TextField
          id="standard-basic"
          label="search for products"
          variant="standard"
          onChange={(e) => performSearch(e.target.value)}
        />
        <Button variant="contained" sx={{ bgcolor: "primary.main" }}>
          <SearchSharpIcon />
        </Button>
        {isDesktop ? null : (
          <Button
            variant="contained"
            sx={{ bgcolor: "primary.main", marginLeft: "1rem" }}
            onClick={toggleDrawer}
          >
            <FilterAltSharpIcon />
          </Button>
        )}
      </div>
      <Box>
        {(filteredProducts.length > 0 && filteredProducts) ||
        (searchResults.length > 0 && searchResults) ? (
          <>
            <Divider>
              <b> {displayProducts.length}</b> products found
            </Divider>
          </>
        ) : null}
      </Box>
      <Box sx={{ display: "flex" }}>
        {isDesktop ? (
          <Box sx={{ width: "30vw" }}>
            <ItemFilter />
          </Box>
        ) : (
          <SwipeableDrawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
          >
            <IconButton onClick={toggleDrawer} color="primary">
              <ChevronRightIcon />
            </IconButton>
            <Divider />
            <ItemFilter />
          </SwipeableDrawer>
        )}
        <Grid
          container
          spacing={2}
          className="product-grid"
          sx={{
            justifyContent: "center",
          }}
        >
          {loader && loading()}
          {displayProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                handleAddToCart={handleAddToCart}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    filteredProducts: state.filteredProducts,
    searchResults: state.searchResults,
    filter: state.filter,
  };
};
export default connect(mapStateToProps)(Products);
