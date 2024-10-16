import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UsuarioModel } from '../models/usuarioModel'; // Certifique-se de que você está exportando o modelo corretamente
import passport, { Passport } from 'passport';

const router = express.Router();

// Rota para registro
router.get('/registro', (req: Request, res: Response) => {
    res.render('usuarios/registro');
});

// Rota para registrar um novo usuário
router.post('/registro', async (req: Request, res: Response) => {
    const erros: { texto: string }[] = [];

    // Validações
    if (!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
        erros.push({ texto: "nome inválido" });
    }

    if (!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        erros.push({ texto: "email inválido" });
    }

    if (!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
        erros.push({ texto: "senha inválida" });
    }

    if (req.body.senha.length < 4) {
        erros.push({ texto: "senha curta demais" });
    }

    if (req.body.senha !== req.body.senha2) {
        erros.push({ texto: "as senhas não conferem" });
    }

    if (erros.length > 0) {
        return res.render('usuarios/registro', { erros });
    }

    try {
        const usuarioExistente = await UsuarioModel.findOne({ email: req.body.email });

        if (usuarioExistente) {
            console.log("email já cadastrado");
            return res.redirect('usuarios/registro');
        }

        const novoUsuario = new UsuarioModel({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        });

        const salt = await bcrypt.genSalt(10);
        novoUsuario.senha = await bcrypt.hash(novoUsuario.senha, salt);

        await novoUsuario.save();
        console.log("Usuário cadastrado com sucesso!");
        res.redirect('/login');

    } catch (error) {
        console.log("Houve um erro ao registrar o usuário");
        res.redirect('/usuarios/registro');
    }
});

// Rota para login
router.get('/login', (req: Request, res: Response) => {
    res.render('usuarios/login');
});

router.post('/login', (req: Request, res: Response, next: NextFunction)=>{
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true
    })(req, res, next)
})

export default router;
