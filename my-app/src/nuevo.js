import React, { useState, useEffect } from "react";

function Stock() {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));

    fetch("https://fakestoreapi.com/users/1")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => {
        console.error("Error al obtener el usuario:", error);
        setUser(null);
      });
  }, []);

  return (
    <div>
      <div className="product-list">
        {showAllProducts
          ? products.map((product, index) => (
              <div key={index} className="product-card">
                <h2>
                  <i>{product.title}</i> por {product.price}
                </h2>
                <img width="150" src={product.image} alt={product.category} />
                <p>{product.description}</p>
              </div>
            ))
          : products.slice(0, 9).map((product, index) => (
              <div key={index} className="product-card">
                <h2>
                  <i>{product.title}</i> por {product.price}$
                </h2>
                <img width="150" src={product.image} alt={product.category} />
                <p>{product.description}</p>
              </div>
            ))}
      </div>

      {user && user.name && user.name.firstname && user.name.lastname && (
        <div
          className="initials-circle"
          onClick={() => setShowUserInfo(!showUserInfo)}
          onMouseEnter={() => setShowUserInfo(true)} 
          onMouseLeave={() => setShowUserInfo(false)} 
        >
          <span>{user.name.firstname.charAt(0) + user.name.lastname.charAt(0)}</span>
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

      <div className="button-container">
        <button
          onClick={() => setShowAllProducts(!showAllProducts)}
          className={showAllProducts ? "button" : "button"}
        >
          {showAllProducts ? "Ver menos" : "Ver más"}
        </button>
      </div>
    </div>
  );
}

export default Stock;
