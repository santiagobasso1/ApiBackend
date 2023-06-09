import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        index: true //MongoDB dejó guardar productos con el mismo code así que agregué esta linea y lo solucionó
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: Array,
        default: []
    }
    //Esto era solo para el desafio complementario de la practica integradora 3
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Users',
    //     required: true,
    //     default: "admin"
    // },
})

productSchema.plugin(paginate)

const productModel = model("Products", productSchema)

export default productModel