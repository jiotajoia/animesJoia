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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioModel_1 = require("../models/usuarioModel"); // Certifique-se de que você está exportando o modelo corretamente
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// Rota para registro
router.get('/registro', (req, res) => {
    res.render('usuarios/registro');
});
// Rota para registrar um novo usuário
router.post('/registro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const erros = [];
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
        const usuarioExistente = yield usuarioModel_1.UsuarioModel.findOne({ email: req.body.email });
        if (usuarioExistente) {
            console.log("email já cadastrado");
            return res.redirect('usuarios/registro');
        }
        const novoUsuario = new usuarioModel_1.UsuarioModel({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        });
        const salt = yield bcrypt_1.default.genSalt(10);
        novoUsuario.senha = yield bcrypt_1.default.hash(novoUsuario.senha, salt);
        yield novoUsuario.save();
        console.log("Usuário cadastrado com sucesso!");
        res.redirect('/login');
    }
    catch (error) {
        console.log("Houve um erro ao registrar o usuário");
        res.redirect('/usuarios/registro');
    }
}));
// Rota para login
router.get('/login', (req, res) => {
    res.render('usuarios/login');
});
router.post('/login', (req, res, next) => {
    passport_1.default.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/usuarios/login",
        failureFlash: true
    })(req, res, next);
});
exports.default = router;
