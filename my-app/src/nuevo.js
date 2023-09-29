import React, { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function ShoppingCart({ cart, isOpen, onClose, removeFromCart, calculateTotal }) {
  if (!isOpen) return null;

  return (
    <div className="shopping-cart">
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map((product) => (
          <li key={product.id} className="cart-item">
            <div className="cart-item-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="cart-item-info">
              <p>{product.title}</p>
              <p className="price">${product.price}</p>
            </div>
            <button onClick={() => removeFromCart(product)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total: ${calculateTotal(cart).toFixed(2)}</p>
      </div>
      <button onClick={onClose}>Cerrar Carrito</button>
    </div>
  );
}

function Stock() {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await fetch("https://fakestoreapi.com/products");
        const productsData = await productsResponse.json();
        setProducts(productsData);

        const userResponse = await fetch("https://fakestoreapi.com/users/1");
        const userData = await userResponse.json();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching data", err);
        setUser(null);
      }
    }
    fetchData();
  }, []);

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  const openProductInfo = (product) => {
    setSelectedProduct(product);
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productToRemove) => {
    const updatedCart = cart.filter((product) => product.id !== productToRemove.id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeAllFromCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const showCart = () => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCart(cartData);
    }
    setIsCartOpen(true);
  };
  const calculateTotal = (cart) => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Mi Tienda Online</h1>
        <div className="cart-button-container">
          <button className="cart-button" onClick={showCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
        {user && user.name && user.name.firstname && user.name.lastname && (
          <div
            className="initials-circle"
            onClick={toggleUserInfo}
            onMouseEnter={() => setShowUserInfo(true)}
            onMouseLeave={() => setShowUserInfo(false)}
          >
            <span>
              {user.name.firstname.charAt(0) + user.name.lastname.charAt(0)}
            </span>
          </div>
        )}
      </header>
      <div className="content">
        {selectedProduct ? (
          <div className="product-page">
            <div className="product-image">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="small-image"
              />
            </div>
            <div className="product-info">
              <h2>{selectedProduct.title}</h2>
              <p>{selectedProduct.description}</p>
              <p>${selectedProduct.price}</p>
              <button onClick={() => addToCart(selectedProduct)}>Agregar al carrito</button>
            </div>
          </div>
        ) : (
          <div className="product-list">
            {products.slice(0, showAllProducts ? undefined : 9).map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => openProductInfo(product)}
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
        {showUserInfo && (
          <div className="user-info">
            <p>Nombre: {user.name.firstname} {user.name.lastname}</p>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
            <p>Dirección: {user.address.street}, {user.address.city}</p>
          </div>
        )}
      </div>

      <div className="button-container">
        {selectedProduct ? (
          <button onClick={() => setSelectedProduct(null)} className="button">
            Volver a la lista
          </button>
        ) : (
          <button
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="button"
          >
            {showAllProducts ? "Ver menos" : "Ver más"}
          </button>
        )}
      </div>
      <ShoppingCart
        cart={cart}
        isOpen={isCartOpen}
        onClose={toggleCart}
        removeFromCart={removeFromCart}
        calculateTotal={calculateTotal}
        removeAllFromCart={removeAllFromCart}
      />
    </div>
  );
}

export default Stock;



