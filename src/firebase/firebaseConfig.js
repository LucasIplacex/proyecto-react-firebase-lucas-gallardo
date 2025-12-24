//Importa las funciones necesarias para inicializar Firebase
import { initializeApp } from 'firebase/app';
//Importa Firestore para el manejo de base de datos
import { getFirestore } from 'firebase/firestore';
//Importa Firebase Authentication para autenticación de usuarios
import { getAuth } from 'firebase/auth';

//Configuración de Firebase
//Contiene las credenciales y datos del proyecto Firebase
//Estos datos son proporcionados por la consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBougMMu3IZOsf043kaN_wLD9MbZB2yT7k",
  authDomain: "caso1-559e4.firebaseapp.com",
  projectId: "caso1-559e4",
  storageBucket: "caso1-559e4.firebasestorage.app",
  messagingSenderId: "1064571253076",
  appId: "1:1064571253076:web:73b67dd4c077630d9258c1"
};
//Inicializa la aplicación Firebase con la configuración definida
const app = initializeApp(firebaseConfig);

//Inicializa Firestore y lo asocia a la aplicación Firebase
const db = getFirestore(app);

//Inicializa el sistema de autenticación de Firebase
const auth = getAuth(app);

//Exporta las instancias para ser utilizadas en otros archivos del proyecto
export { db, auth };