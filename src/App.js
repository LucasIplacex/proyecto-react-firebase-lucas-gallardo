import './App.css';
//Importación de React y hooks necesarios
import React, { useState, useEffect } from 'react';
//Importación de componentes principales de la aplicación
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProductList from './components/ProductList';
import Login from './components/Login';
//Importación de Firebase Authentication
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

//Componente principal de la aplicación
//Gestiona la autenticación del usuario, la navegación interna
//y la visualización de productos, carrito y órdenes
function ProjectManagementApp() {
  //Estados para mostrar u ocultar secciones de la aplicación
  const [showProducts, setShowProducts] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  //Estado para el carrito de compras
  const [cart, setCart] = useState([]);
  //Estado para el usuario autenticado
  const [user, setUser] = useState(null);

  //Escucha los cambios en el estado de autenticación de Firebase
  //Si el usuario inicia o cierra sesión, el estado se actualiza automáticamente
  useEffect(() => {
    //Se suscribe a los cambios de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    //Cancela la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);
  //Si no hay un usuario autenticado, se muestra el componente Login
  if (!user) {
    return <Login />;
  }
  //Render principal de la aplicación
  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        {/* Encabezado con información del usuario autenticado */}
        <div className="card mb-4">
          <div className="card-body d-flex justify-content-between align-items-center">
            <h4>Bienvenido: {user.email}</h4>
            {/* Botón para cerrar sesión */}
            <button
              className="btn btn-danger btn-md"
              onClick={() => signOut(auth)}>
              Cerrar sesión
            </button>
          </div>
        </div>
        {/* Sección de Tienda */}
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="mb-3">Tienda</h3>
            <button
              className="btn btn-primary mb-3"
              onClick={() => setShowProducts(!showProducts)}>
              {showProducts ? 'Ocultar Productos' : 'Mostrar Productos'}
            </button>
            {/* Lista de productos */}
            {showProducts && (
              <ProductList cart={cart} setCart={setCart} />
            )}
          </div>
        </div>
        {/* Sección de Gestión de Órdenes */}
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="mb-3">Gestión de Órdenes</h3>
            {/* Botón para mostrar/ocultar formulario */}
            <button
              className="btn btn-success mb-3"
              onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Ocultar Formulario' : 'Agregar Orden'}
            </button>
            {/* Formulario para crear una nueva orden */}
            {showForm && (
              <div className="mb-4">
                <TaskForm cart={cart} setCart={setCart} />
              </div>
            )}
            <br/>
            {/* Botón para mostrar/ocultar listado de órdenes */}
            <button
              className="btn btn-primary mb-3"
              onClick={() => setShowList(!showList)}>
              {showList ? 'Ocultar Órdenes' : 'Mostrar Órdenes'}
            </button>
            {/* Listado de órdenes */}
            {showList && (
              <div className="mt-3">
                <TaskList />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
//Exportamos el componente principal
export default ProjectManagementApp;