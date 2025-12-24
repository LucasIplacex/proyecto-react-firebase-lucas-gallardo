// Importación de React para la creación y renderizado de componentes
import React from "react";

//Componente que muestra la información de un producto individual y permite agregarlo al carrito
//product: objeto que contiene los datos del producto (name, price, stock)
//onAdd: función que se ejecuta al hacer clic en "Agregar al carrito"
function ProductItem({ product, onAdd }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        {/* Nombre del producto */}
        <h5 className="mb-2"><strong>{product.name}</strong></h5>
        {/* Precio del producto */}
        <span className="d-block p-1 mb-1 bg-light border rounded">
          Precio: ${product.price.toLocaleString('es-CL')}
        </span>
        {/* Stock disponible */}
        <span className="d-block p-1 mb-2 bg-light border rounded">
          Stock: {product.stock}
        </span>
        {/* Botón para agregar al carrito */}
        <button
          className="btn btn-success mt-auto"
          //Deshabilita el botón si no hay stock
          disabled={product.stock <= 0} 
          //Llama a la función onAdd pasando el producto
          onClick={() => onAdd(product)}>
          {/* Cambia el texto según disponibilidad */}
          {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
        </button>
      </div>
    </div>
  );
}
//Exportamos el componente para usarlo en otras partes de la aplicación
export default ProductItem;