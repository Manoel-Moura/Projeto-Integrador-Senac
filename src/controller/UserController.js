import User from "../model/User";
import bcrypt from 'bcryptjs';


class crudUser {

  async store(req, res) {
    const { userId } = req.session;
    const senhaCadastroCriptografada = bcrypt.hashSync(req.body.senhaCadastro, 8);

    try {
      const {
        username,
        email,
        senhaCadastro,
        confirmarSenhaCadastro,
        cpf,
        data,
        fotoUsuario,
        celular,
        telefone,
        genero
      } = req.body;

      if (senhaCadastro !== confirmarSenhaCadastro) {
        return res.status(400).send('As senhas não correspondem');
      }

      let usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).send('Um usuário com este nome de usuário já existe');
      }

      let emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).send('Um usuário com este email já existe');
      }

      let cpfExists = await User.findOne({ cpf });
      if (cpfExists) {
        return res.status(400).send('Um usuário com este CPF já existe');
      }

      let userCadastra = await User.create({
        username,
        email,
        senhaCadastro: senhaCadastroCriptografada,
        cpf,
        data,
        fotoUsuario,
        celular,
        telefone,
        genero
      });

      return res.json({ userCadastra });
    } catch (error) {
      console.error(error);
      res.status(500).send('Ocorreu um erro ao tentar criar o usuário');
    }
  }

  async edit(req, res) {
    const { userId } = req.session;
  
    const user = await User.findById(userId);
  
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
  
    user.username = req.body.username;
    user.email = req.body.email;
    user.data = req.body.data;
    user.fotoUsuario = req.file ? req.file.filename : user.fotoUsuario;
    user.celular = req.body.celular;
    user.telefone = req.body.telefone;
    user.genero = req.body.genero;
  
    await user.save();
  
    return res.json(user);
  }
  
  
  async show(req, res) { // GET
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

  async login(req, res) {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.senhaCadastro);
    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    if (passwordIsValid) {
      req.session.userId = user._id;
      return res.json(user);
    }

  }

  //Para ver se o usuario está logado
  async checkLogin(req, res) {
    if (req.session && req.session.userId) {
      res.json({ loggedIn: true });
    } else {
      res.json({ loggedIn: false });
    }
  }

  //Puxar os dados do usuario, um GET pra usuarios(individual)
  async getUserData(req, res) {

    if (!req.session.userId) {
      return res.status(401).send({ error: 'Usuário não autenticado' });
    }
    
    const user = await User.findById(req.session.userId);
    user.data = user.data.toISOString().split('T')[0];
    res.send(user);
  }

}

export default new crudUser()