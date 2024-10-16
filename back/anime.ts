import { Comentario } from "./comentario";

export class Anime{
    private id: number;
    private nome: string;
    private descricao: string;
    private qtdCurtidas: number = 0;
    private data: string;
    private imagem: string;
    private comentarios : Comentario[] = [];
    private commentID: number = 1;
    private genero : string;
    private autor : string;

    constructor(id: number,nome: string,descricao: string,data: string,imagem: string,genero: string,autor:string){
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.data = data;
        this.imagem = imagem;
        this.genero = genero;
        this.autor = autor;
    }

    public getID(): number{
        return this.id;
    }
    public getNome(): string{
        return this.nome;
    }
    public getDescricao(): string{
        return this.descricao;
    }
    public getQtdCurtidas(): number{
        return this.qtdCurtidas;
    }
    public getData(): string{
        return this.data;
    }
    public getImagem(): string{
        return this.imagem;
    }
    public getGenero(): string{
        return this.genero;
    }
    public getAutor(): string{
        return this.autor;
    }
    public getComentarios(): Comentario[]{
        return this.comentarios;
    }



    public setNome(novoNome :string):void{
        this.nome = novoNome;
    }
    public setDescricao(novaDesc : string): void{
        this.descricao = novaDesc;
    }
    public setImagem(novaImagem: string): void{
        this.imagem = novaImagem;
    }
    public setQtdCurtidas(novaQtd: number): void{
        this.qtdCurtidas = novaQtd;
    }
    public setGenero(novo:string): void{
        this.genero = novo;
    }
    public setAutor(novo:string): void{
        this.autor = novo;
    }

    public incluirComentario(titulo:string,conteudo:string,data:string): void{
        let comentario1: Comentario = new Comentario(this.commentID,titulo,conteudo,data);
        this.commentID++;
        this.comentarios.push(comentario1);
    }

    public consultarComentario(idComentario: number): Comentario | null{
        let coProcurado: Comentario | null = null;
        for (let coAtual of this.comentarios){
            if (coAtual.getID() == idComentario){
                coProcurado = coAtual;
                break;
            }
        }
        return coProcurado;
    }

    public removerComentario(id:number): boolean{
        if(this.consultarComentario(id)){
            for (let indice = 0; indice < this.comentarios.length; indice++){
                if (this.comentarios[indice].getID() == id){
                    this.comentarios.splice(indice,1);
                    return true
                }
            }
        }
        return false;
    }
    
    public alterarComentario(id: number,novoTitulo: string, novoConteudo: string): boolean{
        let comentario = this.consultarComentario(id);
        if(comentario){
            comentario.setTitulo(novoTitulo);
            comentario.setConteudo(novoConteudo);
            return true;
        }
        return false;
    }

    public curtirComentario(id:number): number | null{
        let comentario = this.consultarComentario(id);
        if (comentario){
            comentario.setQtdCurtidas(comentario.getQtdCurtidas()+1)
            return comentario.getQtdCurtidas();
        }
        return null;
    }

    public RCurtirComentario(id:number): number | null{
        let comentario = this.consultarComentario(id);
        if (comentario){
            comentario.setQtdCurtidas(comentario.getQtdCurtidas()-1)
            return comentario.getQtdCurtidas();
        }
        return null;
    }

    public descurtirComentario(id:number): number | null{
        let comentario = this.consultarComentario(id);
        if (comentario){
            comentario.setQtdDescurtidas(comentario.getQtdDescurtidas()+1)
            return comentario.getQtdDescurtidas();
        }
        return null;
    }
    
    public RDescurtirComentario(id:number): number | null{
        let comentario = this.consultarComentario(id);
        if (comentario){
            comentario.setQtdDescurtidas(comentario.getQtdDescurtidas()-1)
            return comentario.getQtdDescurtidas();
        }
        return null;
    }
}