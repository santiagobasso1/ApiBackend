import 'dotenv/config.js';
import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import Assert from 'assert';

const expect = chai.expect;
const assert = Assert.strict;

const requester = supertest('http://localhost:4000');

await mongoose.connect(process.env.MONGODBURL);

describe("Testing de la aplicación con supertest", () => {

    //Testing de products
    describe("Testing de las rutas de productos", () => {
        beforeEach(function () {
            this.timeout(3000);
        })
        let idAEliminar;
        it("Ruta: api/product con el metodo POST", async function () {
            const newProduct = {
                title: "Prueba",
                description: "Prueba description",
                code: "aaa",
                price: 654654,
                stock: 33,
                category: "Categoria Prueba",
                thumbnails: ["prueba/item/prueba.jpg"]
            }
            const { statusCode, _body, ok } = await requester.post('/api/product').send(newProduct)
            idAEliminar = _body.products[0]._id
            assert.strictEqual(200, statusCode)
        })
        it("Ruta: api/product con el metodo PUT", async function () {
            const newProduct = {
                title: "Modificando",
                description: "Prueba Modificando",
                code: "aa",
                price: 654654,
                stock: 33,
                category: "Categoria Prueba",
                thumbnails: ["prueba/item/prueba.jpg"]
            }
            const { statusCode, _body, ok } = await requester.put(`/api/product/${idAEliminar}`).send(newProduct)
            assert.strictEqual(200, statusCode)
        })

        it("Ruta: api/product con el metodo DELETE", async function () {
            const id = idAEliminar
            const { statusCode, _body, ok } = await requester.delete(`/api/product/${id}`)
            assert.strictEqual(200, statusCode)
        })
        it("Ruta: api/product con el metodo GET", async function () {
            const { statusCode, _body, ok } = await requester.get('/api/product')
            assert.strictEqual(200, statusCode)
        })
        it("Ruta: api/product con el metodo GET para un producto", async function () {
            const id = '648fe4b4e4794f15c69d4789'
            const { statusCode, _body, ok } = await requester.get(`/api/product/${id}`)
            assert.strictEqual(200, statusCode)
        })
    })

    describe("Testing de las rutas de sessions", () => {
        let cookie = "";
        //ESTÁ COMENTADO PORQUE YA ESTÁ REGISTRADO, SI SE DESEA PROBAR CAMBIAR EMAIL Y DESCOMENTAR
        // it("Ruta: auth/register con metodo POST", async function(){
        //     const newUser = {
        //         first_name: "Santiago",
        //         last_name: "PruebaSuperTest",
        //         email: "santiagobassopruebaSuperTest@gmail.com",
        //         age: 23,
        //         rol: "Admin",
        //         password: "admin",
        //     }
        //     const {_body} = await requester.post('/auth/register').send(newUser)

        //     expect(_body.payload).to.be.ok //Utilizando un poco de chai para no usar solo assert de mocha
        // })

        it("Ruta: auth/login con metodo POST", async function () {
            const user = {
                email: "santiagobassopruebaSuperTest@gmail.com",
                password: "admin"
            }
            const response = await requester.post('/auth/login').send(user)
            'nombreCookie="valor"'
            const cookieResult = response.headers['set-cookie'][0]
            expect(cookieResult).to.be.ok
            cookie = {
                name: cookieResult.split("=")[0],
                value: cookieResult.split("=")[1]
            }
            expect(cookie.name).to.be.ok.and.equal('userCookie') //Verificamos la cookie
            expect(cookie.value).to.be.ok //Verificamos que exista el valor
        })

        it("Ruta: auth/current con metodo GET", async function () {
            //Utilizamos .set() para poner como si fuera una variable unas falsas cookies de navegador del login
            const { _body } = await requester.get('/auth/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(_body.user.email).to.be.equal('santiagobassopruebaSuperTest@gmail.com')
        })


        it("Ruta: auth/current con metodo GET para el rol", async function () {
            //Utilizamos .set() para poner como si fuera una variable unas falsas cookies de navegador del login
            const { _body } = await requester.get('/auth/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(_body.user.rol).to.be.equal('Usuario')
        })
    })
    describe("Testing de las rutas de cart", () => {
        let userCookie;
        //Se genera la session para poder probar 
        before(async () => {
            const email = 'santiagobassopruebaSuperTest@gmail.com'
            const password = 'admin'
            const loginResponse = await requester.post('/auth/login').send({ email: email, password: password, })
            userCookie = loginResponse.headers['set-cookie'];
        });
        it("Ruta: api/cart con metodo GET", async function () {
            const response = await requester.get('/api/cart').set('Cookie', userCookie);
            expect(response._body.message).to.be.equal("Carrito devuelto correctamente")
        });

        it("Ruta: api/cart con metodo PUT para cambiar el carrito entero", async function () {
            const newCart =
                [
                    {
                        "productId": "648ffb9a2236ce03124270ac",
                        "quantity": 5
                    },
                    {
                        "productId": "648ffc0ce8952dac75d4f185",
                        "quantity": 7
                    }
                ]
            const { statusCode, _body, ok } = await requester.put('/api/cart').set('Cookie', userCookie).send(newCart);
            expect(statusCode).to.be.equal(200)

        })
        it("Ruta: api/cart con metodo POST", async function () {
            const productId = '648ffb7419c99e941fd4216d'
            const { statusCode, _body, ok } = await requester.post(`/api/cart/product/${productId}`).set('Cookie', userCookie)
            expect(statusCode).to.be.equal(200)
        })
        it("Ruta: api/cart con metodo PUT para cambiar cantidad", async function () {
            const newQuantity = 11
            const productId = '648ffb7419c99e941fd4216d'
            const { statusCode, _body, ok } = await requester.put(`/api/cart/product/${productId}`).set('Cookie', userCookie).send({ quantity: newQuantity });
            expect(statusCode).to.be.equal(200)
        })
        it("Ruta: api/cart con metodo DELETE para borrar 1 producto en particular por su id", async function () {
            const productId = '648ffb7419c99e941fd4216d'
            const { statusCode, _body, ok } = await requester.delete(`/api/cart/product/${productId}`).set('Cookie', userCookie);
            expect(statusCode).to.be.equal(200)
        })
        it("Ruta: api/cart con metodo DELETE para borrar todos los productos del carrito", async function () {
            const { statusCode, _body, ok } = await requester.delete(`/api/cart`).set('Cookie', userCookie);
            expect(statusCode).to.be.equal(200)
        })
    });
});


























