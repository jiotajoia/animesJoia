"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiUrlAnime = 'http://localhost:3000/animesjoia/animes';
const apiUrlComentario = 'http://localhost:3000/animesjoia/animes/:id/comentarios';
function adicionarAnime() {
    return __awaiter(this, void 0, void 0, function* () {
        let tituloInput = document.querySelector('#adc_ani_titulo');
        let descInput = document.querySelector('#adc_ani_desc');
        let generoInput = document.querySelector('#adc_ani_genero');
        let imgInput = document.querySelector('#adc_ani_img');
        let autorInput = document.querySelector('#adc_ani_autor');
        if (tituloInput && descInput && generoInput && imgInput && autorInput) {
            let json = {
                nome: tituloInput.value,
                descricao: descInput.value,
                imagem: imgInput.value,
                genero: generoInput.value,
                autor: autorInput.value
            };
            const response = yield fetch(apiUrlAnime, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });
            if (!response.ok) {
                throw new Error(`Erro ao adicionar anime: ${response.statusText}`);
            }
            preencherPadrao();
            tituloInput.value = '';
            descInput.value = '';
            imgInput.value = '';
            generoInput.value = '';
            autorInput.value = '';
            window.location.reload();
        }
    });
}
function adicionarComentario(id, titulo, conteudo) {
    return __awaiter(this, void 0, void 0, function* () {
        let json = {
            titulo: titulo,
            conteudo: conteudo
        };
        const response = yield fetch(`http://localhost:3000/animesjoia/animes/${id}/comentarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });
        if (!response.ok) {
            throw new Error(`Erro ao adicionar comentario: ${response.statusText}`);
        }
        yield preencherPadrao();
        window.location.reload();
    });
}
function excluirComentario(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${apiUrlComentario}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Erro ao excluir comentario: ${response.statusText}`);
            }
            //pro maxine: front pra dizer que foi excluído
        }
        catch (error) {
            //front hein maxine
        }
    });
}
function excluirAnime(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${apiUrlAnime}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Erro ao excluir anime: ${response.statusText}`);
        }
        preencherPadrao();
    });
}
function editarAnime(id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let tituloInput = document.querySelector('#edi_ani_titulo');
        let descInput = document.querySelector('#edi_ani_desc');
        let generoInput = document.querySelector('#edi_ani_genero');
        let imgInput = document.querySelector('#edi_ani_img');
        let autorInput = document.querySelector('#edi_ani_autor');
        if (tituloInput && descInput && generoInput && imgInput && autorInput) {
            let anime = yield getAnimeById(id);
            if (!tituloInput.value) {
                tituloInput.value = anime.nome;
            }
            if (!descInput.value) {
                descInput.value = anime.descricao;
            }
            if (!generoInput.value) {
                generoInput.value = anime.genero;
            }
            if (!imgInput.value) {
                imgInput.value = anime.imagem;
            }
            if (!autorInput.value) {
                autorInput.value = anime.autor;
            }
            let json = {
                nome: tituloInput.value,
                descricao: descInput.value,
                imagem: imgInput.value,
                genero: generoInput.value,
                autor: autorInput.value
            };
            const response = yield fetch(`${apiUrlAnime}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });
            if (!response.ok) {
                throw new Error(`Erro ao editar anime: ${response.statusText}`);
            }
            preencherPadrao();
            tituloInput.value = '';
            descInput.value = '';
            imgInput.value = '';
            generoInput.value = '';
            autorInput.value = '';
            let div_edita_anime = document.getElementById('div_edita_anime');
            div_edita_anime === null || div_edita_anime === void 0 ? void 0 : div_edita_anime.classList.add('oculto');
            (_a = document.getElementById('editaAnime')) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', () => {
                editarAnime(id);
            });
            window.location.reload();
        }
    });
}
function mostrar_editarComentario(id_anime, id_comentario) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let div_edita_com = document.getElementById('div_edita_com');
        div_edita_com === null || div_edita_com === void 0 ? void 0 : div_edita_com.classList.remove('oculto');
        (_a = document.getElementById('butao_edit_com')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            atualizarComentario(id_anime, id_comentario);
        });
    });
}
function mostrar_editarAnime(id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let div_edita_anime = document.getElementById('div_edita_anime');
        div_edita_anime === null || div_edita_anime === void 0 ? void 0 : div_edita_anime.classList.remove('oculto');
        (_a = document.getElementById('editaAnime')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            editarAnime(id);
        });
    });
}
function buscarAnimes() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let valor = (_a = document.querySelector('#barra_pesquisa')) === null || _a === void 0 ? void 0 : _a.value;
        let atributo = (_b = document.querySelector('#filtro_pesquisa')) === null || _b === void 0 ? void 0 : _b.value;
        let json = {
            valor: valor,
            atributo: atributo,
        };
        const response = yield fetch(`${apiUrlAnime}/buscar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json)
        });
        if (!response.ok) {
            throw new Error(`Erro ao buscar anime: ${response.statusText}`);
        }
        let animes = yield response.json();
        listarAnime(animes);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    var _a, _b, _c;
    (_a = document.getElementById('adicionaAnime')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', adicionarAnime);
    (_b = document.getElementById('buscarAnimes')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', buscarAnimes);
    (_c = document.getElementById("barra_pesquisa")) === null || _c === void 0 ? void 0 : _c.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            buscarAnimes();
        }
    });
    preencherPadrao();
});
function curtida_coracao(elemento1, elemento2) {
    elemento1.classList.toggle('fas');
    elemento1.classList.toggle('far');
    if (elemento1.classList.contains('fas')) {
        elemento2.classList.replace('text-gray-400', 'text-red-500');
    }
    else {
        elemento2.classList.replace('text-red-500', 'text-gray-400');
    }
}
//1 - likebutton, 2 - likeicon, 3 - dislikebutton, 4 - dislikeicon
function like(elemento1, elemento2, elemento3, elemento4) {
    // Se o dislike estiver ativo, desmarcar o dislike e ativar o like
    if (elemento4.classList.contains('fas') && elemento3.classList.contains('text-red-500')) {
        elemento4.classList.replace('fas', 'far');
        elemento3.classList.replace('text-red-500', 'text-gray-400');
        elemento2.classList.replace('far', 'fas');
        elemento1.classList.replace('text-gray-400', 'text-blue-500');
    }
    // Se o like já estiver ativo, desmarcar o like
    else if (elemento2.classList.contains('fas')) {
        elemento2.classList.replace('fas', 'far');
        elemento1.classList.replace('text-blue-500', 'text-gray-400');
    }
    // Se ambos estiverem desmarcados, marcar o like
    else {
        elemento2.classList.replace('far', 'fas');
        elemento1.classList.replace('text-gray-400', 'text-blue-500');
    }
}
function dislike(elemento1, elemento2, elemento3, elemento4) {
    // Se o like estiver ativo, desmarcar o like e ativar o dislike
    if (elemento2.classList.contains('fas') && elemento1.classList.contains('text-blue-500')) {
        elemento2.classList.replace('fas', 'far');
        elemento1.classList.replace('text-blue-500', 'text-gray-400');
        elemento4.classList.replace('far', 'fas');
        elemento3.classList.replace('text-gray-400', 'text-red-500');
    }
    // Se o dislike já estiver ativo, desmarcar o dislike
    else if (elemento4.classList.contains('fas')) {
        elemento4.classList.replace('fas', 'far');
        elemento3.classList.replace('text-red-500', 'text-gray-400');
    }
    // Se ambos estiverem desmarcados, marcar o dislike
    else {
        elemento4.classList.replace('far', 'fas');
        elemento3.classList.replace('text-gray-400', 'text-red-500');
    }
}
function comentario(elemento1, elemento2) {
    elemento1.classList.toggle('fas');
    elemento1.classList.toggle('far');
    if (elemento1.classList.contains('fas')) {
        elemento2.classList.replace('text-gray-400', 'text-gray-500');
    }
    else {
        elemento2.classList.replace('text-gray-500', 'text-gray-400');
    }
}
function Aparecer_comentario(balao_coment) {
    balao_coment.classList.toggle('invisible');
    balao_coment.classList.toggle('scale-100');
    balao_coment.classList.toggle('scale-0');
}
function getAnimeById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`http://localhost:3000/animesjoia/animes/${id}`);
        let anime = yield response.json();
        return anime;
    });
}
function getComentarioById(id_anime, id_comentario) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(`http://localhost:3000/animesjoia/animes/${id_anime}/comentarios/${id_comentario}`);
        let comentario = yield response.json();
        return comentario;
    });
}
function removerComentario(id_anime, id_comentario) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${apiUrlAnime}/${id_anime}/comentarios/${id_comentario}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Erro ao excluir anime: ${response.statusText}`);
        }
        preencherPadrao();
    });
}
function atualizarComentario(id_anime, id_comentario) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let tituloInput = document.querySelector('#edita_com_tit');
        let contInput = document.querySelector('#edita_com_cont');
        if (tituloInput && contInput) {
            let comentario = yield getComentarioById(id_anime, id_comentario);
            if (!tituloInput.value) {
                tituloInput.value = comentario.titulo;
            }
            if (!contInput.value) {
                contInput.value = comentario.conteudo;
            }
            let json = {
                novoTitulo: tituloInput.value,
                novoConteudo: contInput.value,
            };
            const response = yield fetch(`${apiUrlAnime}/${id_anime}/comentarios/${id_comentario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
            });
            if (!response.ok) {
                throw new Error(`Erro ao editar anime: ${response.statusText}`);
            }
            preencherPadrao();
            tituloInput.value = '';
            contInput.value = '';
            let div_edita_com = document.getElementById('div_edita_com');
            div_edita_com === null || div_edita_com === void 0 ? void 0 : div_edita_com.classList.add('oculto');
            (_a = document.getElementById('butao_edit_com')) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', () => {
                atualizarComentario(id_anime, id_comentario);
            });
            window.location.reload();
        }
    });
}
function preencherPadrao() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch('http://localhost:3000/animesjoia/animes');
        let animes = yield response.json();
        listarAnime(animes);
    });
}
function listarAnime(animes) {
    return __awaiter(this, void 0, void 0, function* () {
        if (animes) {
            let divAnimes = document.getElementById("div_animes");
            if (divAnimes) {
                divAnimes.innerHTML = "";
                for (let anime of animes) {
                    let novaDiv = document.createElement("div");
                    novaDiv.classList.add("max-w-lg", "rounded", "overflow-hidden", "shadow-lg", "bg-white", "border", "border-black");
                    let imagemAnime = document.createElement("img");
                    imagemAnime.classList.add("w-full", "h-70", "object-cover");
                    imagemAnime.src = anime.imagem;
                    novaDiv.appendChild(imagemAnime);
                    let div2 = document.createElement("div");
                    div2.classList.add("p-4");
                    novaDiv.appendChild(div2);
                    let nome = document.createElement("h2");
                    nome.classList.add("font-bold", "text-xl", "mb-2");
                    nome.textContent = anime.nome;
                    div2.appendChild(nome);
                    let descricao = document.createElement("p");
                    descricao.classList.add("text-gray-700", "text-base", "mb-4");
                    descricao.textContent = anime.descricao;
                    div2.appendChild(descricao);
                    let div3 = document.createElement("div");
                    div3.classList.add("flex", "space-x-2");
                    div2.appendChild(div3);
                    let div4 = document.createElement("div");
                    div4.classList.add("cursor-pointer", "text-gray-400", "text-4xl", "transition-colors", "duration-300");
                    div3.appendChild(div4);
                    let i1 = document.createElement("i");
                    i1.classList.add("far", "fa-heart");
                    div4.appendChild(i1);
                    div4.addEventListener("click", () => {
                        curtida_coracao(i1, div4);
                    });
                    let botao_coment = document.createElement("div");
                    botao_coment.classList.add("cursor-pointer", "text-gray-400", "text-4xl");
                    div3.appendChild(botao_coment);
                    let i2 = document.createElement("i");
                    i2.classList.add("far", "fa-comments");
                    botao_coment.appendChild(i2);
                    botao_coment.addEventListener("click", () => {
                        comentario(i2, botao_coment);
                    });
                    let balao_coment = document.createElement("div");
                    balao_coment.classList.add("invisible", "absolute", "top-full", "mt-2", "w-full", "max-w-lg", "bg-white", "border", "border-black", "rounded-lg", "shadow-lg", "transition-transform", "transform", "scale-0", "-translate-x-4");
                    botao_coment.addEventListener("click", () => {
                        Aparecer_comentario(balao_coment);
                    });
                    novaDiv.appendChild(balao_coment);
                    let botao_excluir_a = document.createElement("button");
                    botao_excluir_a.addEventListener("click", () => {
                        excluirAnime(anime.id);
                    });
                    botao_excluir_a.innerHTML = "excluir anime";
                    div3.appendChild(botao_excluir_a);
                    let botao_editar_a = document.createElement("button");
                    botao_editar_a.innerHTML = "editar anime";
                    botao_editar_a.addEventListener("click", () => {
                        mostrar_editarAnime(anime.id);
                    });
                    div3.appendChild(botao_editar_a);
                    let div_adc_comen = document.createElement("div");
                    div_adc_comen.classList.add("adc_comentario", "flex", "flex-col");
                    balao_coment.appendChild(div_adc_comen);
                    let titulo_coment = document.createElement("h1");
                    titulo_coment.innerHTML = "TITULO";
                    div_adc_comen.appendChild(titulo_coment);
                    let input_Tit_comen = document.createElement("input");
                    input_Tit_comen.type = "text";
                    input_Tit_comen.required = true;
                    input_Tit_comen.placeholder = "Digite o título do comentário";
                    input_Tit_comen.classList.add("tituloComentario", "bg-gray-200", "rounded-lg", "focus:outline-none", "focus:ring-0", "p-2", "mb-2");
                    div_adc_comen.appendChild(input_Tit_comen);
                    let conteudo_coment = document.createElement("h1");
                    conteudo_coment.innerHTML = "CONTEUDO";
                    div_adc_comen.appendChild(conteudo_coment);
                    let input_Con_comen = document.createElement("input");
                    input_Con_comen.type = "text";
                    input_Con_comen.required = true;
                    input_Con_comen.placeholder = "Digite o comentário";
                    input_Con_comen.classList.add("comentario", "bg-gray-200", "rounded-lg", "focus:outline-none", "focus:ring-0", "p-2", "mb-2");
                    div_adc_comen.appendChild(input_Con_comen);
                    let div_butao_adc_co = document.createElement("div");
                    div_butao_adc_co.classList.add("flex", "justify-end");
                    div_adc_comen.appendChild(div_butao_adc_co);
                    let butao_adc_co = document.createElement("button");
                    butao_adc_co.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "rounded", "px-4", "py-2");
                    butao_adc_co.innerHTML = "Adicionar Comentário";
                    div_butao_adc_co.appendChild(butao_adc_co);
                    butao_adc_co.addEventListener("click", () => {
                        adicionarComentario(anime.id, input_Tit_comen.value, input_Con_comen.value);
                    });
                    let comentarios = anime.comentarios;
                    let div_comentarios = document.createElement("div");
                    balao_coment.appendChild(div_comentarios);
                    for (let comentario of comentarios) {
                        let div_comentarinho = document.createElement("div");
                        div_comentarinho.classList.add("mt-8", "w-full", "bg-gray-200", "max-w-lg", "rounded-lg", "border", "border-gray-300", "p-2");
                        let tit_comentarinho = document.createElement("h1");
                        tit_comentarinho.innerHTML = comentario.titulo;
                        tit_comentarinho.classList.add("font-bold");
                        div_comentarinho.appendChild(tit_comentarinho);
                        let con_comentarinho = document.createElement("p");
                        con_comentarinho.innerHTML = comentario.conteudo;
                        div_comentarinho.appendChild(con_comentarinho);
                        let div_comentarinho2 = document.createElement("div");
                        div_comentarinho2.classList.add("flex", "items-center");
                        div_comentarinho.appendChild(div_comentarinho2);
                        let div_comentarinho3 = document.createElement("div");
                        div_comentarinho3.classList.add("cursor-pointer", "text-gray-400", "text-xl", "transition-colors", "duration-300");
                        div_comentarinho2.appendChild(div_comentarinho3);
                        let i1 = document.createElement("i");
                        i1.classList.add("far", "fa-thumbs-up");
                        div_comentarinho3.appendChild(i1);
                        let div_comentarinho4 = document.createElement("div");
                        div_comentarinho4.classList.add("cursor-pointer", "text-gray-400", "text-xl", "transition-colors", "duration-300", "ml-2");
                        div_comentarinho2.appendChild(div_comentarinho4);
                        let i2 = document.createElement("i");
                        i2.classList.add("far", "fa-thumbs-down");
                        div_comentarinho4.appendChild(i2);
                        div_comentarinho3.addEventListener("click", () => {
                            like(div_comentarinho3, i1, div_comentarinho4, i2);
                        });
                        div_comentarinho4.addEventListener("click", () => {
                            dislike(div_comentarinho3, i1, div_comentarinho4, i2);
                        });
                        let comentarinho_excluir = document.createElement('button');
                        comentarinho_excluir.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "rounded", "px-4", "py-2");
                        comentarinho_excluir.innerHTML = 'Remover';
                        comentarinho_excluir.addEventListener('click', () => {
                            removerComentario(anime.id, comentario.id);
                        });
                        div_comentarinho2.appendChild(comentarinho_excluir);
                        let comentarinho_atualizar = document.createElement('button');
                        comentarinho_atualizar.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "rounded", "px-4", "py-2");
                        comentarinho_atualizar.innerHTML = 'Atualizar';
                        comentarinho_atualizar.addEventListener('click', () => {
                            mostrar_editarComentario(anime.id, comentario.id);
                        });
                        div_comentarinho2.appendChild(comentarinho_atualizar);
                        let data_comentarinho = document.createElement("h5");
                        data_comentarinho.innerHTML = comentario.data;
                        data_comentarinho.classList.add("ml-auto");
                        div_comentarinho2.appendChild(data_comentarinho);
                        div_comentarios.appendChild(div_comentarinho);
                    }
                    divAnimes.appendChild(novaDiv);
                }
            }
        }
    });
}
