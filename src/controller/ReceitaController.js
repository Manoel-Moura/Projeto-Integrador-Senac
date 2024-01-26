import Receita from "../model/Receita"

class cadastroReceita{
   async store(req,res){ // Post
        const {Titulo,nomeDoChef,ingredientes,modoPreparo,tempo,categorias} = req.body
        const {User_id} = req.headers
        let receitaCadastra = await Receita.findOne({User_id})
        if(!receitaCadastra){
            receitaCadastra = await Receita.create({Titulo,nomeDoChef,ingredientes,modoPreparo,tempo,categorias, user: User_id})
        }
       return res.json({User_id})
    }

    async show(req,res){ // GET all recipes
        let receitas = await Receita.find()
        return res.json(receitas)
    }

    async showUser(req,res){
       
            const userId = req.headers.idUsuario;
            const receitas = await Receita.find({ user: userId });
            return res.json({receitas});
        
    }

    async update(req,res){ // PUT
        const id = parseInt(req.params.id)
        const {Titulo,ingredientes,modoPreparo,tempo,categorias,user} = req.body
        let receitas = await Receita.find()
        receitas.forEach(element => {
            if(element.id == id){
                element.Titulo = Titulo;
                element.ingredientes = ingredientes;
                element.modoPreparo = modoPreparo;
                element.tempo = tempo;
            }
            return res.json({ receitas })
        }
       
        ); 

    }
}

export default new cadastroReceita()