import { Schema, model } from "mongoose";

const CategoriaSchema = new Schema({
    nome: {
        type: String,
        required: true,
    }
});

export default new model('Categoria', CategoriaSchema);
