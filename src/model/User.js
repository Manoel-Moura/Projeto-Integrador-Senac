import { Schema,model } from "mongoose";

const UserShema = new Schema({
    nome: {
        type: String,
        require: true,
    },
    foto:{
        type: String,
        require: true,
    },
})



export default new model('User', UserShema)