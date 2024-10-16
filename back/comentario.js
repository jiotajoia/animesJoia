"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comentario = void 0;
class Comentario {
    constructor(id, titulo, conteudo, data) {
        this.qtdCurtidas = 0;
        this.qtdDescurtidas = 0;
        this.id = id;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.data = data;
    }
    getID() {
        return this.id;
    }
    getTitulo() {
        return this.titulo;
    }
    getConteudo() {
        return this.conteudo;
    }
    getData() {
        return this.data;
    }
    getQtdCurtidas() {
        return this.qtdCurtidas;
    }
    getQtdDescurtidas() {
        return this.qtdDescurtidas;
    }
    setTitulo(novoTitulo) {
        this.titulo = novoTitulo;
    }
    setConteudo(novoConteudo) {
        this.conteudo = novoConteudo;
    }
    setQtdCurtidas(novaQtd) {
        this.qtdCurtidas = novaQtd;
    }
    setQtdDescurtidas(novaQtd) {
        this.qtdDescurtidas = novaQtd;
    }
}
exports.Comentario = Comentario;
