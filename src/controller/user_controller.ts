// arquivo de controle 
// 1. receber requisições HTTP
// 2. validar dados
// 3. validar regras de negócios 
// 4. comunicar com a camada MODEL 

import { Request, Response } from "express";
import { getByEmail, getByEmailAndPassword, insert, Users } from "../models/users";
// import { getByEmail, insert, User } from "../models/user";
// Parte  1 -> funções que carregam páginas

// função que carregar a página login

export  function show_login(req: Request, res: Response) {
  res.render('login', {
      message: null
});
}

export async function register(req: Request, res: Response) {
  const {  name, email, password } = req.body;

  if ( !name || !email || !password ) {
      console.log({
          message: {
              type: 'error',
              value: 'Preencha corretamente os dados!',
              title: 'dados invalídos'
          }
      });
      return res.render('login', {
          message: {
              type: 'error',
              value: 'Preencha corretamente os dados!',
              title: 'dados invalídos'
          }
      });
  }
  
  const userFounded = await getByEmail(email);

  if (userFounded) {
      console.log({
          message: {
              type: 'error',
               value: 'E-mail já cadastrado',
              title: 'dados invalídos'
          }
      });
      return res.render('login', {
          message: {
              type: 'error',
               value: 'E-mail já cadastrado',
              title: 'dados invalídos'
          }
      });
  }

  const user: Users={
      name,
      email,
      password,
      
  };

  await insert (user)
  console.log('aqui.........................')
   res.render('login', {
       message: {
              type: 'sucess',
               value: 'usuário cadastrado com sucesso',
              title: 'Sucesso'
       }
   });
}
export async function login(req: Request, res: Response) {
  const {  email, senha } = req.body;

  if ( !email || !senha ) {
      return res.render('login', {
          message: {
              type: 'error',
              value: 'Preencha todos os campos corretamente !',
              title: 'dados invalídos'
          }
      });
  }

  const user = await getByEmailAndPassword(email, senha);

  if ( !user) {
      return res.render('login', {
          message: {
              type: 'error',
              value: 'e-mail ou senha incorretos !',
              title: 'dados invalídos'
          }
      });
  }

  (req.session as any).user = {
      name: user.name,
      email: user.email,
      id: user.id
  }

  return res.redirect('/adm');

}




