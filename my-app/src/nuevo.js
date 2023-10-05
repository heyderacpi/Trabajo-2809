import React, { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "./AppContext";
import ShoppingCart from "./ShoppingCart";
function Stock() {
  const { state, dispatch } = useAppContext();
  const [categories, setCategories] = useState([]);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await fetch("https://fakestoreapi.com/products");
        const productsData = await productsResponse.json();
        dispatch({ type: "SET_PRODUCTS", payload: productsData });
        const userResponse = await fetch("https://fakestoreapi.com/users/1");
        const userData = await userResponse.json();
        dispatch({ type: "SET_USER", payload: userData });
      } catch (err) {
        console.error("Error fetching data", err);
        dispatch({ type: "SET_USER", payload: null });
      }
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const uniqueCategories = [...new Set(state.products.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [state.products]);
  const toggleCategoryPopup = () => {
    setShowCategoryPopup(!showCategoryPopup);
  };
  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryPopup(false); // Oculta el menú de categorías al seleccionar una categoría
  };
  const resetCategoryFilter = () => {
    setSelectedCategory("");
  };
  const filteredProducts = selectedCategory
    ? state.products.filter(product => product.category === selectedCategory)
    : state.products;
  return (
    <div className="container">
      <header className="header">
        <h1>H.L.A.P SHOP</h1>
        <div className="cart-button-container">
          <button className="cart-button" onClick={() => dispatch({ type: "TOGGLE_CART" })}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
        <div className="categories-container">
          <button className="categories-button" onClick={toggleCategoryPopup}>
            Categorías
          </button>
          {showCategoryPopup && (
            <div className="category-popup">
              <button className="category-button" onClick={resetCategoryFilter}>
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className="category-button"
                  onClick={() => filterProductsByCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
        {state.user && state.user.name && state.user.name.firstname && state.user.name.lastname && (
          <div
            className="initials-circle"
            onClick={() => dispatch({ type: "TOGGLE_USER_INFO" })}
            onMouseEnter={() => dispatch({ type: "TOGGLE_USER_INFO" })}
            onMouseLeave={() => dispatch({ type: "TOGGLE_USER_INFO" })}
          >
            <span>
              {state.user.name.firstname.charAt(0) + state.user.name.lastname.charAt(0)}
            </span>
          </div>
        )}
      </header>
      <div className="content">
        {state.selectedProduct ? (
          <div className="product-page">
            <div className="product-image">
              <img
                src={state.selectedProduct.image}
                alt={state.selectedProduct.title}
                className="small-image"
              />
            </div>
            <div className="product-info">
              <h2>{state.selectedProduct.title}</h2>
              <p>{state.selectedProduct.description}</p>
              <p>${state.selectedProduct.price}</p>
              <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: state.selectedProduct })}>
                Agregar al carrito
              </button>
            </div>
          </div>
        ) : (
          <div className="product-list">
            {filteredProducts.slice(0, state.showAllProducts ? undefined : 9).map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => dispatch({ type: "SET_SELECTED_PRODUCT", payload: product })}
              >
                <h2>
                  <i>{product.title}</i>
                </h2>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-list-image"
                />
              </div>
            ))}
          </div>
        )}
        {state.showUserInfo && (
          <div className="user-info">
            <p>Nombre: {state.user.name.firstname} {state.user.name.lastname}</p>
            <p>Email: {state.user.email}</p>
            <p>Teléfono: {state.user.phone}</p>
            <p>Dirección: {state.user.address.street}, {state.user.address.city}</p>
          </div>
        )}
      </div>
      <div className="button-container">
        {state.selectedProduct ? (
          <button onClick={() => dispatch({ type: "SET_SELECTED_PRODUCT", payload: null })} className="button">
            Volver a la lista
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: "TOGGLE_SHOW_ALL_PRODUCTS" })}
            className="button"
          >
            {state.showAllProducts ? "Ver menos" : "Ver más"}
          </button>
        )}
      </div>
      <ShoppingCart />
    </div>
  );
}
export default Stock;



