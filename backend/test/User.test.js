import mongoose from "mongoose";
import userModel from "../src/models/MongoDB/userModel.js"
import Assert from 'assert'
import { createHash } from "../src/utils/bcrypt.js";
import { createCart } from "../src/services/cartService.js";
import 'dotenv/config.js'
import cartModel from "../src/models/MongoDB/cartModel.js";
import { type } from "os";
import chai, { expect } from "chai"

const assert = Assert.strict

await mongoose.connect(process.env.MONGODBURL)
describe("Testing de consulta a los usuarios", () => {
    before(function () {
        console.log("Arrancando test")
    })

    beforeEach(function(){
        this.timeout(3000);
    })



    it("Test para obtener todos los usuarios de mi DB", async function () {
        //Contexto del test (scope propio)
        const users = await userModel.find();
        assert.strictEqual(Array.isArray(users), true)
    })

    it("Test para crear un usuario nuevo usuario en mi DB", async function () {

        const cart = await createCart();
        const hashPassword = createHash("admin");
        const newUser = {
            first_name: "Santiago",
            last_name: "Prueba",
            email: "santiagobassoprueba@gmail.com",
            age: 23,
            rol: "Admin",
            password: hashPassword,
            idCart: cart._id
        }
        const response = await userModel.create(newUser);
        assert.ok(response._id)
        //Eliminamos el carrito del usuario ya que no es el apartado de los tests del cart no hago un test para esto acá
        await cartModel.findByIdAndDelete(response.idCart)
    })
    it("Eliminar usuario creado anteriormente", async function(){
        const email = "santiagobassoprueba@gmail.com"
        const response = await userModel.findOneAndDelete({email:email})
        //Me fijo que el usuario borrado sea un objeto, si es null al estar implementado con chai falla el test
        expect(response).to.be.an('object');
    })
});
