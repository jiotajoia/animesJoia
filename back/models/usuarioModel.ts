import mongoose, { Document, Schema } from 'mongoose';

// interface para o model de usuário
export interface IUsuario extends Document {
    nome: string;
    email: string;
    senha: string;
}

// esquema para o model de usuário
const UsuarioSchema: Schema<IUsuario> = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
    },
});

export const UsuarioModel = mongoose.model<IUsuario>('usuarios', UsuarioSchema);
