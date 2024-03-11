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
        type: String,
    },
    celular: {
        type: String,
    },
    telefone: {
        type: String,
    },
    genero: {
        type: String,
    },
    passwordResetToken: {
        value: String,
        createdAt: Date
    },
    moderador: {
        type: Boolean,
        default: false,
    },
});


export default model('User', UserSchema);
