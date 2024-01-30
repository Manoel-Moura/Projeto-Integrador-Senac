import Receita from "../model/Receita"

class cadastroReceita {
    async store(req, res) { // Post
        const { userId } = req.session; // Obter o ID do usuário da sessão

        const { titulo, descricao, porcoes, preparacao, cozimento, categorias, ingredientes, modoPreparo, linkVideo } = req.body;
        const foto = req.file ? req.file.path : null;

        let receitaCadastra = await Receita.create({
            user: userId,
            titulo,
            descricao,
            porcoes,
            preparacao,
            cozimento,
            categorias,
            ingredientes,
            modoPreparo,
            foto,
            linkVideo
        });

        return res.json({ receitaCadastra });
    }


    async show(req, res) { // GET all recipes
        let receitas = await Receita.find()
        return res.json(receitas)
    }

    async showReceita(req, res) {
        const { id } = req.headers;
        if (!id) {
            return res.json({ error: 'ID é requisitos' });
        }
        let receitas = await Receita.findById(id)
        return res.json(receitas)
    }


    async update(req, res) { // PUT
        const { id } = req.headers;
        if (!id) {
            return res.status(400).json({ error: 'ID é requisitos' });
        }
        const receita = await Receita.findById(id);

        const { titulo, descricao, porcoes, preparacao, cozimento, categorias, ingredientes, modoPreparo, linkVideo } = req.body

        receita.titulo = titulo;
        receita.descricao = descricao;
        receita.porcoes = porcoes;
        receita.preparacao = preparacao;
        receita.cozimento = cozimento;
        receita.categorias = categorias;
        receita.ingredientes = ingredientes;
        receita.modoPreparo = modoPreparo;
        receita.linkVideo = linkVideo;

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