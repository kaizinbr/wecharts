import { Router } from "express";
import 'dotenv/config'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from 'multer';
import { celebrate, Joi, errors, Segments } from 'celebrate';

import uploadConfig from './config/multer.js';
import curriculo from './models/curriculum.js';
import user from './models/usuario.js';

import path from 'path';
import {fileURLToPath} from 'url';

import SendMail from './services/SendMail.js'

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const router = Router();

import { isAuthenticated } from "./middleware/auth.js";


router.post('/curriculum', isAuthenticated, async (req, res) => {
  const retorno = await curriculo.setCurriculo(req.body, req.userId)

  const lastID = retorno.lastIDCurriculo;

  
  res.send({"id": `${lastID}`});
});

router.get('/curriculum', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/curriculum-layout.html'));
});

router.get('/curriculum-infos', (req, res) => {

  curriculo.readAll().then(result => {
    res.send(result)

 });
})

router.get('/curriculum-info/id/:id', isAuthenticated, async (req, res) => {
  const id = parseInt((req.params.id));
  const response = await curriculo.getCurriculo(id)

 res.json(response);
});


router.post('/create-user',  
multer(uploadConfig).single('image'), celebrate({
  [Segments.BODY]: Joi.object().keys({
    login: Joi.string().email().required(),
    senha: Joi.string().min(8),
    confSenha: Joi.string().min(8),
    //image: Joi.optional() // 👈️ usei o optional pq se não colocar nada ele dá erro
  }),
}),  

async (req, res) => {

  console.log(req.body)
  const image = req.file
        ? `/imgs/foods/${req.file.filename}`
        : '/imgs/foods/placeholder.jpg';
  try {
    await SendMail.createNewUser(req.body.login);
  } catch(err) {
    console.error("Erro ao enviar e-mail:" + err)
  } finally {
  //espero que funcione
  const newUser = await user.create({...req.body, image});
  res.send(newUser);
  }

});

router.get('/usuarios-infos', isAuthenticated, async (req, res) => {

  await user.readAll().then(result => {
    res.send(result)
 });
})

router.get('/usuario-info/id/:id', isAuthenticated, async (req, res) => {
  const id = parseInt((req.params.id));
  const response = await user.readById(id)

 res.json(response);
});

router.post('/auth-user', async (req, res) => {
	try {
		const { login, senha } = req.body;
	
	  const token = await user.auth(login, senha);
	
	  res.json(token);
	} catch(error) {
		res.status(401).json({ error: 'User not found' });
	}})

  router.post('/send-curriculum', isAuthenticated, async (req, res) => {
    try {
      const {to, htmlContent} = req.body;
      //console.log(req.body.to)
      await SendMail.sendNewCurriculum(to, htmlContent);
    } catch (error) {
      res.status(401).json({ error: 'Error in send email' });
    }
  })

  router.get('/get-image-user', isAuthenticated, async (req, res) => {
    try {
      const defaultImg = 'https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Download-Free-PNG.png'

      const response = await user.getImage(req.userId);

      // Se response estiver sem imagem, substitui por padrão antes
      if (!(response) || response == "") response = defaultImg; 
      res.json(response);
    } catch (error) {
		  res.status(401).json({ error: 'User not found' });
    }

  })

  router.use(errors());

export default router;

