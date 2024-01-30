// Modelo do Banco de dados

import { Schema, model } from "mongoose";
import User from "../model/User";

const ReceitaShema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    titulo: {
        type: String,
        // required: true,
    },
    descricao: {
        type: String,
        // required: true,
    },
    porcoes: {
        type: Number,
        // required: true,
    },
    preparacao: {
        type: String,
        // required: true,
    },
    cozimento: {
        type: String,
        // required: true,
    },
    categorias: {
        type: [String],
    },
    ingredientes: {
        type: String,
        // required: true,
    },
    modoPreparo: {
        type: String,
        // required: true,
    },
    foto: {
        type: String,
        // required: true,
    },
    linkVideo: {
        type: String,
        // required: true,
    },
});


export default new model('Receita', ReceitaShema)