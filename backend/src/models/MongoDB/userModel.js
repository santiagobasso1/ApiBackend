import { Schema, model, now } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    rol: {
        type: String,
        required: true,
        default: "User"
    },
    password: {
        type: String,
        required: true
    },
    idCart: {
        type: Schema.Types.ObjectId,
        ref: 'Carts',
        required: true
    },
    lastConnection: {
        type: Date,
        default: Date.now
    },
    resetToken: {
        token: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    documents: {
        type: [{
            name: {
                type: String,
                required: true
            },
            reference: {
                type: String,
                required: true
            }
        }],
        default: []
    }
})

const userModel = model("Users", userSchema)

export default userModel