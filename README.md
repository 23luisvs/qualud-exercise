# qualud-exercise
Practical exercise Qualud

Requisitos funcionales:

Users:<br>
✔ El usuario debe poder ver una lista de usuarios existentes.<br>
✔ El usuario debe poder ver la cantidad de post que tiene cada usuario en el mismo listado.<br>
Observación: <br>
Faltó desarrollar la paginación.<br>

Post:<br>
✔ El usuario debe poder ver una lista de publicaciones existentes.<br>
✔ El usuario debe poder filtrar las publicaciones por autor<br>
✔ El usuario debe poder agregar una nueva publicación a la lista.<br>
✔ El usuario debe poder eliminar las publicaciones en las que él es autor.<br>
Observación:<br>
La paginación hacia atrás no funciona correctamente.<br>
 
Comments:<br>
✔ El usuario debe poder ver una lista de comentarios solo de sus publicaciones.<br>
✔ El usuario debe poder eliminar comentarios de sus publicaciones<br>

ToDo:<br>
✔ El usuario debe poder ver una lista de tareas existentes.<br>
✔ El usuario debe poder agregar una nueva tarea a la lista.<br>
✔ El usuario debe poder cambiar el estado de una tarea de pendiente a completada o viceversa.<br>
✔ El usuario debe poder eliminar una tarea de la lista.<br><br>
Observación:<br>
En los dos últimos requisitos se simuló el funcionamiento con setTimeout, no se cambia la BD.<br>
Al agregar una tarea no se utiliza el horario local<br>
             
Observación general: <br>
Bug al hacer sign out, la página login no responde.<br>
Para la autenticación se obtienen los primeros 10 usuarios y se ordenan por el de mayor cantidad de publicaciones primero para tener mayor posibilidad de que tenga comentarios y poder probar esas funcinalidades.<br>
No se utiliza un usuario fijo pues la bd se genera aleatoriamente cada cierto tiempo.<br>

Requisitos técnicos:<br>

✔ Utilice Ionic CLI para generar y administrar el proyecto.<br>
✔ Realice el proceso de autenticación con el Bearer Token para poder utilizar los métodos de PUT, POST, PATCH, DELETE<br>
Utilice servicios para manejar la lógica de negocios de la aplicación.<br>
Utilice Observables en los casos que considere necesario<br>
Utilice Reactive Forms para manejar la entrada de datos del usuario.<br>
Utilice Pipe para formatear los datos que no tengan una estructura amigable para el usuario<br>
✔ Utilice el sistema de navegación de Ionic para navegar entre las diferentes vistas de la aplicación.<br>
✔ Utilice los métodos async y await preferentemente antes que las Promise<br>
✔ Utilice GraphQL en todos los casos de ser posible<br>
✔ Integrar el plugin de capacitor Network y cuando la App este offline redirigirlo a una página con el mensaje que esta sin conexión a internet y retornarlo a la página principal del proyecto una vez se restablezca<br>
✔ Cuando intente eliminar alguno de los elementos levantar una confirmación de la acción y hacer vibrar el móvil utilizando el plugin de @capacitor/haptics<br>
