import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senhaCadastro: {
        type: String,
        required: true,
    },
    confirmarSenhaCadastro: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    data: {
        type: Date,
        required: true,
    },
    fotoUsuario: {
        type:String,
    }
});

export default model('User', UserSchema);
