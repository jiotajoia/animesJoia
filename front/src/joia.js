var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var apiUrlAnime = 'https://animesjoia.onrender.com/animesjoia/animes';
var apiUrlComentario = 'https://animesjoia.onrender.com/animesjoia/animes/:id/comentarios';
function adicionarAnime() {
    return __awaiter(this, void 0, void 0, function () {
        var tituloInput, descInput, generoInput, imgInput, autorInput, json, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tituloInput = document.querySelector('#adc_ani_titulo');
                    descInput = document.querySelector('#adc_ani_desc');
                    generoInput = document.querySelector('#adc_ani_genero');
                    imgInput = document.querySelector('#adc_ani_img');
                    autorInput = document.querySelector('#adc_ani_autor');
                    if (!(tituloInput && descInput && generoInput && imgInput && autorInput)) return [3 /*break*/, 2];
                    json = {
                        nome: tituloInput.value,
                        descricao: descInput.value,
                        imagem: imgInput.value,
                        genero: generoInput.value,
                        autor: autorInput.value
                    };
                    return [4 /*yield*/, fetch(apiUrlAnime, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(json)
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Erro ao adicionar anime: ".concat(response.statusText));
                    }
                    preencherPadrao();
                    tituloInput.value = '';
                    descInput.value = '';
                    imgInput.value = '';
                    generoInput.value = '';
                    autorInput.value = '';
                    window.location.reload();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function adicionarComentario(id, titulo, conteudo) {
    return __awaiter(this, void 0, void 0, function () {
        var json, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    json = {
                        titulo: titulo,
                        conteudo: conteudo
                    };
                    return [4 /*yield*/, fetch("https://animesjoia.onrender.com/animesjoia/animes/".concat(id, "/comentarios"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(json)
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Erro ao adicionar comentario: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, preencherPadrao()];
                case 2:
                    _a.sent();
                    window.location.reload();
                    return [2 /*return*/];
            }
        });
    });
}
function excluirComentario(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("".concat(apiUrlComentario, "/").concat(id), {
                            method: 'DELETE'
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Erro ao excluir comentario: ".concat(response.statusText));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function excluirAnime(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(apiUrlAnime, "/").concat(id), {
                        method: 'DELETE'
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Erro ao excluir anime: ".concat(response.statusText));
                    }
                    preencherPadrao();
                    return [2 /*return*/];
            }
        });
    });
}
function editarAnime(id) {
    return __awaiter(this, void 0, void 0, function () {
        var tituloInput, descInput, generoInput, imgInput, autorInput, anime, json, response, div_edita_anime;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tituloInput = document.querySelector('#edi_ani_titulo');
                    descInput = document.querySelector('#edi_ani_desc');
                    generoInput = document.querySelector('#edi_ani_genero');
                    imgInput = document.querySelector('#edi_ani_img');
                    autorInput = document.querySelector('#edi_ani_autor');
                    if (!(tituloInput && descInput && generoInput && imgInput && autorInput)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getAnimeById(id)];
                case 1:
                    anime = _b.sent();
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
                    json = {
                        nome: tituloInput.value,
                        descricao: descInput.value,
                        imagem: imgInput.value,
                        genero: generoInput.value,
                        autor: autorInput.value
                    };
                    return [4 /*yield*/, fetch("".concat(apiUrlAnime, "/").concat(id), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(json)
                        })];
                case 2:
                    response = _b.sent();
                    if (!response.ok) {
                        throw new Error("Erro ao editar anime: ".concat(response.statusText));
                    }
                    preencherPadrao();
                    tituloInput.value = '';
                    descInput.value = '';
                    imgInput.value = '';
                    generoInput.value = '';
                    autorInput.value = '';
                    div_edita_anime = document.getElementById('div_edita_anime');
                    div_edita_anime === null || div_edita_anime === void 0 ? void 0 : div_edita_anime.classList.add('oculto');
                    (_a = document.getElementById('editaAnime')) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', function () {
                        editarAnime(id);
                    });
                    window.location.reload();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function mostrar_editarComentario(id_anime, id_comentario) {
    return __awaiter(this, void 0, void 0, function () {
        var div_edita_com;
        var _a;
        return __generator(this, function (_b) {
            div_edita_com = document.getElementById('div_edita_com');
            div_edita_com === null || div_edita_com === void 0 ? void 0 : div_edita_com.classList.remove('oculto');
            (_a = document.getElementById('butao_edit_com')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                atualizarComentario(id_anime, id_comentario);
            });
            return [2 /*return*/];
        });
    });
}
function mostrar_editarAnime(id) {
    return __awaiter(this, void 0, void 0, function () {
        var div_edita_anime;
        var _a;
        return __generator(this, function (_b) {
            div_edita_anime = document.getElementById('div_edita_anime');
            div_edita_anime === null || div_edita_anime === void 0 ? void 0 : div_edita_anime.classList.remove('oculto');
            (_a = document.getElementById('editaAnime')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                editarAnime(id);
            });
            return [2 /*return*/];
        });
    });
}
function buscarAnimes() {
    return __awaiter(this, void 0, void 0, function () {
        var valor, atributo, json, response, animes;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    valor = (_a = document.querySelector('#barra_pesquisa')) === null || _a === void 0 ? void 0 : _a.value;
                    atributo = (_b = document.querySelector('#filtro_pesquisa')) === null || _b === void 0 ? void 0 : _b.value;
                    json = {
                        valor: valor,
                        atributo: atributo,
                    };
                    return [4 /*yield*/, fetch("".concat(apiUrlAnime, "/buscar"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(json)
                        })];
                case 1:
                    response = _c.sent();
                    if (!response.ok) {
                        throw new Error("Erro ao buscar anime: ".concat(response.statusText));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    animes = _c.sent();
                    listarAnime(animes);
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
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
    return __awaiter(this, void 0, void 0, function () {
        var response, anime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://animesjoia.onrender.com/animesjoia/animes/".concat(id))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    anime = _a.sent();
                    return [2 /*return*/, anime];
            }
        });
    });
}
function getComentarioById(id_anime, id_comentario) {
    return __awaiter(this, void 0, void 0, function () {
        var response, comentario;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://animesjoia.onrender.com/animesjoia/animes/".concat(id_anime, "/comentarios/").concat(id_comentario))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    comentario = _a.sent();
                    return [2 /*return*/, comentario];
            }
        });
    });
}
function removerComentario(id_anime, id_comentario) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(apiUrlAnime, "/").concat(id_anime, "/comentarios/").concat(id_comentario), {
                        method: 'DELETE'
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Erro ao excluir anime: ".concat(response.statusText));
                    }
                    preencherPadrao();
                    return [2 /*return*/];
            }
        });
    });
}
function atualizarComentario(id_anime, id_comentario) {
    return __awaiter(this, void 0, void 0, function () {
        var tituloInput, contInput, comentario_1, json, response, div_edita_com;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tituloInput = document.querySelector('#edita_com_tit');
                    contInput = document.querySelector('#edita_com_cont');
                    if (!(tituloInput && contInput)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getComentarioById(id_anime, id_comentario)];
                case 1:
                    comentario_1 = _b.sent();
                    if (!tituloInput.value) {
                        tituloInput.value = comentario_1.titulo;
                    }
                    if (!contInput.value) {
                        contInput.value = comentario_1.conteudo;
                    }
                    json = {
                        novoTitulo: tituloInput.value, //mesmo nomes
                        novoConteudo: contInput.value,
                    };
                    return [4 /*yield*/, fetch("".concat(apiUrlAnime, "/").concat(id_anime, "/comentarios/").concat(id_comentario), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(json)
                        })];
                case 2:
                    response = _b.sent();
                    if (!response.ok) {
                        throw new Error("Erro ao editar anime: ".concat(response.statusText));
                    }
                    preencherPadrao();
                    tituloInput.value = '';
                    contInput.value = '';
                    div_edita_com = document.getElementById('div_edita_com');
                    div_edita_com === null || div_edita_com === void 0 ? void 0 : div_edita_com.classList.add('oculto');
                    (_a = document.getElementById('butao_edit_com')) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', function () {
                        atualizarComentario(id_anime, id_comentario);
                    });
                    window.location.reload();
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function preencherPadrao() {
    return __awaiter(this, void 0, void 0, function () {
        var response, animes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://animesjoia.onrender.com/animesjoia/animes')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    animes = _a.sent();
                    listarAnime(animes);
                    return [2 /*return*/];
            }
        });
    });
}
function listarAnime(animes) {
    return __awaiter(this, void 0, void 0, function () {
        var divAnimes, _loop_1, _i, animes_1, anime;
        return __generator(this, function (_a) {
            if (animes) {
                divAnimes = document.getElementById("div_animes");
                if (divAnimes) {
                    divAnimes.innerHTML = "";
                    _loop_1 = function (anime) {
                        var novaDiv = document.createElement("div");
                        novaDiv.classList.add("max-w-lg", "rounded", "overflow-hidden", "shadow-lg", "bg-white", "border", "border-black");
                        var imagemAnime = document.createElement("img");
                        imagemAnime.classList.add("w-full", "h-70", "object-cover");
                        imagemAnime.src = anime.imagem;
                        novaDiv.appendChild(imagemAnime);
                        var div2 = document.createElement("div");
                        div2.classList.add("p-4");
                        novaDiv.appendChild(div2);
                        var nome = document.createElement("h2");
                        nome.classList.add("font-bold", "text-xl", "mb-2");
                        nome.textContent = anime.nome;
                        div2.appendChild(nome);
                        var descricao = document.createElement("p");
                        descricao.classList.add("text-gray-700", "text-base", "mb-4");
                        descricao.textContent = anime.descricao;
                        div2.appendChild(descricao);
                        var div3 = document.createElement("div");
                        div3.classList.add("flex", "space-x-2");
                        div2.appendChild(div3);
                        var div4 = document.createElement("div");
                        div4.classList.add("cursor-pointer", "text-gray-400", "text-4xl", "transition-colors", "duration-300");
                        div3.appendChild(div4);
                        var i1 = document.createElement("i");
                        i1.classList.add("far", "fa-heart");
                        div4.appendChild(i1);
                        div4.addEventListener("click", function () {
                            curtida_coracao(i1, div4);
                        });
                        var botao_coment = document.createElement("div");
                        botao_coment.classList.add("cursor-pointer", "text-gray-400", "text-4xl");
                        div3.appendChild(botao_coment);
                        var i2 = document.createElement("i");
                        i2.classList.add("far", "fa-comments");
                        botao_coment.appendChild(i2);
                        botao_coment.addEventListener("click", function () {
                            comentario(i2, botao_coment);
                        });
                        var balao_coment = document.createElement("div");
                        balao_coment.classList.add("invisible", "absolute", "top-full", "mt-2", "w-full", "max-w-lg", "bg-white", "border", "border-black", "rounded-lg", "shadow-lg", "transition-transform", "transform", "scale-0", "-translate-x-4");
                        botao_coment.addEventListener("click", function () {
                            Aparecer_comentario(balao_coment);
                        });
                        novaDiv.appendChild(balao_coment);
                        var botao_excluir_a = document.createElement("button");
                        botao_excluir_a.addEventListener("click", function () {
                            excluirAnime(anime.id);
                        });
                        botao_excluir_a.innerHTML = "excluir anime";
                        div3.appendChild(botao_excluir_a);
                        var botao_editar_a = document.createElement("button");
                        botao_editar_a.innerHTML = "editar anime";
                        botao_editar_a.addEventListener("click", function () {
                            mostrar_editarAnime(anime.id);
                        });
                        div3.appendChild(botao_editar_a);
                        var div_adc_comen = document.createElement("div");
                        div_adc_comen.classList.add("adc_comentario", "flex", "flex-col");
                        balao_coment.appendChild(div_adc_comen);
                        var titulo_coment = document.createElement("h1");
                        titulo_coment.innerHTML = "TITULO";
                        div_adc_comen.appendChild(titulo_coment);
                        var input_Tit_comen = document.createElement("input");
                        input_Tit_comen.type = "text";
                        input_Tit_comen.required = true;
                        input_Tit_comen.placeholder = "Digite o título do comentário";
                        input_Tit_comen.classList.add("tituloComentario", "bg-gray-200", "rounded-lg", "focus:outline-none", "focus:ring-0", "p-2", "mb-2");
                        div_adc_comen.appendChild(input_Tit_comen);
                        var conteudo_coment = document.createElement("h1");
                        conteudo_coment.innerHTML = "CONTEUDO";
                        div_adc_comen.appendChild(conteudo_coment);
                        var input_Con_comen = document.createElement("input");
                        input_Con_comen.type = "text";
                        input_Con_comen.required = true;
                        input_Con_comen.placeholder = "Digite o comentário";
                        input_Con_comen.classList.add("comentario", "bg-gray-200", "rounded-lg", "focus:outline-none", "focus:ring-0", "p-2", "mb-2");
                        div_adc_comen.appendChild(input_Con_comen);
                        var div_butao_adc_co = document.createElement("div");
                        div_butao_adc_co.classList.add("flex", "justify-end");
                        div_adc_comen.appendChild(div_butao_adc_co);
                        var butao_adc_co = document.createElement("button");
                        butao_adc_co.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "rounded", "px-4", "py-2");
                        butao_adc_co.innerHTML = "Adicionar Comentário";
                        div_butao_adc_co.appendChild(butao_adc_co);
                        butao_adc_co.addEventListener("click", function () {
                            adicionarComentario(anime.id, input_Tit_comen.value, input_Con_comen.value);
                        });
                        var comentarios = anime.comentarios;
                        var div_comentarios = document.createElement("div");
                        balao_coment.appendChild(div_comentarios);
                        var _loop_2 = function (comentario_2) {
                            var div_comentarinho = document.createElement("div");
                            div_comentarinho.classList.add("mt-8", "w-full", "bg-gray-200", "max-w-lg", "rounded-lg", "border", "border-gray-300", "p-2");
                            var tit_comentarinho = document.createElement("h1");
                            tit_comentarinho.innerHTML = comentario_2.titulo;
                            tit_comentarinho.classList.add("font-bold");
                            div_comentarinho.appendChild(tit_comentarinho);
                            var con_comentarinho = document.createElement("p");
                            con_comentarinho.innerHTML = comentario_2.conteudo;
                            div_comentarinho.appendChild(con_comentarinho);
                            var div_comentarinho2 = document.createElement("div");
                            div_comentarinho2.classList.add("flex", "items-center");
                            div_comentarinho.appendChild(div_comentarinho2);
                            var div_comentarinho3 = document.createElement("div");
                            div_comentarinho3.classList.add("cursor-pointer", "text-gray-400", "text-xl", "transition-colors", "duration-300");
                            div_comentarinho2.appendChild(div_comentarinho3);
                            var i1_1 = document.createElement("i");
                            i1_1.classList.add("far", "fa-thumbs-up");
                            div_comentarinho3.appendChild(i1_1);
                            var div_comentarinho4 = document.createElement("div");
                            div_comentarinho4.classList.add("cursor-pointer", "text-gray-400", "text-xl", "transition-colors", "duration-300", "ml-2");
                            div_comentarinho2.appendChild(div_comentarinho4);
                            var i2_1 = document.createElement("i");
                            i2_1.classList.add("far", "fa-thumbs-down");
                            div_comentarinho4.appendChild(i2_1);
                            div_comentarinho3.addEventListener("click", function () {
                                like(div_comentarinho3, i1_1, div_comentarinho4, i2_1);
                            });
                            div_comentarinho4.addEventListener("click", function () {
                                dislike(div_comentarinho3, i1_1, div_comentarinho4, i2_1);
                            });
                            var comentarinho_excluir = document.createElement('button');
                            comentarinho_excluir.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "rounded", "px-4", "py-2");
                            comentarinho_excluir.innerHTML = 'Remover';
                            comentarinho_excluir.addEventListener('click', function () {
                                removerComentario(anime.id, comentario_2.id);
                            });
                            div_comentarinho2.appendChild(comentarinho_excluir);
                            var comentarinho_atualizar = document.createElement('button');
                            comentarinho_atualizar.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "rounded", "px-4", "py-2");
                            comentarinho_atualizar.innerHTML = 'Atualizar';
                            comentarinho_atualizar.addEventListener('click', function () {
                                mostrar_editarComentario(anime.id, comentario_2.id);
                            });
                            div_comentarinho2.appendChild(comentarinho_atualizar);
                            var data_comentarinho = document.createElement("h5");
                            data_comentarinho.innerHTML = comentario_2.data;
                            data_comentarinho.classList.add("ml-auto");
                            div_comentarinho2.appendChild(data_comentarinho);
                            div_comentarios.appendChild(div_comentarinho);
                        };
                        for (var _b = 0, comentarios_1 = comentarios; _b < comentarios_1.length; _b++) {
                            var comentario_2 = comentarios_1[_b];
                            _loop_2(comentario_2);
                        }
                        divAnimes.appendChild(novaDiv);
                    };
                    for (_i = 0, animes_1 = animes; _i < animes_1.length; _i++) {
                        anime = animes_1[_i];
                        _loop_1(anime);
                    }
                }
            }
            return [2 /*return*/];
        });
    });
}
