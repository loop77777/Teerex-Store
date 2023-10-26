import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  searchResults: [],
  cart: [],
  filter: {
    color: {
      red: false,
      blue: false,
      green: false,
    },
    gender: {
      men: false,
      women: false,
    },
    type: {
      polo: false,
      hoodie: false,
      basic: false,
    },
    priceRange: {
      low: false,
      medium: false,
      high: false,
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SET_FILTERED_PRODUCTS":
      return {
        ...state,
        filteredProducts: action.payload,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload], // this for not to modify the original state.
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;
