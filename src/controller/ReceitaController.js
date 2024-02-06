import Receita from "../model/Receita";

import fs from "fs";
import path from "path";

class cadastroReceita {
  async store(req, res) {
    // Post
    let { userId } = req.session;

    if (!userId) {
      userId = req.body.userId;
    }

    const {
      titulo,
      descricao,
      porcoes,
      preparacao,
      cozimento,
      categorias,
      ingredientes,
      modoPreparo,
      linkVideo,
    } = req.body;
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
      curtidas: [],
    });

    return res.json({ receitaCadastra });
  }

  async show(req, res) {
    // GET all recipes
    let receitas = await Receita.find();
    return res.json(receitas);
  }

  async showReceita(req, res) {
    const { id } = req.headers;

    if (!id) {
      return res.json({ error: "ID é requisitos" });
    }

    try {
      const receitaUser = await Receita.findById(id).populate("user");

      // Criando um objeto para armazenar a sessão
      const idSession = {
        idsession: req.session.userId || null,
      };

      let vetor = [];
      vetor.push(receitaUser);
      vetor.push(idSession);
      //console.log(vetor);
      return res.json(vetor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar receita" });
    }
  }

  async update(req, res) {
    // PUT
    const { id } = req.headers;
    if (!id) {
      return res.status(400).json({ error: "ID é requisitos" });
    }
    const receita = await Receita.findById(id);

    const {
      titulo,
      descricao,
      porcoes,
      preparacao,
      cozimento,
      categorias,
      ingredientes,
      modoPreparo,
      linkVideo,
    } = req.body;

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
      return res.json({ error: "ID é requisitos" });
    }

    const receita = await Receita.findById(id);

    if (receita.foto) {
      const imagePath = path.resolve(
        __dirname,
        "..",
        "front",
        "assets",
        "media",
        "uploads",
        receita.foto
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const deleteReceita = await Receita.findByIdAndDelete(id);
    return res.json({ message: "Receita deletada com sucesso!" });
  }

  async createCard(req, res) {
    let receitas = await Receita.find().populate("user");

    let cards = [];

    for (let receita of receitas) {
      let user = receita.user;

      if (user) {
        let card = {
          chefID: user._id,
          id: receita._id,
          chef: user.username,
          receita: receita.titulo,
          curtidas: receita.curtidas,
          fotoChef: "/uploads/" + user.fotoUsuario,
          fotoReceita: "/uploads/" + receita.foto,
          categorias: receita.categorias,
        };

        cards.push(card);
      }
    }
    return res.json(cards);
  }

  async favoritaReceita(req, res) {
    try {
      const { id } = req.body;
      const { userId } = req.session; // Quem está favoritando
      console.log("Receita: " + id + "\nUsuario: " + userId);
  
      // Verifica se o ID da receita é válido
      if (!id) {
        return res.status(400).json({ error: "ID da receita inválido." });
      }
  
      // Verifica se o ID do usuário é válido
      if (!userId) {
        return res.status(400).json({ error: "ID do usuário inválido." });
      }
  
      const receitaUser = await Receita.findById(id);
  
      if (!receitaUser) {
        return res.status(404).json({ message: "Receita não encontrada!" });
      }
  
  
      const favoritos = receitaUser.favoritas || [];
  
      let index = favoritos.indexOf(userId); // Busca no array a posição que o id se encontra
  // console.log('Estou aqui e o ID:' +userId)
  if (index === -1 &&  userId != null) { // Se não achar o ID ele adiciona
    receitaUser.favoritas.push(userId);
        console.log('era para ter adicionado')
      } else {
        // Remove o ID do usuário da lista de favoritos
        receitaUser.favoritas.splice(index, 1);
      }
  
      // console.log(receitaUser);
      await receitaUser.save();
  
      return res.json(receitaUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao processar a solicitação." });
    }
  }
  

  async curtidasReceita(req, res) {
    try {
      const { id } = req.body;
      const { userId } = req.session; // Quem está curtindo
      // console.log("Receita: " + id + "\nUsuario: " + userId);

      const receitaUser = await Receita.findById(id);

     

      if (!receitaUser) {
        return res.status(404).json({ message: "Receita não encontrada!" });
      }

      const curtidas = receitaUser.curtidas;

      let buscar = curtidas.indexOf(userId); // Busca no array a posição que o id se encontra
      // receitaUser.curtidas.splice(0, 1);
      if (buscar === -1 &&  userId != null) {
        receitaUser.curtidas.push(userId);
      } else {
        while (buscar >= 0) {
          receitaUser.curtidas.splice(buscar, 1);
          buscar = receitaUser.curtidas.indexOf(userId);
        }
      }
      // console.log(receitaUser);
      await receitaUser.save();

      return res.json(receitaUser);
    } catch (error) {
      console.error(error); 
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao processar a solicitação." });
    }
  }
}

export default new cadastroReceita();
