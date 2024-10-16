const express = require('express');
const { Request, Response, NextFunction } = require('express');
const cors = require('cors')
// const flash = require('connect-flash');
import { RepositorioDeAnimes } from './repositorioDeAnimes';
import { Anime } from './anime'; 
import { NextFunction, Request, Response } from 'express';
// const mongoose =  require('mongoose');
// const usuarios = require('./routes/usuarios')
// import session from 'express-session';
// import passport from 'passport';
// import auth from './config/auth.js'
// auth(passport);

const app = express();

let repositorio1: RepositorioDeAnimes = new RepositorioDeAnimes();
repositorio1.povoar();

app.use(express.json());
app.use(cors());

const PATH_ANIMES: string = '/animesjoia/animes'; 
const PATH_BUSCAR: string = PATH_ANIMES + '/buscar';
const PATH_IDANIME: string = PATH_ANIMES + '/:id';
const PATH_CURTIR_ANIME = PATH_IDANIME + '/curtir';
const PATH_R_CURTIR_ANIME = PATH_IDANIME + '/r_curtir';
const PATH_COMENTARIOS: string = PATH_IDANIME + '/comentarios'
const PATH_COMENTARIOS_ID: string = PATH_COMENTARIOS + '/:id2';
const PATH_CURTIR_comentario = PATH_COMENTARIOS_ID + '/curtir';
const PATH_R_CURTIR_comentario = PATH_COMENTARIOS_ID + '/r_curtir';
const PATH_DESCURTIR_comentario = PATH_COMENTARIOS_ID + '/descurtir';
const PATH_R_DESCURTIR_comentario = PATH_COMENTARIOS_ID + '/r_descurtir';

//sessao
// app.use(session({
//     secret: "animesjoia",
//     resave: true,
//     saveUninitialized: true
// }));

// app.use(passport.initialize())
// app.use(passport.session())

// app.use(flash());

//Configurando middleware
// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.locals.success_msg = req.flash("success_msg");
//     res.locals.error_msg = req.flash("error_msg");
//     res.locals.error = req.flash("error");
//     next();
// });

//animes--------------------------
//mostrar todos os animes
app.get(PATH_ANIMES,(req:Request,res:Response)=>{
    let animes: Anime[] = repositorio1.getAnimes();
    res.json(animes);
});

//obter 1 anime

app.get(PATH_IDANIME,(req:Request,res:Response)=>{
    const idAnime = parseInt(req.params.id);
    let anime = repositorio1.consultarAnime(idAnime);
    if (anime) {
        res.json(anime);
    }else{
        res.status(404).json({ message: 'Anime não encontrado'});
    }
});

//obter animes através de um filtro

app.post(PATH_BUSCAR,(req:Request,res:Response)=>{
    const {valor, atributo} = req.body;
    let animes = repositorio1.consultarAnimeAtributo(atributo, valor);
    if (animes) {
        res.json(animes);
    }else{
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});

//adcionar anime

app.post(PATH_ANIMES,(req:Request,res:Response)=>{
    const { nome, descricao, imagem, genero, autor} = req.body;
    repositorio1.incluirAnime(nome, descricao, new Date().toString().slice(4,25), imagem, genero, autor);
});

//deletar  anime
app.delete(PATH_IDANIME, (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    let ok = repositorio1.removerAnime(id);
    if (ok) {
        res.status(200).json({ message: 'Anime excluído com sucesso' });
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});

//alterar anime
app.put(PATH_IDANIME, (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    const { nome, descricao, imagem, genero, autor} = req.body;

    let ok = repositorio1.alterarAnime(id, nome, descricao, imagem, genero, autor);
    if (ok) {
        res.status(200).json({ message: 'Anime alterado' });
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});

//curtir anime 
app.post(PATH_CURTIR_ANIME, (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    let curtidas = repositorio1.curtirAnime(id);
    if (curtidas) {
        res.status(200).json({ message: 'Anime curtido',curtidas });
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//remover curtida de anime 
app.post(PATH_R_CURTIR_ANIME, (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    let curtidas = repositorio1.R_curtirAnime(id);
    if (curtidas) {
        res.status(200).json({ message: 'curtida removida',curtidas });
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});

//comentarios------------------------

//mostrar todos os comentarios
app.get(PATH_COMENTARIOS,(req:Request,res:Response)=>{
    const idAnime = parseInt(req.params.id);
    let anime = repositorio1.consultarAnime(idAnime)

    if (anime){
        res.json(anime.getComentarios());
        res.status(200).json({ message: 'Comentarios encontrados' });
    }else{
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//devolve 1 comentario
app.get(PATH_COMENTARIOS_ID,(req:Request,res:Response)=>{
    const idAnime = parseInt(req.params.id);
    let anime = repositorio1.consultarAnime(idAnime);
    if (anime) {
        const idCommentario = parseInt(req.params.id2);
        let comentario = anime.consultarComentario(idCommentario);
        if (comentario){
            res.json(comentario);
        }else{
            res.status(404).json({ message: 'Comentario não encontrado' });
        }
    }else{
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//adcionar  comentario

app.post(PATH_COMENTARIOS,(req:Request,res:Response)=>{
    const { titulo, conteudo} = req.body;

    const idAnime = parseInt(req.params.id);
    let anime = repositorio1.consultarAnime(idAnime);

    if (anime) {
        anime.incluirComentario(titulo, conteudo, new Date().toString().slice(4,25));
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});


//remover comentario
app.delete(PATH_COMENTARIOS_ID, (req: Request, res: Response)=>{
    const idAnime = parseInt(req.params.id);
    let anime = repositorio1.consultarAnime(idAnime);
    if (anime) {
        const idCommentario = parseInt(req.params.id2);
        let comentario = anime.removerComentario(idCommentario);
        if (comentario){
            res.status(200).json({ message: 'Anime excluído com sucesso'});
        }else{
            res.status(404).json({ message: 'Comentario não encontrado' });
        }
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});

//alterar comentario
app.put(PATH_COMENTARIOS_ID, (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    const { novoTitulo, novoConteudo} = req.body;
    let anime = repositorio1.consultarAnime(id);

    if (anime) {
        const idComment = parseInt(req.params.id2);
        let ok = anime.alterarComentario(idComment, novoTitulo, novoConteudo);
        if (ok) {
            res.status(200).json({ message: 'Comentario alterado' });
        } else {
            res.status(404).json({ message: 'Erro ao alterar comentario.' });
        }
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});

//curtir comentario
app.post(PATH_CURTIR_comentario, (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    let anime = repositorio1.consultarAnime(id);
    if (anime) {
        const idComment = parseInt(req.params.id2);
        let curtidas = anime.curtirComentario(idComment);
        if (curtidas){
            res.status(200).json({ message: 'Anime curtido',curtidas });
        }else{
            res.status(404).json({ message: 'erro ao curtir' });
        }
        
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//remover curtida comentario
app.post(PATH_R_CURTIR_comentario, (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    let anime = repositorio1.consultarAnime(id);
    if (anime) {
        const idComment = parseInt(req.params.id2);
        let curtidas = anime.RCurtirComentario(idComment);
        if (curtidas){
            res.status(200).json({ message: 'curtida removida',curtidas });
        }else{
            res.status(404).json({ message: 'erro ao curtir' });
        }
        
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});

//descurtir comentario
app.post(PATH_DESCURTIR_comentario, (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    let anime = repositorio1.consultarAnime(id);
    if (anime) {
        const idComment = parseInt(req.params.id2);
        let curtidas = anime.descurtirComentario(idComment);
        if (curtidas){
            res.status(200).json({ message: 'Anime curtido',curtidas });
        }else{
            res.status(404).json({ message: 'erro ao curtir' });
        }
        
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});

//remover descurtir comentario
app.post(PATH_R_DESCURTIR_comentario, (req: Request, res: Response)=>{
    const id = parseInt(req.params.id);
    let anime = repositorio1.consultarAnime(id);
    if (anime) {
        const idComment = parseInt(req.params.id2);
        let curtidas = anime.RDescurtirComentario(idComment);
        if (curtidas){
            res.status(200).json({ message: 'Anime curtido',curtidas });
        }else{
            res.status(404).json({ message: 'erro ao curtir' });
        }
        
    } else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});


//rotas para usuario
// app.use('/usuario', usuarios);

//--------server--------
app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});
