import User from "../model/User";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const crypto = require('crypto');

class crudUser {

  async store(req, res) {

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

    const user = await User.findById(id);

    if (user.fotoUsuario) {
      const imagePath = path.resolve(__dirname, '..', 'front', 'assets', 'media', 'uploads', user.fotoUsuario);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
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

  async logout(req, res) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
  }

  //Para ver se o usuario está logado
  async checkLogin(req, res) {
    if (req.session && req.session.userId) {
      res.json({ loggedIn: true, id: req.session.userId });
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



  //Puxar os dados do usuario, um GET pra usuarios(individual)
  async getUserDataBody(req, res) {
    const { id } = req.headers;
    if (!id) {
      return res.status(401).send({ error: 'Usuário não autenticado' });
    }

    const user = await User.findById(id);
    return res.send(user);
  }


  
  async requestPasswordReset(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const resetToken = {
      value: crypto.createHash('sha256').update(token).digest('hex'),
      createdAt: Date.now()
    };

    user.passwordResetToken = resetToken;
    await user.save();

    const now = Date.now();
    const tokenAge = now - user.passwordResetToken.createdAt;
    const tokenExpirationTime = 5 * 60 * 1000;

    if (tokenAge > tokenExpirationTime) {
      return res.status(400).json({ error: 'Token expirado' });
    }

    //Ethereal para testes
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'rahsaan.kunze@ethereal.email',
        pass: 'kvN7pZgxcfk9XbFdEm'
      }
    });

    const mailOptions = {
      from: 'contasenacintegrador@gmail.com',
      to: email,
      subject: 'Link de redefinição de senha',
      text: `Você solicitou a redefinição de senha. Por favor, clique no seguinte link para redefinir sua senha: \n\n http://localhost:3333/recuperarSenha?token=${token}`
    };

    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log('Erro ao enviar e-mail', error);
      } else {
        console.log('E-mail enviado com sucesso');
      }
    });

    return res.json({ message: 'Verifique seu e-mail para redefinir sua senha.' });
  }

  async resetPassword(req, res) {
    const { token, newPassword } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ 'passwordResetToken.value': hashedToken });
    
    if (!user) {
      return res.status(400).json({ error: 'Token inválido' });
    }

    user.senhaCadastro = bcrypt.hashSync(newPassword, 8);
    user.passwordResetToken = undefined;
    await user.save();

    return res.json({ message: 'Senha redefinida com sucesso.' });
  }



}


export default new crudUser()