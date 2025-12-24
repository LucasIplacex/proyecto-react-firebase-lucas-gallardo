README – Project Management App

1. Descripción general del proyecto

Este proyecto corresponde a una aplicación desarrollada en React que permite gestionar productos, un carrito de compras y órdenes de clientes. La aplicación está pensada como un sistema simple de gestión, integrando autenticación de usuarios, persistencia de datos y una versión móvil instalable en dispositivos Android.

La aplicación fue desarrollada utilizando tecnologías web modernas y servicios en la nube, permitiendo un flujo de trabajo completo desde el inicio de sesión hasta la creación y administración de órdenes.

2. Objetivo del proyecto

El objetivo principal del proyecto es aplicar los conocimientos adquiridos en desarrollo de aplicaciones con React, uso de Firebase como backend y empaquetado de aplicaciones web en formato móvil mediante Cordova.

Se busca demostrar el manejo de:
- Componentes funcionales en React
- Manejo de estados
- Validación de formularios
- Autenticación de usuarios
- Persistencia de datos en la nube
- Generación de un APK firmado

3. Tecnologías utilizadas

La aplicación fue desarrollada utilizando las siguientes tecnologías:

- React como framework principal para la construcción de la interfaz de usuario.
- Firebase Authentication para el manejo de inicio y cierre de sesión de usuarios.
- Firebase Firestore como base de datos en tiempo real para el almacenamiento de órdenes.
- Bootstrap para el diseño visual y responsivo de la aplicación.
- Axios para el consumo de una API externa.
- react-simple-validator para la validación de campos de formularios.
- Cordova para la generación de la aplicación móvil.
- Android APK firmado para su instalación directa en dispositivos móviles.

4. Funcionamiento general de la aplicación

Al iniciar la aplicación por primera vez, el usuario deberá registrarse seleccionando la opción correspondiente, donde se le solicitará ingresar un correo electrónico y una contraseña. Una vez completado el proceso de registro y autenticación, el usuario será redirigido al panel principal de la aplicación.

Cuando el usuario ya se encuentra autenticado, la aplicación recuerda su sesión activa, por lo que en usos posteriores accederá directamente al panel principal sin necesidad de volver a iniciar sesión. En este panel, el usuario puede visualizar su correo electrónico y tiene la opción de cerrar sesión en cualquier momento.

En caso de que el usuario cierre sesión, la aplicación lo redirigirá nuevamente a la pantalla de inicio de sesión, donde deberá autenticarse para volver a acceder al sistema.

En la tienda, el usuario puede visualizar una lista de productos disponibles, cada uno con su precio y stock. Los productos pueden ser agregados al carrito siempre que exista stock disponible. El stock se actualiza dinámicamente a medida que se agregan o eliminan productos del carrito.

En la sección de gestión de órdenes, el usuario puede completar un formulario con los datos del cliente, tales como nombre, correo electrónico, dirección, descripción de la orden y de forma opcional, el usuario puede ingresar una fotografía mediante una URL. El formulario cuenta con validaciones que aseguran que los datos ingresados sean correctos antes de permitir el envío.

Para poder registrar una orden, el usuario debe tener al menos un producto agregado al carrito. Una vez validada la información, la orden es almacenada en Firebase Firestore junto con el detalle de los productos y el total de la compra.

Las órdenes registradas pueden ser visualizadas en una lista que se actualiza en tiempo real gracias a la integración con Firestore. Además, cada orden puede ser eliminada desde la interfaz de usuario.

5. Persistencia de datos

Los datos de las órdenes son almacenados en Firebase Firestore, lo que permite que la información se mantenga disponible incluso al recargar la página o acceder desde otro dispositivo.

El uso de Firestore permite la sincronización en tiempo real, por lo que los cambios se reflejan automáticamente en la interfaz sin necesidad de recargar la aplicación.

6. Validaciones y control de errores

La aplicación cuenta con validaciones en los formularios para asegurar la correcta entrada de datos por parte del usuario. Los campos obligatorios, formato de correo electrónico y longitud mínima de texto son verificados antes de enviar la información.

Además, se controla que el carrito no esté vacío antes de permitir la creación de una orden. En caso de error, se muestran mensajes claros al usuario.

7. Versión móvil con Cordova
El proyecto incluye una carpeta denominada “cordova”, la cual contiene la versión móvil de la aplicación. Esta versión fue generada utilizando una serie de comandos específicos, tales como mkdir cordova, cd cordova, cordova create ., cordova platform add android, cp -R ../build/* www/ y cordova build android. permitiendo convertir la aplicación web en una aplicación móvil híbrida.

Dentro de esta carpeta se incluye un APK firmado, el cual puede ser instalado directamente en dispositivos Android sin necesidad de compilación adicional.

8. Consideraciones finales

Este proyecto permite integrar múltiples tecnologías en una sola aplicación funcional, combinando desarrollo web, servicios en la nube y desarrollo móvil.

La aplicación cumple con los objetivos propuestos, demostrando el uso correcto de React mediante la creación de componentes reutilizables, el manejo adecuado del estado y la comunicación entre componentes padre e hijo utilizando props y callbacks. Se implementa el método map() para renderizar dinámicamente la lista de productos y se gestiona el carrito de compras a través del estado de la aplicación, asegurando la actualización correcta de los datos.

Además, se desarrolla un formulario funcional en React que incorpora validaciones utilizando react-simple-validator, permitiendo asegurar la correcta entrada de datos por parte del usuario. La aplicación se encuentra conectada a Firebase, utilizando Firestore Database para la persistencia de la información ingresada en el formulario.

En el aspecto visual, los formularios y componentes fueron estilizados utilizando Bootstrap, logrando una interfaz clara y responsiva. Asimismo, se implementa Firebase Authentication para el manejo de usuarios y Firebase Storage para el almacenamiento de recursos, como imágenes opcionales ingresadas mediante URL.

Finalmente, el proyecto es preparado para su despliegue móvil mediante la configuración de Android Studio, Gradle y Cordova, permitiendo convertir la aplicación web en una aplicación móvil híbrida. El proceso culmina con la exportación, firma y prueba del archivo APK, el cual se encuentra incluido dentro de la carpeta cordova, listo para su instalación en dispositivos Android.

9. Formas de ejecutar la aplicación

La aplicación puede ejecutarse de las siguientes maneras:

Ejecución local:
Se debe abrir Visual Studio Code, seleccionar el proyecto y, desde la terminal ubicada en la raíz del mismo, ejecutar el comando npm start. Esto abrirá automáticamente el navegador web, donde se podrá utilizar la aplicación.

Ejecución en línea:
La aplicación se encuentra desplegada en Netlify y puede ser accedida mediante el siguiente enlace:
https://gestionlucasgallardoexamen.netlify.app/, lo que permite su uso sin necesidad de instalar Visual Studio Code ni ejecutar comandos adicionales.

Ejecución en dispositivo móvil:
Es posible instalar la aplicación en un dispositivo Android mediante el archivo APK firmado, el cual se encuentra en la ruta cordova/platforms/android/app/release, con el nombre app-release.apk.

10. Respaldo de la información

El código fuente completo del proyecto se encuentra almacenado en un repositorio público de GitHub, disponible en el siguiente enlace: https://github.com/LucasIplacex/proyecto-react-firebase-lucas-gallardo

11. Autor del proyecto

Lucas Benjamin Gallardo Krause
