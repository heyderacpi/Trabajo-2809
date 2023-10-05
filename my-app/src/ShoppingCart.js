import React from "react";
import { useAppContext } from "./AppContext";

function ShoppingCart() {
  const { state, dispatch } = useAppContext();

  if (!state.isCartOpen) return null;

  const removeFromCart = (productToRemove) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productToRemove });
  };

  const calculateTotal = (cart) => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className="shopping-cart">
      <h2>Carrito de Compras</h2>
      <ul>
        {state.cart.map((product) => (
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
        <p>Total: ${calculateTotal(state.cart).toFixed(2)}</p>
      </div>
      <button onClick={() => dispatch({ type: "TOGGLE_CART" })}>Cerrar Carrito</button>
    </div>
  );
}

export default ShoppingCart;
