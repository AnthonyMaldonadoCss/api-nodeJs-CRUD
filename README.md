# api-base-crud-nodeJS

# Este backend usa nodeJs con Express
- Para ejecutarlo instale primero las dependencias con yarn install

# De motor de bases de datos usa MongoDB con Mongoose
- Para asegurarse de que funciona correctamente, por favor instale mongoDB en su equipo y asegurese de que se está ejecutando
- El resto lo hace este repositorio

# Este backend usa cookies como método de manejo de Tokens con JWT
- Lo que quiere decir que se deben declarar las rutas en el app.js desde donde vendrán las solicitudes
- Las que tienen declaradas por ahora son: ['http://localhost:4200', 'https://localhost:3000']
- Si usará otra ruta distintas de estas, debe agregarla a este arreglo en el app.js, seccion cors

# Para ejecutar el proyecto despues de instalada las dependencias
- Puede usar el comando ```yarn dev```
