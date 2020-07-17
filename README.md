# Proyecto creado para postular a Frenon
 
##### Qué es esto.
- Simple servidor de Node.js, hecho utilizando Express, utilizando Sequelize como ORM se conecta a una base de datos de PostgresQL, tiene unos pocos tests creados en Jest que revisan que la coneccion a la base de datos esta funcional. 
- Implementa protocolo REST para "Crear, Leer, Actualizar y Borrar" (CRUD en inglés), una vez hecho un usuario se entrega un token jwt, si bien un middleware para autenticar está implementado en los archivos, todas las rutas están disponibles en este momento, sin validación.
- La aplicación se encuentra Dockerizada.
- la aplicación esta en una pipeline de Gitlab donde se revisa el linting.
 
##### Cómo Ejecutarla.
 
 - Una vez clonado el proyecto en una máquina con docker instalado, ejecute *$ docker-compose build* en la carpeta raíz.
 - Una vez completada la operación ejecute *$ docker-compose up*
 - Una vez el paso anterior haya finalizado, abra una nueva consola y ejecute *docker ps* ahi busque el nombre exacto del contenedor donde corre la aplicacion de nodejs, el nombre debería incluir "frenontestback"
 - Cuando tenga el nombre ejecute *$docker exec -ti "nombre del paso anterior" sh* eso creará una consola interactiva dentro del contenedor del proyecto de node.
 - Ejecute *npm run ready* para inicializar la base de datos y poblar la base de datos con 3 usuarios.
 - Ahora la aplicación de node debería estar disponible en http://localhost3001/api/users,
 - También es posible correr los tests que están contenidos en la aplicacion desde esta consola, solo ejecute *npm run test*
 
##### Rutas Disponibles
    
- Método "get", ruta "/" que entrega todos los usuarios guardados en la base de datos,
- Método "get", ruta "/:id" que entrega el usuario con primary key = a id
- Método "post", ruta"/" debe tener un header "Content-Type:application/json" y un "body" conteniendo {"username":"nuevo_username", "password":"nueva_password"}, username y password deben ser de al menos 8 caracteres de largo. crea un nuevo usuario con los valores de "body"
- Método "put", ruta "/id" debe tener un header "Content-Type:application/json" y un "body" conteniendo {"username":"nuevo_username", "password":"nueva_password"}, username y password deben ser de al menos 8 caracteres de largo. modifica el usuario con primary key "id" reemplazando sus valores por los de "body
- Método "delete, ruta "/id" borra el usuario con primary key "id"
 
 

