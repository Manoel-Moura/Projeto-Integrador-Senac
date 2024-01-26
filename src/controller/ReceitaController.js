import Receita from "../model/Receita"

class cadastroReceita{
   async store(req,res){ // Post
    const { id } = req.headers;
    if (!id) {
        return res.json({ error: 'ID é requisitos' });
      }
      
    const {Titulo,nomeDoChef,ingredientes,modoPreparo,tempo,categorias} = req.body
        
    let  receitaCadastra = await Receita.create({Titulo,nomeDoChef,ingredientes,modoPreparo,tempo,categorias,user: id})
        
    return res.json({receitaCadastra})
    }

    async show(req,res){ // GET all recipes
        let receitas = await Receita.find()
        return res.json(receitas)
    }

    async showReceita(req,res){
        const { id } = req.headers;
        if (!id) {
            return res.json({ error: 'ID é requisitos' });
        }
        let receitas = await Receita.findById(id)
        return res.json(receitas)   
    }

    async update(req,res){ // PUT
        const { id } = req.headers;
        if (!id) {
            return res.status(400).json({ error: 'ID é requisitos' });
          }
          const receita = await Receita.findById(id);

          const {Titulo,nomeDoChef,ingredientes,modoPreparo,tempo,categorias} = req.body

          receita.Titulo = Titulo;
          receita.nomeDoChef = nomeDoChef;
          receita.ingredientes = ingredientes;
          receita.modoPreparo = modoPreparo;
          receita.tempo = tempo;
          receita.categorias = categorias;

          await receita.save();
    
          return res.json(receita);
    }

  


    async delete(req, res) {
        const { id } = req.headers;
        
        if (!id) {
          return res.json({ error: 'ID é requisitos' });
        }
        
        const deleteReceita = await Receita.findByIdAndDelete(id);
        return res.json({ message: 'Receita deletada com sucesso!' });
  
    }
}

export default new cadastroReceita()