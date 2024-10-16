// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import bcrypt from "bcryptjs";
// import { UsuarioModel, IUsuario } from '../models/usuarioModel'; // Importa a interface do modelo de usuário

// // Configuração do Passport
// const configurePassport = (passport: passport.PassportStatic) => {
//     passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'senha' }, async (email, senha, done) => {
//         try {
//             const usuario = await UsuarioModel.findOne({ email }).lean();
//             if (!usuario) {
//                 return done(null, false, { message: "conta não existe" });
//             }

//             const conferem = await bcrypt.compare(senha, usuario.senha);
//             if (conferem) {
//                 return done(null, usuario); 
//             } else {
//                 return done(null, false, { message: 'senha incorreta' });
//             }
//         } catch (error) {
//             return done(error); 
//         }
//     }));

//     passport.serializeUser((usuario: IUsuario, done) => {
//         done(null, usuario.id); 
//     });

//     passport.deserializeUser(async (id: string, done) => {
//         try {
//             const usuario = await UsuarioModel.findById(id) as IUsuario | null; 
//             done(null, usuario);
//         } catch (error) {
//             done(error, null);
//         }
//     });
// };

// export default configurePassport;
