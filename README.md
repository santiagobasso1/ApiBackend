# 👋 Tercer pre-entrega TP Final
_Desarrollo de un servidor web en capas_

## Pre Requirements 📋

_Para utilizar la aplicación necesita instalar las dependencias con el siguiente comando:_
```
npm i
```
## Rutas de la API a testear

### Products: 
```
http://localhost:4000/api/product [GET] [ADMIN]
http://localhost:4000/api/product/:pid [GET] [ADMIN]
http://localhost:4000/api/product [POST] [ADMIN]
http://localhost:4000/api/product/:pid [PUT] [ADMIN]
http://localhost:4000/api/product/:pid [DELETE] [ADMIN]
```
### Cart:
```
http://localhost:4000/api/cart [GET] [ADMIN USER]
http://localhost:4000/api/cart/:cid [PUT] [USER]
http://localhost:4000/api/cart/product/:pid [POST] [USER]
http://localhost:4000/api/cart/product/:pid [PUT] [USER]
http://localhost:4000/api/cart/product/:pid [DELETE] [USER]
http://localhost:4000/api/cart [DELETE] [USER] [USER]

```
### Github Auth:
```
http://localhost:4000/auth/github [GET]
http://localhost:4000/auth/githubSession [GET]
```
### Sessions:
```
http://localhost:4000/auth/login [POST]
http://localhost:4000/auth/register [POST]
http://localhost:4000/auth/logout [GET]
http://localhost:4000/auth/current [GET] 
```
### User:
```
http://localhost:4000/user [GET]
```
### Politicas (Desuso por esta entrega):
```
http://localhost:4000/politicas/public [GET]
http://localhost:4000/politicas/autenticado [GET]
http://localhost:4000/politicas/premium [GET]
```
### Socket(Chat)
```
http://localhost:4000/socket/chat [GET]
http://localhost:4000/socket/chat [POST]
```

### Utils
```
http://localhost:4000/utils/email [POST]
```
