//Importación de React para la creación y renderizado de componentes
import React from "react";

//Componente que muestra la información de una orden específica, incluyendo datos del cliente
//productos del carrito y total de la orden
//Permite eliminar la orden mediante un botón
//task: objeto que representa la orden con los siguientes campos:title, email, address, description,
//imageUrl, items, total
//onDelete: función para eliminar la orden, recibe el id de la orden
function TaskItem({ task, onDelete }) {
  return (
    //React.Fragment permite agrupar múltiples elementos sin agregar nodos extra al DOM 
    <React.Fragment>
      {/* Contenedor visual de la orden usando Bootstrap */}
      <li className="list-unstyled">
        <div className="card shadow-sm mb-3">
          <div className="card-body">
            {/* Datos principales del cliente */}
            <p className="card-title"> <strong>Nombre:</strong> {task.title}</p>
            <p className="mb-1"> <strong>Email:</strong> {task.email}</p>
            <p className="mb-1"><strong>Dirección:</strong> {task.address}</p>
            <p className="mb-1"><strong>Descripción:</strong> {task.description}</p>

            {/* Muestra imagen del cliente si existe */}
            {task.imageUrl && (
              <div className="mb-2">
                <p><strong>Imagen de cliente:</strong></p>
                <img
                  src={task.imageUrl}
                  alt="Imagen de la orden"
                  className="img-fluid"
                  style={{ maxHeight: '200px' }}
                />
              </div>
            )}
            {/* Lista de productos incluidos en la orden */}
            <p className="mb-1"><strong>Productos:</strong></p>
            <ul className="list-unstyled">
              {/* Se utiliza map() para recorrer los productos de la orden */}
              {task.items?.map((item, index) => (
                <li key={index} className="list-group-item p-1">
                    {item.name}: {item.quantity} = ${item.price.toLocaleString('es-CL')}
                </li>
              ))}
            </ul>
            {/* Formatea el total de la orden según formato chileno */}
            <p className="mb-1"><strong>Total:</strong> ${task.total.toLocaleString('es-CL')}</p>
            {/* Botón para eliminar la orden */}
            <div className="d-flex justify-content-end mt-2">
              {/* Llama a la función onDelete con el id de la orden */}
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
}
//Exportamos el componente para usarlo en otras partes de la aplicación
export default TaskItem;