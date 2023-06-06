# 👋 Restore Password || Tercer practica integradora
_Eliminación de la mayoria de los console.log reemplazandolos por logs_

## Pre Requirements 📋

_Para utilizar la aplicación necesita instalar las dependencias con el siguiente comando:_
```
npm i
```
# Rutas de la API a testear

## 👇👇NUEVA👇👇
### Handlebars (Ya que con react no vimos como guardar cookies)
### VISTAS
```
http://localhost:4000/handlebars/login [GET] [ADMIN USER]
http://localhost:4000/handlebars/restorePassword [GET] [ADMIN USER]
http://localhost:4000/handlebars/login [GET] [ADMIN USER]
http://localhost:4000/handlebars/register [GET] [ADMIN USER]
http://localhost:4000/handlebars/ [GET] [ADMIN USER]

```
### Logger
```
http://localhost:4000/loggerTest/fatal [GET] [ADMIN USER]
http://localhost:4000/loggerTest/error [GET] [ADMIN USER]
http://localhost:4000/loggerTest/warning [GET] [ADMIN USER]
http://localhost:4000/loggerTest/debug [GET] [ADMIN USER]
```
### Mocking
```
http://localhost:4000/mocking/mockingproducts
```
### Products: 
```
http://localhost:4000/api/product [GET] 
http://localhost:4000/api/product/:pid [GET] 
http://localhost:4000/api/product [POST] [ADMIN] [PREMIUM]
http://localhost:4000/api/product/:pid [PUT] [ADMIN] [PREMIUM]
http://localhost:4000/api/product/:pid [DELETE] [ADMIN] [PREMIUM]
```
### Cart:
```
http://localhost:4000/api/cart [GET] [ADMIN] [USER]
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
http://localhost:4000/auth/password/createLink [POST]
http://localhost:4000/auth/password/reset [POST]
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
