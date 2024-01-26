import User from "../model/User";

class crudUser{
    async store(req,res){ // Post
        const {nome,foto} = req.body
        let userCadastra = await User.findOne({nome})
        if(!userCadastra){
            userCadastra = await User.create({nome,foto})
        }
       return res.json(userCadastra)
    }

    async edit(req, res) {
       
          // Extract user ID from request parameters (more reliable than headers)
          const { id } = req.headers;
      
          // Validando requisitos
          if (!id || !req.body.nome || !req.body.foto) {
            return res.status(400).json({ error: 'ID, nome, e foto são requisitos' });
          }
      
          const user = await User.findById(id);
      
          user.nome = req.body.nome;
          user.foto = req.body.foto;
      
          // Salvando mudanças do usuario no BD
          await user.save();
      
          return res.json(user);
       
      }

    async show(req,res){ // GET
        let users = await User.find()
        return res.json(users)

    }

    async delete(req, res) {
          const { id } = req.headers;
          
    
          if (!id) {
            return res.json({ error: 'ID é requisitos' });
          }
          
          const deletedUser = await User.findByIdAndDelete(id);
          return res.json({ message: 'Usuario deletado com sucesso!' });
    
      }

}

export default new crudUser()