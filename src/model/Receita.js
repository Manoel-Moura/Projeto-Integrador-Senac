// Modelo do Banco de dados

import { Schema,model } from "mongoose";
import User from "../model/User";

const ReceitaShema = new Schema({
    Titulo: {
        type: String,
        require: true,
    },
    nomeDoChef:  {
        type: String,
        require: true,
    },
    ingredientes:  {
        type: [String],
        min:2,
    },
    modoPreparo:  {
        type: String,
        require: true,
    },
    imagem: String,
    video: String,
    tempo:  {
        type: Number,
        require: true,
    },
    categorias:{
        type: [String],
    },
    user:{
       type: Schema.Types.ObjectId,
       ref: User
    }
})



export default new model('Receita', ReceitaShema)