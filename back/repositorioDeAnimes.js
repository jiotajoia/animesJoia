"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDeAnimes = void 0;
const anime_1 = require("./anime");
class RepositorioDeAnimes {
    constructor() {
        this.animes = [];
        this.animeID = 1;
    }
    getAnimes() {
        return this.animes;
    }
    incluirAnime(nome, descricao, data, imagem, genero, autor) {
        let anime1 = new anime_1.Anime(this.animeID, nome, descricao, data, imagem, genero, autor);
        this.animeID++;
        this.animes.push(anime1);
    }
    consultarAnime(IDanime) {
        let aProcurado = null;
        for (let aAtual of this.animes) {
            if (aAtual.getID() == IDanime) {
                aProcurado = aAtual;
                break;
            }
        }
        return aProcurado;
    }
    consultarAnimeAtributo(atributo, valor) {
        let aProcurado = [];
        for (let anime of this.animes) {
            if ((atributo == "titulo" && anime.getNome().toLowerCase().includes(valor.toLowerCase())) || (atributo == "genero" && anime.getGenero() == valor) || (atributo == "autor" && anime.getAutor().toLowerCase().includes(valor.toLowerCase()))) {
                aProcurado.push(anime);
            }
        }
        return aProcurado;
    }
    removerAnime(id) {
        if (this.consultarAnime(id)) {
            for (let indice = 0; indice < this.animes.length; indice++) {
                if (this.animes[indice].getID() == id) {
                    this.animes.splice(indice, 1);
                    return true;
                }
            }
        }
        return false;
    }
    alterarAnime(id, novoNome, novoDesc, imagem, novoGenero, novoAutor) {
        let anime = this.consultarAnime(id);
        if (anime) {
            anime.setNome(novoNome);
            anime.setDescricao(novoDesc);
            anime.setImagem(imagem);
            anime.setGenero(novoGenero);
            anime.setAutor(novoAutor);
            return true;
        }
        return false;
    }
    curtirAnime(id) {
        let anime = this.consultarAnime(id);
        if (anime) {
            anime.setQtdCurtidas(anime.getQtdCurtidas() + 1);
            return anime.getQtdCurtidas();
        }
        return null;
    }
    R_curtirAnime(id) {
        let anime = this.consultarAnime(id);
        if (anime) {
            anime.setQtdCurtidas(anime.getQtdCurtidas() - 1);
            return anime.getQtdCurtidas();
        }
        return null;
    }
    povoar() {
        var _a, _b, _c, _d, _e, _f;
        this.incluirAnime('jujutsu kaisen', 'anime de poderzinho', new Date().toString().slice(4, 25), 'https://ovicio.com.br/wp-content/uploads/2024/07/20240716-jujutsu-kaisen-ovicio.webp', 'ação', 'gege akutami');
        this.incluirAnime('haikyuu', 'anime de volei', new Date().toString().slice(4, 25), 'https://sm.ign.com/ign_br/screenshot/default/haikyu-1_arwc.jpg', 'esporte', 'volei');
        this.incluirAnime('iruma kun', 'anime de capetinhas', new Date().toString().slice(4, 25), 'https://m.media-amazon.com/images/S/pv-target-images/5761c37e4e5d6b422d20ef3aae69845820f3752a63ee7c3c0af3230f8baa1d4d.jpg', 'isekai', 'jitajoia');
        this.incluirAnime('devilman', 'anime de odio', new Date().toString().slice(4, 25), 'https://i0.wp.com/cromossomonerd.com.br/wp-content/uploads/2018/01/DPMA97tUEAAesMc.jpg?fit=3992%2C2320&ssl=1', 'aventura', 'homem daibo');
        (_a = this.consultarAnime(2)) === null || _a === void 0 ? void 0 : _a.incluirComentario('volei legal', 'volei muito legal', new Date().toString().slice(4, 25));
        (_b = this.consultarAnime(2)) === null || _b === void 0 ? void 0 : _b.incluirComentario('muito real', 'oikawa é o reizinho', new Date().toString().slice(4, 25));
        (_c = this.consultarAnime(1)) === null || _c === void 0 ? void 0 : _c.incluirComentario('volta gojo', 'ele vai voltar', new Date().toString().slice(4, 25));
        (_d = this.consultarAnime(1)) === null || _d === void 0 ? void 0 : _d.incluirComentario('subuxa', 'rei dos roteiros', new Date().toString().slice(4, 25));
        (_e = this.consultarAnime(3)) === null || _e === void 0 ? void 0 : _e.incluirComentario('4 temporada?', '4 temporada quando veir T-T', new Date().toString().slice(4, 25));
        (_f = this.consultarAnime(3)) === null || _f === void 0 ? void 0 : _f.incluirComentario('azz-kun', 'lindo, apenas', new Date().toString().slice(4, 25));
    }
}
exports.RepositorioDeAnimes = RepositorioDeAnimes;
