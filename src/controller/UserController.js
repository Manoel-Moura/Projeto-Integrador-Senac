import User from "../model/User";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import Receita from "../model/Receita";

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
        return res.status(400).json({ error: 'As senhas não correspondem' });
      }
  
      let usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ error: 'Um usuário com este nome de usuário já existe' });
      }
  
      let emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ error: 'Um usuário com este email já existe' });
      }
  
      let cpfExists = await User.findOne({ cpf });
      if (cpfExists) {
        return res.status(400).json({ error: 'Um usuário com este CPF já existe' });
      }
  
      let userCadastra = await User.create({
        username,
        email,
        senhaCadastro: senhaCadastroCriptografada,
        cpf,
        data,
        fotoUsuario: 'user.png',
        celular,
        telefone,
        genero
      });
  
      return res.json({ userCadastra });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao tentar criar o usuário' });
    }
  }
  

  async edit(req, res) {
    const { userId } = req.session;
  
    const user = await User.findById(userId);
  
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
  
    const { username, data, celular, telefone, genero } = req.body;
  
    if (!username) {
      return res.status(400).json({ error: 'Por favor, preencha o campo Nome de usuário' });
    }
  
    const usernameExists = await User.findOne({ username });
    if (usernameExists && String(usernameExists._id) !== String(userId)) {
      return res.status(409).json({ error: 'Um usuário com este nome de usuário já existe' });
    }
  
    if (req.file && user.fotoUsuario && user.fotoUsuario !== 'user.png') {
      const oldImagePath = path.resolve(__dirname, '..', 'front', 'assets', 'media', 'uploads', user.fotoUsuario);
  
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
  
    user.username = username;
    user.data = data;
    user.fotoUsuario = req.file ? req.file.filename : user.fotoUsuario;
    user.celular = celular;
    user.telefone = telefone;
    user.genero = genero;
  
    await user.save();
  
    return res.json(user);
  }



  async show(req, res) { // GET
    let users = await User.find()
    return res.json(users)

  }


  async delete(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.json({ error: 'ID é requisitos' });
    }

    const user = await User.findById(id);

    if (user.fotoUsuario && user.fotoUsuario !== 'user.png') {
      const imagePath = path.resolve(__dirname, '..', 'front', 'assets', 'media', 'uploads', user.fotoUsuario);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const receitas = await Receita.find({ user: id });
    for (let receita of receitas) {
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

      await Receita.findByIdAndDelete(receita._id);
    }

    const deletedUser = await User.findByIdAndDelete(id);
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      } else {
        return res.json({ message: 'Usuario e suas receitas foram deletados com sucesso!' });
      }
    });
  }


  async login(req, res) {
    const { email, password } = req.body;
  
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email não encontrado' });
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

    // Configurações do servidor de e-mail
    const transporter = nodemailer.createTransport({
      host: 'h58.servidorhh.com',
      port: 587,
      auth: {
        user: 'suporte_senac@apptop.com.br',
        pass: '1Qazxsw@2'
      }
    });

    const mailOptions = {
      from: 'suporte_senac@apptop.com.br',
      to: email,
      subject: 'Link de redefinição de senha',
      html: `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Redefinição de Senha - Senac </title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              body {
                  font-family: sans-serif;
                  font-size: 16px;
                  line-height: 1.5;
                  color: #333;
                  background-color: #f7f7f7;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .logo {
                  max-width: 150px;
                  margin: 0 auto;
              }
              .titulo {
                  font-size: 24px;
                  font-weight: bold;
                  color: #01468a;
                  margin-top: 10px;
              }
              .conteudo {
                  line-height: 1.8;
              }
              .texto {
                  margin-bottom: 20px;
              }
              .link {
                  color: #01468a;
                  font-weight: bold;
                  text-decoration: none;
              }
              .assinatura {
                  text-align: center;
                  margin-top: 20px;
              }
              .rodape {
                  font-size: 12px;
                  color: #999;
                  margin-top: 10px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
              <img src="cid:logo@senac.com" alt="Logo do Senac" class="logo">
              <h1 class="titulo">Redefinição de Senha</h1>
              </div>
              <div class="conteudo">
                  <p class="texto">
                      Olá! Você solicitou a redefinição de senha para sua conta no site de receitas do Senac.
                  </p>
                  <p class="texto">
                      Para redefinir sua senha, clique no link abaixo:
                  </p>
                  <p>
                      <a href="http://3.145.132.216/recuperarSenha?token=${token}" class="link">Redefinir Senha</a>
                  </p>
                  <p class="texto">
                      Este link é válido durante os próximos 5 minutos. Se você não o utilizar nesse período, será necessário solicitar uma nova redefinição de senha.
                  </p>
              </div>
              <div class="assinatura">
                  <p>Atenciosamente,</p>
                  <p>Equipe Senac</p>
              </div>
              <div class="rodape">
                  &copy; Senac - Todos os direitos reservados.
              </div>
          </div>
      </body>
      </html>      
      `,
      attachments: [
        {
          filename: 'Senac_logo.jpg',
          path: './src/front/assets/media/images/Senac_logo.jpg',
          cid: 'logo@senac.com'
        }
      ]
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


  async rankingChefs(req, res) {
    try {
      const users = await User.find();
      const rankingChefs = await Promise.all(users.map(async (user) => {
        const receitas = await Receita.find({ user: user._id });

        let totalCurtidas = 0;
        let curtidasTrend = 0;
        const seteDias = Date.now() - 7 * 24 * 60 * 60 * 1000;
        for (let receita of receitas) {
          totalCurtidas += receita.curtidas.length;

          for (let curtida of receita.curtidas) {
            if (curtida.data >= seteDias) {
              curtidasTrend++;
            }
          }
        }

        return { chef: user.username, fotoChef: user.fotoUsuario, totalCurtidas, curtidasTrend, chefID: user._id };
      }));

      return res.json(rankingChefs);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar os dados dos usuários' });
    }
  }

  async checkModerador(req, res) {
    if (req.session && req.session.userId) {
      // Buscar o usuário no banco de dados
      const user = await User.findById(req.session.userId);
      if (user && user.moderador) {
        res.json({ moderador: true, id: req.session.userId });
      } else {
        res.json({ moderador: false });
      }
    } else {
      res.json({ loggedIn: false });
    }
  }
  
  async tornarModerador(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      user.moderador = true;
      await user.save();
  
      res.json({ message: 'Usuário atualizado para moderador' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o usuário' });
    }
  }
  

}


export default new crudUser()