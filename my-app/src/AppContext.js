import React, { createContext, useContext, useReducer } from "react";

const actions = {
  SET_PRODUCTS: "SET_PRODUCTS",
  SET_USER: "SET_USER",
  TOGGLE_USER_INFO: "TOGGLE_USER_INFO",
  SET_SELECTED_PRODUCT: "SET_SELECTED_PRODUCT",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  TOGGLE_CART: "TOGGLE_CART",
  TOGGLE_SHOW_ALL_PRODUCTS: "TOGGLE_SHOW_ALL_PRODUCTS",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case actions.SET_USER:
      return { ...state, user: action.payload };
    case actions.TOGGLE_USER_INFO:
      return { ...state, showUserInfo: !state.showUserInfo };
    case actions.SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    case actions.ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case actions.REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter((product) => product.id !== action.payload.id) };
    case actions.TOGGLE_CART:
      return { ...state, isCartOpen: !state.isCartOpen };
    case actions.TOGGLE_SHOW_ALL_PRODUCTS:
      return { ...state, showAllProducts: !state.showAllProducts };
    default:
      return state;
  }
};

const initialState = {
  products: [],
  user: null,
  showUserInfo: false,
  selectedProduct: null,
  cart: [],
  isCartOpen: false,
  showAllProducts: true,
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
