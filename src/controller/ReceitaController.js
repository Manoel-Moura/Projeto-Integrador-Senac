import Receita from "../model/Receita"

import fs from 'fs'; 
import path from 'path';

class cadastroReceita {
    
    async store(req, res) { // Post
        let { userId } = req.session;

        if (!userId) {
            userId = req.body.userId;
        }

        const { titulo, descricao, porcoes, preparacao, cozimento, categorias, ingredientes, modoPreparo, linkVideo } = req.body;
        const foto = req.file ? req.file.filename : null;

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
            linkVideo,
            curtidas: 0,
        });

        return res.json({ receitaCadastra });
    }


    async show(req, res) { // GET all recipes
        let receitas = await Receita.find()
        return res.json(receitas)
    }


    async showReceita(req, res) {
        // console.log(req.headers.id)
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

        const receita = await Receita.findById(id);

        if (receita.foto) {
            const imagePath = path.resolve(__dirname, '..', 'front', 'assets', 'media', 'uploads', receita.foto);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        const deleteReceita = await Receita.findByIdAndDelete(id);
        return res.json({ message: 'Receita deletada com sucesso!' });
    }

 

    async createCard(req, res) {
        let receitas = await Receita.find().populate('user');

        let cards = [];

        for (let receita of receitas) {
            let user = receita.user;

            if (user) {
                let card = {
                    id: receita._id,
                    chef: user.username,
                    receita: receita.titulo,
                    curtidas: receita.curtidas,
                    fotoChef: '/uploads/' + user.fotoUsuario,
                    fotoReceita: '/uploads/' + receita.foto,
                    categorias: receita.categorias,
                };
                
                cards.push(card);
            }
        }
        return res.json(cards);
    }

}

export default new cadastroReceita()