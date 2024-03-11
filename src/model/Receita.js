import { Schema, model } from "mongoose";
import User from "../model/User";

const ReceitaShema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    porcoes: {
        type: Number,
        required: true,
    },
    preparacao: {
        type: Number,
        required: true,
    },
    categorias: {
        type: [String],
        required: true,
    },
    ingredientes: {
        type: [String],
        required: true,
    },
    modoPreparo: {
        type: [String],
        required: true,
    },
    foto: {
        type: String,
    },
    linkVideo: {
        type: String,
    },
    curtidas: [{
        usuario: {
            type: String,
        },
        data: {
            type: Date,
            default: Date.now,
        },
    }],
    favoritas: {
        type: [String],
    },
    denunciada: [{
        userId: {
          type: String,
        },
        comentario: {
          type: String,
        },
      }],
});


export default new model('Receita', ReceitaShema)