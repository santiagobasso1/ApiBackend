# 👋 Segunda practica integradora
_Arquitectura del servidor: Diseño_

## Pre Requirements 📋

_Para utilizar la aplicación necesita instalar las dependencias con el siguiente comando:_
```
npm i
```
## Rutas de la API a testear

### Products: 
```
http://localhost:5000/api/product [GET]
http://localhost:5000/api/product/:pid [GET]
http://localhost:5000/api/product [POST]
http://localhost:5000/api/product/:pid [PUT]
http://localhost:5000/api/product/:pid [DELETE]
```
### Cart:
```
http://localhost:5000/api/cart [GET]
http://localhost:5000/api/cart/:cid [PUT]
http://localhost:5000/api/cart/product/:pid [POST]
http://localhost:5000/api/cart/product/:pid [PUT]
http://localhost:5000/api/cart/product/:pid [DELETE]
http://localhost:5000/api/cart [DELETE]

```
### Github Auth:
```
http://localhost:5000/auth/github [GET]
http://localhost:5000/auth/githubSession [GET]
```
### Sessions:
```
http://localhost:5000/auth/login [POST]
http://localhost:5000/auth/register [POST]
http://localhost:5000/auth/logout [GET]
http://localhost:5000/auth/current [GET] 
```
### User:
```
http://localhost:5000/user [GET]
```
### Politicas (Desuso por esta entrega):
```
http://localhost:5000/politicas/public [GET]
http://localhost:5000/politicas/autenticado [GET]
http://localhost:5000/politicas/premium [GET]
```
### Otras rutas (Deshabilitadas hasta hacer el frontend):
```
http://localhost:5000/products [GET]
http://localhost:5000/carts/:cid [GET]
http://localhost:5000/productsGet [GET]
```
