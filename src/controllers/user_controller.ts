 //Controle 
//1.receber as requições HTTP  
//2.validar os daods 
//3.validar regras de negocio 
//4.comunicar com a camada MODEL

import {Request, Response} from "express";
import { Users, getByEmail, getByEmailAndPassword, insert } from "../models/user";
import { UserRole } from "../enums/user_role";
import { title } from "process";

//Parte 1 -> funções que carregam páginas
//função que carrega a pagina de login

export function show_login (req: Request, res: Response) {
    res.render('login', {
        message: null
    });
}

//carrega a pagina de listagem de usuarios
export function show_list (req: Request, res: Response) {
    res.render('listar_usuario');
}

//Parte 2 -> funções do CRUD

export async function register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.render('login', {
            message: {
                type: 'error',
                value: 'Preencha corretamente os dados!',
                title: 'Dados inválidos'
            }
        });
    }

    const userFounded = await getByEmail(email);
    
    if (userFounded) {
        return res.render('login', {
            message: {
                type: 'error',
                value: 'E-mail já existe',
                title: 'Dados inválidos'
            }
        });  
    }

    const user: Users = {
        name,
        email,
        password,
    };

    await insert (user);

    res.render('login', {
        message: {
            type: 'success',
            value: 'Usuário cadastrado com sucesso',
            title: 'Sucesso'
        }
    });
}   

export async function login (req: Request, res: Response) {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.render('login',  {
            message: {
                type: 'error',
                value: 'preencha todos os campos corretamente',
                title: 'dados invalidos'
            }
        });
    }
    ;
    const user = await getByEmailAndPassword(email, password);

    if (!user) {
        return res.render('login', {
            message: {
                type: 'error',
                value: 'Email ou senha incorretos',
                title: 'Dados inválidos'
            }
        })
    }

    (req.session as any).user = {
        name: user.nome,
        email: user.email,
        id: user.id
    }

    return res.redirect('/adm')
}