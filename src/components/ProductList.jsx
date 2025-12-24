//Importación de React para la creación y renderizado de componentes
import React, { useState } from "react";
//Importación encargada de renderizar cada producto individual
import ProductItem from "./ProductItem";

//Componente que muestra una lista de productos y un carrito de compras
//Permite agregar productos al carrito y removerlos, actualizando el stock disponible
//cart: arreglo que contiene los productos actualmente en el carrito
//setCart: función para actualizar el carrito
function ProductList({ cart, setCart }) {
  //Estado local para los productos disponibles
  const [products, setProducts] = useState([
    { id: 1, name: "Mouse", price: 5000, stock: 2 },
    { id: 2, name: "Teclado", price: 10000, stock: 1 },
    { id: 3, name: "Audífonos", price: 15000, stock: 3 }
  ]);
  //Función para agregar un producto al carrito
  //Verifica que haya stock disponible
  //Actualiza el carrito y disminuye el stock del producto
  const addToCart = (product) => {
    if (product.stock <= 0) return;
    //Agrega el producto al carrito
    setCart([...cart, product]);
    //Actualiza el stock del producto en la lista
    setProducts(products.map(p =>
      p.id === product.id
        ? { ...p, stock: p.stock - 1 }
        : p));
  };
   //Función para remover un producto del carrito
   //Recibe el índice del producto a remover
   //Actualiza el carrito y vuelve a aumentar el stock del producto 
  const removeFromCart = (indexToRemove) => {
    const productToRemove = cart[indexToRemove];
    //Filtra el carrito para eliminar el producto
    setCart(cart.filter((_, index) => index !== indexToRemove));
    //Aumenta el stock del producto en la lista
    setProducts(products.map(p =>
      p.id === productToRemove.id
        ? { ...p, stock: p.stock + 1 }
        : p));
    };
  //Renderizamos la lista de productos y el carrito
  return (
    <div className="mt-3">
      <h2>Productos</h2>
      <div className="row">
        {/* Renderizamos cada producto usando ProductItem */}
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-3">
            <ProductItem
              product={product}
              //Pasamos la función para agregar al carrito
              onAdd={addToCart}/>
          </div>))}
      </div>
      {/* Renderizamos el carrito si tiene productos */}
      {cart.length > 0 && (
        <div className="mt-4">
          <h2>Carrito</h2>
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {/* Precio formateado */}
                {item.name}: ${item.price.toLocaleString('es-CL')}
                <button
                  className="btn btn-danger btn-md"
                  //Función para remover del carrito
                  onClick={() => removeFromCart(index)}>
                  Quitar
                </button>
              </li>))}
          </ul>
        </div>)}
    </div>
  );
}
//Exportamos el componente para usarlo en otras partes de la aplicación
export default ProductList;