import Categoria from "../model/Categoria";

class CategoriaController {

  async store(req, res) {
    try {
      const { nome } = req.body;
      let categoriaExistente = await Categoria.findOne({ nome });
      if (categoriaExistente) {
        return res.status(400).send('Uma categoria com este nome já existe');
      }
      let novaCategoria = new Categoria({ nome });
      await novaCategoria.save();
      return res.json({ novaCategoria });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Ocorreu um erro ao tentar criar a categoria');
    }
  }


  async show(req, res) {
    try {
      let categorias = await Categoria.find();
      return res.json(categorias);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Ocorreu um erro ao tentar buscar as categorias');
    }
  }


  async update(req, res) {
    try {
      const { id, nome } = req.body;
      let categoria = await Categoria.findById(id);
      if (!categoria) {
        return res.status(400).send('Categoria não encontrada');
      }
      categoria.nome = nome;
      await categoria.save();
      return res.json({ categoria });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Ocorreu um erro ao tentar atualizar a categoria');
    }
  }

  
  async delete(req, res) {
    try {
      const { id } = req.body;
      let categoria = await Categoria.findById(id);
      if (!categoria) {
        return res.status(400).send('Categoria não encontrada');
      }
      await Categoria.deleteOne({ _id: categoria._id });
      return res.send('Categoria removida com sucesso');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Ocorreu um erro ao tentar remover a categoria');
    }
  }

}

export default new CategoriaController();
