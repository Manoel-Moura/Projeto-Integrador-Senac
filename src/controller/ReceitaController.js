import Receita from '../model/Receita';

import fs from 'fs';
import path from 'path';

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
    const { id } = req.params;
    let receita = await Receita.findById(id);
    return res.json(receita);
  }

  async showReceita(req, res) {
    const { id } = req.headers;

    if (!id) {
      return res.json({ error: 'ID é requisitos' });
    }

    try {
      const receitaUser = await Receita.findById(id).populate('user');

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
      res.status(500).json({ error: 'Erro ao buscar receita' });
    }
  }

  async update(req, res) {
    // PUT
    let { userId } = req.session;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID é requisitos' });
    }

    const {
      titulo,
      descricao,
      porcoes,
      preparacao,
      categorias,
      ingredientes,
      modoPreparo,
      linkVideo,
    } = req.body;

    const receita = await Receita.findOne({ _id: id, user: userId });

   

    receita.titulo = titulo;
    receita.descricao = descricao;
    receita.porcoes = porcoes;
    receita.preparacao = preparacao;
    receita.categorias = categorias;
    receita.ingredientes = ingredientes;
    receita.modoPreparo = modoPreparo;
    receita.linkVideo = linkVideo;

    if (req.file) {
      receita.foto = req.file.filename;
    }

    await receita.save();

    return res.json(receita);
  }

  async delete(req, res) {
    const { id } = req.body;
  
    if (!id) {
      return res.json({ error: 'ID é requisitos' });
    }
  
    const receita = await Receita.findById(id);
  
    if (receita.foto) {
      const imagePath = path.resolve(
        __dirname,
        '..',
        'front',
        'assets',
        'media',
        'uploads',
        receita.foto,
      );
  
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
          chefID: user._id,
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

  async favoritaReceita(req, res) {
    try {
      const { id } = req.body;
      const { userId } = req.session; // Quem está favoritando
      // console.log("Receita: " + id + "\nUsuario: " + userId);

      // Verifica se o ID da receita é válido
      if (!id) {
        return res.status(400).json({ error: 'ID da receita inválido.' });
      }

      // Verifica se o ID do usuário é válido
      if (!userId) {
        return res.status(400).json({ error: 'ID do usuário inválido.' });
      }

      const receitaUser = await Receita.findById(id);

      if (!receitaUser) {
        return res.status(404).json({ message: 'Receita não encontrada!' });
      }

      const favoritos = receitaUser.favoritas || [];

      let index = favoritos.indexOf(userId); // Busca no array a posição que o id se encontra
      // console.log('Estou aqui e o ID:' +userId)
      if (index === -1 && userId != null) {
        // Se não achar o ID ele adiciona
        receitaUser.favoritas.push(userId);
        // console.log('era para ter adicionado')
      } else {
        // Remove o ID do usuário da lista de favoritos
        receitaUser.favoritas.splice(index, 1);
      }

      // console.log(receitaUser);
      await receitaUser.save();

      return res.json(receitaUser);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Ocorreu um erro ao processar a solicitação.' });
    }
  }

  async curtidasReceita(req, res) {
    try {
      const { id } = req.body;
      const { userId } = req.session; // Quem está curtindo
      // console.log("Receita: " + id + "\nUsuario: " + userId);

      const receitaUser = await Receita.findById(id);

      if (!receitaUser) {
        return res.status(404).json({ message: 'Receita não encontrada!' });
      }

      const curtidas = receitaUser.curtidas;

      let buscar = curtidas.findIndex(curtida => curtida.usuario === userId); // Busca no array a posição que o id se encontra
      // receitaUser.curtidas.splice(0, 1);
      if (buscar === -1 && userId != null) {
        receitaUser.curtidas.push({ usuario: userId.toString(), data: Date.now() });
      } else if (buscar !== -1) {
        receitaUser.curtidas.splice(buscar, 1);
      }
      // console.log(receitaUser);
      await receitaUser.save();

      return res.json(receitaUser);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: 'Ocorreu um erro ao processar a solicitação.' });
    }
  }

  // async receitasUser(req, res) {
  //   try {
  //     const { id } = req.headers;

  //     if (!id) {
  //       return res.status(400).json({ error: 'ID é um requisito' });
  //     }

  //     // Buscando todas as receitas do usuário com o ID fornecido
  //     const receitasUsuario = await Receita.find({ user: id });

  //     // Verificando se o usuário possui receitas
  //     if (!receitasUsuario || receitasUsuario.length === 0) {
  //       return res.status(404).json({ message: 'Nenhuma receita encontrada para este usuário' });
  //     }


  //   let cards = [];

  //   for (let receita of receitasUsuario) {
  //     let user = receita.user;

  //     if (user) {
  //       let card = {
  //         chefID: user._id,
  //         id: receita._id,
  //         chef: user.username,
  //         receita: receita.titulo,
  //         curtidas: receita.curtidas,
  //         fotoChef: '/uploads/' + user.fotoUsuario,
  //         fotoReceita: '/uploads/' + receita.foto,
  //         categorias: receita.categorias,
  //       };

  //       cards.push(card);
  //     }
  //   }
  //   return res.json(cards);



  //     //return res.json(receitasUsuario);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Erro ao buscar receitas do usuário' });
  //   }
  // }


}

export default new cadastroReceita();
