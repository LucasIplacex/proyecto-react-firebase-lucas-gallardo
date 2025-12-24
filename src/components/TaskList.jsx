//Importación de React y hooks necesarios
import React, { useEffect, useState } from 'react';
//Importación encargada de mostrar una orden individual
import TaskItem from '../components/TaskItem';
//Importación de la instancia de Firestore configurada en Firebase
import { db } from '../firebase/firebaseConfig';
//collection: referencia a una colección de la base de datos
//onSnapshot: escucha cambios en tiempo real en la colección
//deleteDoc: elimina un documento específico
//doc: referencia a un documento por su id
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

//Componente que Muestra el listado de órdenes almacenadas en Firestore
//Escucha los cambios en tiempo real y permite eliminar órdenes
function TaskList(){
    //Estado para almacenar las órdenes obtenidas desde Firestore
    const [tasks, setTasks] = useState([]);
    //useEffect se ejecuta una vez al montar el componente
    //Escucha cambios en la colección "Orden" de Firestore en tiempo real
    useEffect(() => {
        //Suscripción a cambios en la colección
        const unsubscribe = onSnapshot(collection(db, "Orden"), (snapshot) => {
            const tasksData = snapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data() }));
            setTasks(tasksData);
        });
        //Cancela la suscripción cuando el componente se desmonta
        return () => unsubscribe(); }, []);
    //Elimina una orden desde Firestore
    const handleDelete = async (taskId) => {
        try {
            await deleteDoc(doc(db, "Orden", taskId));
        } catch (error) {
            console.error('error al eliminar orden:', error);
        }
    };
    //Mensaje si no existen órdenes registradas
    if (tasks.length === 0) {
    return <p>No hay órdenes registradas</p>;
    }
  //Renderizado de la lista de órdenes
  return (
    <div className="container mt-3">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className="mb-3"
          style={{ maxWidth: '600px' }}>
          {/* Componente que muestra el detalle de la orden */}
          <TaskItem task={task} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
}
//Exportamos el componente para usarlo en otras partes de la aplicación
export default TaskList;


