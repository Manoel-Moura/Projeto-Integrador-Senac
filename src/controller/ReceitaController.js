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

    const campos = {
      titulo: 'Por favor, preencha o campo título.',
      descricao: 'Por favor, preencha o campo descrição.',
      porcoes: 'Por favor, insira um número válido de porções.',
      preparacao: 'Por favor, insira um tempo de preparação válido.',
      categorias: 'Por favor, preencha o campo categorias.',
      ingredientes: 'Por favor, preencha o campo ingredientes.',
      modoPreparo: 'Por favor, preencha o campo modo de preparo.',
    };

    for (let campo in campos) {
      if (!req.body[campo] || (campo === 'porcoes' || campo === 'preparacao') && (!Number.isInteger(Number(req.body[campo])) || req.body[campo] < 1)) {
        return res.status(400).json({ error: campos[campo] });
      }
    }

    if (!foto) {
      return res.status(400).json({ error: 'Por favor, carregue uma foto.' });
    }

    try {
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

      return res.json({ receitaCadastra, userId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao tentar criar a receita.' });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    let receita = await Receita.findById(id);
    return res.json(receita);
  }

  async showAll(req, res) { // GET
    let receitas = await Receita.find()
    return res.json(receitas)

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

    const campos = {
      titulo: 'Por favor, preencha o campo título.',
      descricao: 'Por favor, preencha o campo descrição.',
      porcoes: 'Por favor, insira um número válido de porções.',
      preparacao: 'Por favor, insira um tempo de preparação válido.',
      categorias: 'Por favor, preencha o campo categorias.',
      ingredientes: 'Por favor, preencha o campo ingredientes.',
      modoPreparo: 'Por favor, preencha o campo modo de preparo.',
    };

    for (let campo in campos) {
      if (!req.body[campo] || (campo === 'porcoes' || campo === 'preparacao') && (!Number.isInteger(Number(req.body[campo])) || req.body[campo] < 1)) {
        return res.status(400).json({ error: campos[campo] });
      }
    }

    const receita = await Receita.findOne({ _id: id, user: userId });

    if (!receita) {
      return res.status(404).json({ error: 'Receita não encontrada' });
    }

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
    const { userId } = req.session;
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
          sessionUser: userId,
          favoritas: receita.favoritas,
        };

        cards.push(card);
      }
    }
    return res.json(cards);
  }

  async createCardTest(req, res) {
    const { userId } = req.session;
    const limit = req.query.qntCards || 1;
    let receitas = await Receita.find().populate('user');
    let cards = [];

    for (let i = 0; i < limit; i++) {
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
                    sessionUser: userId,
                    favoritas: receita.favoritas,
                };

                cards.push(card); 
            }
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


  async denunciar(req, res) {
    const { userId, receitaId, comentario } = req.body;
  
    try {
      const receita = await Receita.findById(receitaId);
  
      if (!receita) {
        return res.status(404).json({ error: 'Receita não encontrada' });
      }

      receita.denunciada.push({ userId, comentario });
  
      await receita.save();
  
      res.status(200).json({ message: 'Denúncia registrada com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao registrar a denúncia.' });
    }
  }

  async showDenuncias(req, res) {
    try {
      const receitasDenunciadas = await Receita.find({ 'denunciada.0': { $exists: true } }).populate('user');
      
      let receitasFormatadas = [];
      receitasDenunciadas.forEach(receita => {
        receita.denunciada.forEach(denuncia => {
          let novaReceita = {
            chefID: receita.user._id,
            id: receita._id,
            chef: receita.user.username,
            receita: receita.titulo,
            curtidas: receita.curtidas,
            fotoChef: '/uploads/' + receita.user.fotoUsuario,
            fotoReceita: '/uploads/' + receita.foto,
            categorias: receita.categorias,
            favoritas: receita.favoritas,
            denunciada: [denuncia] 
          };
          receitasFormatadas.push(novaReceita);
        });
      });
  
      return res.json(receitasFormatadas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao buscar as receitas denunciadas.' });
    }
  }
  
  
  
  async limparDenuncias(req, res) {
    try {
      let receita = await Receita.findById(req.params.id);
      if (receita) {
        receita.denunciada = [];
        await receita.save();
        res.json({ success: true });
      } else {
        res.status(404).json({ success: false, message: 'Receita não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Ocorreu um erro no servidor' });
    }
  }
  
}

export default new cadastroReceita();
