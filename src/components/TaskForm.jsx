//Importación de React y hooks necesarios
import React, { useState, useRef, useEffect } from 'react';
//utilizado para realizar solicitudes HTTP a una API externa
import axios from 'axios';
//Permite definir reglas y mensajes personalizados de validación
import SimpleReactValidator from 'simple-react-validator';
//Importación de la instancia de Firestore configurada en Firebase
import { db } from '../firebase/firebaseConfig';
//collection: referencia a una colección de la base de datos
//addDoc: permite agregar un nuevo documento a la colección
import { collection, addDoc } from 'firebase/firestore';

//Componente que permite crear una nueva orden de productos con información del cliente.
//Valida los campos de formulario, verifica que haya productos en el carrito
//realiza una llamada externa para obtener información adicional y guarda la orden en Firestore.
//cart: arreglo de productos agregados al carrito
//setCart: función para actualizar el carrito
function TaskForm({ cart, setCart }) {
    //Estado para los datos del formulario
    const [task, setTask] = useState({ title: '', email:'', address:'', description: '', imageUrl:''});
    //Estado para mensajes de error relacionados con el carrito
    const [cartError, setCartError] = useState('');
     //Estado vacío usado para forzar re-render al mostrar errores de validación
    const [, forceUpdate] = useState();
    //Referencia para el validador de formularios
    const validator = useRef(new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio',
                email: 'Correo no válido',
                min: 'Mínimo :min caracteres'
            }}));
    //Maneja cambios en los inputs del formulario
    //Actualiza el estado `task` y muestra mensajes de validación
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value});
        validator.current.showMessageFor(name);
    };
    // Limpia el mensaje de error del carrito si se agregan productos
    useEffect(() => {if (cart.length > 0) {setCartError('');}}, [cart]);
    //Maneja el envío del formulario, valida los campos
    //Verifica que haya productos en el carrito, calcula el resumen y total del carrito
    //Obtiene información adicional desde un endpoint externo, guarda la orden en Firestore
    //Limpia formulario y carrito al finalizar
    const handleSubmit = async (e) => {e.preventDefault();
        //Validación de campos
        if (!validator.current.allValid()) {validator.current.showMessages();
        forceUpdate({});
        return;
        }
        //Verifica que haya al menos un producto en el carrito
        if (cart.length === 0) {
        setCartError('Debe agregar al menos un producto al carrito');
        return;
        }
        //Crea resumen de productos con cantidad
        try{
            const cartSummary = cart.reduce((items, item) => {
                const found = items.find(p => p.id === item.id);
                if (found) {
                    found.quantity += 1;
                } else {
                  items.push({id: item.id, name: item.name,
                    price: item.price, quantity: 1});
                }
                return items;
            }, []);
            //Calcula total del carrito
            const total = cartSummary.reduce(
                (sum, item) => sum + item.price * item.quantity, 0
            );
            //Llamada a API externa para obtener información adicional
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
            //Crea objeto de nueva orden
            const newOrder = { ...task, items: cartSummary, total, additionalInfo: response.data.title,
                createdAt: new Date()
            };
            //Guarda orden en Firestore
            await addDoc(collection(db, 'Orden'), newOrder);
            //Limpia formulario y carrito
            setTask({title: '', email: '', address: '', description: '', imageUrl: ''});
            setCart([]);
            //Reinicia validador
            validator.current = new SimpleReactValidator({
                messages: {
                    required: 'Este campo es obligatorio',
                    email: 'Correo no válido',
                    min: 'Mínimo :min caracteres'
                }
            });
            //Mensaje en pantalla en caso que se guardara correctamente
            alert('Orden guardada correctamente');
        }   catch (error) {
            console.error('Error al agregar tarea:', error);
        }
    };
    //Render del formulario de creación de orden
    return (
        <form onSubmit={handleSubmit} className="card p-3 mb-3">
            <h5 className="mb-3">Nueva Orden</h5>
            {/* Input para el nombre del cliente */}
            <input 
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Nombre Cliente"
                className="form-control mb-2"
            /> 
            {/*validador*/}
            {validator.current.message('title', task.title, 'required|min:3')}
            {/* Input para correo electrónico */}
            <input 
                type="text"
                name="email"
                value={task.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                className="form-control mb-2"
            />  
            {/*validador*/}
            {validator.current.message('email', task.email, 'required|email')}
            {/* Input para dirección */}
            <input 
                type="text"
                name="address"
                value={task.address}
                onChange={handleChange}
                placeholder="Dirección"
                className="form-control mb-2"
            />
            {/*validador*/}
            {validator.current.message('address', task.address, 'required|min:5')}
            {/* Textarea para descripción de la orden */}
            <textarea 
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Descripción de la orden"
                className="form-control mb-2"
            />
            {/*validador*/}
            {validator.current.message('description', task.description, 'required|min:5')}
            {/* Input opcional para URL de imagen */}
            <input
                type="text"
                name="imageUrl"
                value={task.imageUrl}
                onChange={handleChange}
                placeholder="URL de la foto del cliente (opcional)"
                className="form-control mb-3"
            />
            {/* Botón de envío */}
            <button type="submit" className="btn btn-success mb-3">
                Agregar Orden
            </button>
            {/* Muestra error si no hay productos en el carrito */}
            {cartError && (
                <p className="text-danger mt-2">{cartError}</p>
            )}
        </form>
    );
}
//Exportamos el componente para usarlo en otras partes de la aplicación
export default TaskForm;