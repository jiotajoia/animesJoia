"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anime = void 0;
const comentario_1 = require("./comentario");
class Anime {
    constructor(id, nome, descricao, data, imagem, genero, autor) {
        this.qtdCurtidas = 0;
        this.comentarios = [];
        this.commentID = 1;
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.data = data;
        this.imagem = imagem;
        this.genero = genero;
        this.autor = autor;
    }
    getID() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getDescricao() {
        return this.descricao;
    }
    getQtdCurtidas() {
        return this.qtdCurtidas;
    }
    getData() {
        return this.data;
    }
    getImagem() {
        return this.imagem;
    }
    getGenero() {
        return this.genero;
    }
    getAutor() {
        return this.autor;
    }
    getComentarios() {
        return this.comentarios;
    }
    setNome(novoNome) {
        this.nome = novoNome;
    }
    setDescricao(novaDesc) {
        this.descricao = novaDesc;
    }
    setImagem(novaImagem) {
        this.imagem = novaImagem;
    }
    setQtdCurtidas(novaQtd) {
        this.qtdCurtidas = novaQtd;
    }
    setGenero(novo) {
        this.genero = novo;
    }
    setAutor(novo) {
        this.autor = novo;
    }
    incluirComentario(titulo, conteudo, data) {
        let comentario1 = new comentario_1.Comentario(this.commentID, titulo, conteudo, data);
        this.commentID++;
        this.comentarios.push(comentario1);
    }
    consultarComentario(idComentario) {
        let coProcurado = null;
        for (let coAtual of this.comentarios) {
            if (coAtual.getID() == idComentario) {
                coProcurado = coAtual;
                break;
            }
        }
        return coProcurado;
    }
    removerComentario(id) {
        if (this.consultarComentario(id)) {
            for (let indice = 0; indice < this.comentarios.length; indice++) {
                if (this.comentarios[indice].getID() == id) {
                    this.comentarios.splice(indice, 1);
                    return true;
                }
            }
        }
        return false;
    }
    alterarComentario(id, novoTitulo, novoConteudo) {
        let comentario = this.consultarComentario(id);
        if (comentario) {
            comentario.setTitulo(novoTitulo);
            comentario.setConteudo(novoConteudo);
            return true;
        }
        return false;
    }
    curtirComentario(id) {
        let comentario = this.consultarComentario(id);
        if (comentario) {
            comentario.setQtdCurtidas(comentario.getQtdCurtidas() + 1);
            return comentario.getQtdCurtidas();
        }
        return null;
    }
    RCurtirComentario(id) {
        let comentario = this.consultarComentario(id);
        if (comentario) {
            comentario.setQtdCurtidas(comentario.getQtdCurtidas() - 1);
            return comentario.getQtdCurtidas();
        }
        return null;
    }
    descurtirComentario(id) {
        let comentario = this.consultarComentario(id);
        if (comentario) {
            comentario.setQtdDescurtidas(comentario.getQtdDescurtidas() + 1);
            return comentario.getQtdDescurtidas();
        }
        return null;
    }
    RDescurtirComentario(id) {
        let comentario = this.consultarComentario(id);
        if (comentario) {
            comentario.setQtdDescurtidas(comentario.getQtdDescurtidas() - 1);
            return comentario.getQtdDescurtidas();
        }
        return null;
    }
}
exports.Anime = Anime;
