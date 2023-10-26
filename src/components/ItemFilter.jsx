import React, { useEffect } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export const ItemFilter = () => {
  const filter = useSelector((state) => state.filter);
  const products = useSelector((state) => state.products);
  const searchResults = useSelector((state) => state.searchResults);
  const dispatch = useDispatch();

  const { red, blue, green } = filter.color;
  const handleColorChange = (event) => {
    const color = event.target.name;
    const isChecked = event.target.checked;

    console.log(filter.color + " " + color + " " + isChecked);
    dispatch({
      type: "SET_FILTER",
      payload: {
        ...filter,
        color: {
          ...filter.color,
          [color]: isChecked,
        },
      },
    });
    filterProducts();
  };

  const { men, women } = filter.gender;
  const handleGenderChange = (event) => {
    const gender = event.target.name;
    const isChecked = event.target.checked;
    dispatch({
      type: "SET_FILTER",
      payload: {
        ...filter,
        gender: {
          ...filter.gender,
          [gender]: isChecked,
        },
      },
    });
    filterProducts();
  };

  const { polo, hoodie, basic } = filter.type;
  const handleTypeChange = (event) => {
    const type = event.target.name;
    const isChecked = event.target.checked;
    dispatch({
      type: "SET_FILTER",
      payload: {
        ...filter,
        type: {
          ...filter.type,
          [type]: isChecked,
        },
      },
    });
    filterProducts();
  };

  const { low, medium, high } = filter.priceRange;
  const handlePriceChange = (event) => {
    const priceRange = event.target.name;
    const isChecked = event.target.checked;
    dispatch({
      type: "SET_FILTER",
      payload: {
        ...filter,
        priceRange: {
          ...filter.priceRange,
          [priceRange]: isChecked,
        },
      },
    });
    filterProducts();
  };

  // filter by color, gender, price, brand
  const filterProducts = () => {
    const { color, gender, type, priceRange } = filter;
    let filteredProducts = [...products];

    if (searchResults.length > 0) {
      filteredProducts = [...searchResults];
    }

    if (color) {
      const selectedColors = Object.keys(filter.color).filter(
        (color) => filter.color[color] === true
      );
      if (selectedColors.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedColors.includes(product.color.toLowerCase())
        );
      }
    }

    if (gender) {
      const selectedGenders = Object.keys(filter.gender).filter(
        (gender) => filter.gender[gender] === true
      );
      if (selectedGenders.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedGenders.includes(product.gender.toLowerCase())
        );
      }
    }

    if (type) {
      const selectedTypes = Object.keys(filter.type).filter(
        (type) => filter.type[type] === true
      );
      if (selectedTypes.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedTypes.includes(product.type.toLowerCase())
        );
      }
    }

    if (priceRange) {
      const selectedPriceRange = Object.keys(filter.priceRange).filter(
        (price) => filter.priceRange[price] === true
      );
      if (selectedPriceRange.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          const productPrice = parseInt(product.price);
          return selectedPriceRange.some((range) => {
            if (range === "low") {
              return productPrice >= 0 && productPrice <= 250;
            }
            if (range === "medium") {
              return productPrice >= 251 && productPrice <= 450;
            }
            if (range === "high") {
              return productPrice >= 451 && productPrice <= 500;
            }
            return true;
          });
        });
      }
    }

    if (searchResults.length > 0) {
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: filteredProducts,
      });
    }

    dispatch({
      type: "SET_FILTERED_PRODUCTS",
      payload: filteredProducts,
    });

    // for no filter
    const allColorFalse = Object.values(color).every((value) => !value);
    const allGenderFalse = Object.values(gender).every((value) => !value);
    const allTypeFalse = Object.values(type).every((value) => !value);
    const allPriceRangeFalse = Object.values(priceRange).every(
      (value) => !value
    );
    if (allColorFalse && allGenderFalse && allTypeFalse && allPriceRangeFalse) {
      dispatch({
        type: "SET_FILTERED_PRODUCTS",
        payload: [],
      });
      console.log("no filter");
    }
    console.log(filteredProducts);
    return filteredProducts;
  };

  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <Box className="item-filter" sx={{ bgcolor: "background.main" }}>
      <Typography variant="h5">Filter by</Typography>
      <Stack>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Color</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={red}
                  onChange={handleColorChange}
                  name="red"
                />
              }
              label="Red"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={blue}
                  onChange={handleColorChange}
                  name="blue"
                />
              }
              label="Blue"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={green}
                  onChange={handleColorChange}
                  name="green"
                />
              }
              label="Green"
            />
          </FormGroup>
        </FormControl>
        <Divider variant="middle" />
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Gender</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={men}
                  onChange={handleGenderChange}
                  name="men"
                />
              }
              label="Men"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={women}
                  onChange={handleGenderChange}
                  name="women"
                />
              }
              label="Women"
            />
          </FormGroup>
        </FormControl>
        <Divider variant="middle" />

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Type</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={polo}
                  onChange={handleTypeChange}
                  name="polo"
                />
              }
              label="Polo"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={hoodie}
                  onChange={handleTypeChange}
                  name="hoodie"
                />
              }
              label="Hoodie"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={basic}
                  onChange={handleTypeChange}
                  name="basic"
                />
              }
              label="Basic"
            />
          </FormGroup>
        </FormControl>
        <Divider variant="middle" />

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Price</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={low}
                  onChange={handlePriceChange}
                  name="low"
                />
              }
              label="0-Rs250"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={medium}
                  onChange={handlePriceChange}
                  name="medium"
                />
              }
              label="Rs251-Rs450"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={high}
                  onChange={handlePriceChange}
                  name="high"
                />
              }
              label="Rs451-Rs500"
            />
          </FormGroup>
        </FormControl>
      </Stack>
    </Box>
  );
};
