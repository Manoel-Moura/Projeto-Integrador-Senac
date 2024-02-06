// Modelo do Banco de dados

import { Schema, model } from "mongoose";
import User from "../model/User";

const ReceitaShema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    titulo: {
        type: String,
    },
    descricao: {
        type: String,
    },
    porcoes: {
        type: Number,
    },
    preparacao: {
        type: String,
    },
    cozimento: {
        type: String,
    },
    categorias: {
        type: [String],
    },
    ingredientes: {
        type: [String],
    },
    modoPreparo: {
        type: [String],
    },
    foto: {
        type: String,
    },
    linkVideo: {
        type: String,
    },
    curtidas:{
        type:[String],
    }
});


export default new model('Receita', ReceitaShema)