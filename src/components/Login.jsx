//Hook de React para manejar estados locales dentro del componente
import { useState } from "react";
//Importación de la instancia de autenticación configurada en Firebase
import { auth } from "../firebase/firebaseConfig";
//Funciones de Firebase Authentication
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

//Componente para manejar autenticación de usuarios
function Login() {
  //Estados locales
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //Función para registrar un nuevo usuario en Firebase
  const register = async () => {
    try {
      //Llamada a Firebase para crear un usuario con email y contraseña
      await createUserWithEmailAndPassword(auth, email, password);
      //Limpiamos el error si todo salió bien
      setError('');
      //Mensaje de confirmación
      alert('Usuario registrado');
    } catch (err) {
      //Mostramos el mensaje de error si ocurre algo
      setError(err.message);
    }
  };
  //Función para iniciar sesión de un usuario existente
  const login = async () => {
    try {
      //Llamada a Firebase para iniciar sesión con email y contraseña
      await signInWithEmailAndPassword(auth, email, password);
      //Limpiamos el error si todo salió bien
      setError('');
      //Mensaje de confirmación
      alert('Sesión iniciada');
    } catch (err) {
      //Mostramos el mensaje de error si ocurre algos
      setError(err.message);
    }
  };
  //Renderizamos el formulario de autenticación
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center mb-3">Autenticación</h3>
              {/* Input para correo electrónico */}
              <input
                type="text"
                className="form-control mb-3" 
                placeholder="Correo"
                value={email}
                //Se actualiza el estado email cada vez que el usuario escribe
                onChange={e => setEmail(e.target.value.trim())}
              />
              {/* Input para contraseña */}
              <input
                type="password"
                className="form-control mb-3" 
                placeholder="Contraseña"
                value={password}
                //Se actualiza el estado password cada vez que el usuario escribe
                onChange={e => setPassword(e.target.value.trim())}
              />
              {/* mensaje de error en caso de... */}
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}
              {/* Boton de iniciar sesión*/}
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={login}>
                  Ingresar
                </button>
                {/* Boton para registrarse */}
                <button className="btn btn-success mb-3" onClick={register}>
                  Registrarse
                </button>       
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//Exportamos el componente para usarlo en otras partes de la aplicación
export default Login;