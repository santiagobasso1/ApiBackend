# 👋 Entrega FINAL del curso de programación backend Node.js
_Implementación de vistas basicas para poder realizar una compra del lado del usuario_
## Pre Requirements 📋

_Para utilizar la aplicación necesita instalar las dependencias con el siguiente comando:_
```
npm i
```
# Rutas de la API a testear

### Carts:
```
Obtener el carrito del usuario logueado
http://localhost:4000/api/carts [GET] [USER]
Reemplazar el carrito con uno nuevo del usuario logueado
http://localhost:4000/api/carts/ [PUT] [USER]
Agregar un producto al carrito del usuario logueado
http://localhost:4000/api/carts/product/:pid [POST] [USER]
Actualizar la quantity de productos del carrito del usuario logueado
http://localhost:4000/api/carts/product/:pid [PUT] [USER]
Borrar un producto del carrito del usuario logueado
http://localhost:4000/api/carts/product/:pid [DELETE] [USER]
Vaciar el carrito del usuario logueado
http://localhost:4000/api/carts [DELETE] [USER]
Realizar la compra del carrito del usuario logueado
http://localhost:4000/api/purchase [POST] [USER]
```
### Github Auth:
```
http://localhost:4000/auth/github [GET]
http://localhost:4000/auth/githubSession [GET]
```
### Vistas/Handlebars
```
Muestra la vista hbs del email para el restore password
http://localhost:4000/handlebars/emailForm [GET]
Muestra la vista hbs para ingresar la nueva password (Necesita antes ir a la anterior ruta)
http://localhost:4000/handlebars/restorePassword [GET]
Muestra la vista hbs para el login
http://localhost:4000/handlebars/login [GET]
Muestra la vista hbs para el mensaje de bienvenida
http://localhost:4000/handlebars/ [GET]
Muestra la vista hbs para el registro del usuario
http://localhost:4000/handlebars/register [GET] 
Muestra la vista hbs para ver los productos
http://localhost:4000/handlebars/products [GET] 
Muestra la vista hbs para ver el carrtio del usuario
http://localhost:4000/handlebars/cart [GET]  
Muestra la vista hbs para ver el perfil y desloguearse de asi quererlo
http://localhost:4000/handlebars/profile [GET] 
```
### Logger
```
http://localhost:4000/loggerTest/fatal [GET] [ADMIN]
http://localhost:4000/loggerTest/error [GET] [ADMIN]
http://localhost:4000/loggerTest/warning [GET] [ADMIN]
http://localhost:4000/loggerTest/debug [GET] [ADMIN]
```
### Mocking
```
http://localhost:4000/mocking/mockingproducts [GET] [ADMIN]
```
### Politicas:
_No utilizadas como tal, fueron requeridas en su momento y no se siguieron implementando_
```
http://localhost:4000/politicas/public [GET]
http://localhost:4000/politicas/autenticado [GET]
http://localhost:4000/politicas/premium [GET]
```
### Products: 
```
Obtener todos los productos
http://localhost:4000/api/products [GET] 
Obtener el producto que coincida con el pid
http://localhost:4000/api/products/:pid [GET] 
Agregar un producto
http://localhost:4000/api/products [POST] [ADMIN]
Actualizar/Modificar un producto
http://localhost:4000/api/products/:pid [PUT] [ADMIN]
Borrar un producto
http://localhost:4000/api/products/:pid [DELETE] [ADMIN] 
```
### Sessions:
```
Logueo del usuario
http://localhost:4000/api/session/login [POST]
Registro del usuario
http://localhost:4000/api/session/register [POST]
Deslogueo del usuario
http://localhost:4000/api/session/logout [POST]
Obtener el usuario actualmente logueado
http://localhost:4000/api/session/current [GET]
Crear el link para el password restore
http://localhost:4000/api/session/password/createLink [POST]
Password restore
http://localhost:4000/api/session/password/reset [POST]
```
### Socket(Chat)
```
Obtener mensajes del chat
http://localhost:4000/socket/chat [GET]
Agregar mensaje al chat
http://localhost:4000/socket/chat [POST]
```
### User:
```
Agregar un documento a la carpeta local
http://localhost:4000/api/users/documents [POST]
Obtener este documento
http://localhost:4000/api/users/documents [GET]
Obtener todos los usuarios para el contacto (información no sensible)
http://localhost:4000/api/users [GET] [ADMIN]
Borrar los usuarios inactivos
http://localhost:4000/api/users [DELETE] [ADMIN]
```