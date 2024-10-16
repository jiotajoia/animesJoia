"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var _a = require('express'), Request = _a.Request, Response = _a.Response, NextFunction = _a.NextFunction;
var cors = require('cors');
// const flash = require('connect-flash');
var repositorioDeAnimes_1 = require("./repositorioDeAnimes");
// const mongoose =  require('mongoose');
// const usuarios = require('./routes/usuarios')
// import session from 'express-session';
// import passport from 'passport';
// import auth from './config/auth.js'
// auth(passport);
var app = express();
var repositorio1 = new repositorioDeAnimes_1.RepositorioDeAnimes();
repositorio1.povoar();
app.use(express.json());
app.use(cors({
    origin: 'https://jiotajoia.github.io'
}));
app.use(cors());
var PATH_ANIMES = '/animesjoia/animes';
var PATH_BUSCAR = PATH_ANIMES + '/buscar';
var PATH_IDANIME = PATH_ANIMES + '/:id';
var PATH_CURTIR_ANIME = PATH_IDANIME + '/curtir';
var PATH_R_CURTIR_ANIME = PATH_IDANIME + '/r_curtir';
var PATH_COMENTARIOS = PATH_IDANIME + '/comentarios';
var PATH_COMENTARIOS_ID = PATH_COMENTARIOS + '/:id2';
var PATH_CURTIR_comentario = PATH_COMENTARIOS_ID + '/curtir';
var PATH_R_CURTIR_comentario = PATH_COMENTARIOS_ID + '/r_curtir';
var PATH_DESCURTIR_comentario = PATH_COMENTARIOS_ID + '/descurtir';
var PATH_R_DESCURTIR_comentario = PATH_COMENTARIOS_ID + '/r_descurtir';
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
app.get(PATH_ANIMES, function (req, res) {
    var animes = repositorio1.getAnimes();
    res.json(animes);
});
//obter 1 anime
app.get(PATH_IDANIME, function (req, res) {
    var idAnime = parseInt(req.params.id);
    var anime = repositorio1.consultarAnime(idAnime);
    if (anime) {
        res.json(anime);
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//obter animes através de um filtro
app.post(PATH_BUSCAR, function (req, res) {
    var _a = req.body, valor = _a.valor, atributo = _a.atributo;
    var animes = repositorio1.consultarAnimeAtributo(atributo, valor);
    if (animes) {
        res.json(animes);
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//adcionar anime
app.post(PATH_ANIMES, function (req, res) {
    var _a = req.body, nome = _a.nome, descricao = _a.descricao, imagem = _a.imagem, genero = _a.genero, autor = _a.autor;
    repositorio1.incluirAnime(nome, descricao, new Date().toString().slice(4, 25), imagem, genero, autor);
});
//deletar  anime
app.delete(PATH_IDANIME, function (req, res) {
    var id = parseInt(req.params.id);
    var ok = repositorio1.removerAnime(id);
    if (ok) {
        res.status(200).json({ message: 'Anime excluído com sucesso' });
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//alterar anime
app.put(PATH_IDANIME, function (req, res) {
    var id = parseInt(req.params.id);
    var _a = req.body, nome = _a.nome, descricao = _a.descricao, imagem = _a.imagem, genero = _a.genero, autor = _a.autor;
    var ok = repositorio1.alterarAnime(id, nome, descricao, imagem, genero, autor);
    if (ok) {
        res.status(200).json({ message: 'Anime alterado' });
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//curtir anime 
app.post(PATH_CURTIR_ANIME, function (req, res) {
    var id = parseInt(req.params.id);
    var curtidas = repositorio1.curtirAnime(id);
    if (curtidas) {
        res.status(200).json({ message: 'Anime curtido', curtidas: curtidas });
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//remover curtida de anime 
app.post(PATH_R_CURTIR_ANIME, function (req, res) {
    var id = parseInt(req.params.id);
    var curtidas = repositorio1.R_curtirAnime(id);
    if (curtidas) {
        res.status(200).json({ message: 'curtida removida', curtidas: curtidas });
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//comentarios------------------------
//mostrar todos os comentarios
app.get(PATH_COMENTARIOS, function (req, res) {
    var idAnime = parseInt(req.params.id);
    var anime = repositorio1.consultarAnime(idAnime);
    if (anime) {
        res.json(anime.getComentarios());
        res.status(200).json({ message: 'Comentarios encontrados' });
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//devolve 1 comentario
app.get(PATH_COMENTARIOS_ID, function (req, res) {
    var idAnime = parseInt(req.params.id);
    var anime = repositorio1.consultarAnime(idAnime);
    if (anime) {
        var idCommentario = parseInt(req.params.id2);
        var comentario = anime.consultarComentario(idCommentario);
        if (comentario) {
            res.json(comentario);
        }
        else {
            res.status(404).json({ message: 'Comentario não encontrado' });
        }
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//adcionar  comentario
app.post(PATH_COMENTARIOS, function (req, res) {
    var _a = req.body, titulo = _a.titulo, conteudo = _a.conteudo;
    var idAnime = parseInt(req.params.id);
    var anime = repositorio1.consultarAnime(idAnime);
    if (anime) {
        anime.incluirComentario(titulo, conteudo, new Date().toString().slice(4, 25));
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//remover comentario
app.delete(PATH_COMENTARIOS_ID, function (req, res) {
    var idAnime = parseInt(req.params.id);
    var anime = repositorio1.consultarAnime(idAnime);
    if (anime) {
        var idCommentario = parseInt(req.params.id2);
        var comentario = anime.removerComentario(idCommentario);
        if (comentario) {
            res.status(200).json({ message: 'Anime excluído com sucesso' });
        }
        else {
            res.status(404).json({ message: 'Comentario não encontrado' });
        }
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//alterar comentario
app.put(PATH_COMENTARIOS_ID, function (req, res) {
    var id = parseInt(req.params.id);
    var _a = req.body, novoTitulo = _a.novoTitulo, novoConteudo = _a.novoConteudo;
    var anime = repositorio1.consultarAnime(id);
    if (anime) {
        var idComment = parseInt(req.params.id2);
        var ok = anime.alterarComentario(idComment, novoTitulo, novoConteudo);
        if (ok) {
            res.status(200).json({ message: 'Comentario alterado' });
        }
        else {
            res.status(404).json({ message: 'Erro ao alterar comentario.' });
        }
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//curtir comentario
app.post(PATH_CURTIR_comentario, function (req, res) {
    var id = parseInt(req.params.id);
    var anime = repositorio1.consultarAnime(id);
    if (anime) {
        var idComment = parseInt(req.params.id2);
        var curtidas = anime.curtirComentario(idComment);
        if (curtidas) {
            res.status(200).json({ message: 'Anime curtido', curtidas: curtidas });
        }
        else {
            res.status(404).json({ message: 'erro ao curtir' });
        }
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//remover curtida comentario
app.post(PATH_R_CURTIR_comentario, function (req, res) {
    var id = parseInt(req.params.id);
    var anime = repositorio1.consultarAnime(id);
    if (anime) {
        var idComment = parseInt(req.params.id2);
        var curtidas = anime.RCurtirComentario(idComment);
        if (curtidas) {
            res.status(200).json({ message: 'curtida removida', curtidas: curtidas });
        }
        else {
            res.status(404).json({ message: 'erro ao curtir' });
        }
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//descurtir comentario
app.post(PATH_DESCURTIR_comentario, function (req, res) {
    var id = parseInt(req.params.id);
    var anime = repositorio1.consultarAnime(id);
    if (anime) {
        var idComment = parseInt(req.params.id2);
        var curtidas = anime.descurtirComentario(idComment);
        if (curtidas) {
            res.status(200).json({ message: 'Anime curtido', curtidas: curtidas });
        }
        else {
            res.status(404).json({ message: 'erro ao curtir' });
        }
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//remover descurtir comentario
app.post(PATH_R_DESCURTIR_comentario, function (req, res) {
    var id = parseInt(req.params.id);
    var anime = repositorio1.consultarAnime(id);
    if (anime) {
        var idComment = parseInt(req.params.id2);
        var curtidas = anime.RDescurtirComentario(idComment);
        if (curtidas) {
            res.status(200).json({ message: 'Anime curtido', curtidas: curtidas });
        }
        else {
            res.status(404).json({ message: 'erro ao curtir' });
        }
    }
    else {
        res.status(404).json({ message: 'Anime não encontrado' });
    }
});
//rotas para usuario
// app.use('/usuario', usuarios);
//--------server--------
app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000");
});
