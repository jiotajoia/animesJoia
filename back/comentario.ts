export class Comentario{
    private id: number;
    private titulo: string;
    private conteudo: string;
    private qtdCurtidas: number = 0;
    private qtdDescurtidas: number = 0;
    private data: string;

    constructor(id: number,titulo: string,conteudo: string,data:string){
        this.id = id;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.data = data;
    }

    public getID(): number{
        return this.id;
    }
    public getTitulo(): string{
        return this.titulo;
    }
    public getConteudo(): string{
        return this.conteudo;
    }
    public getData(): string{
        return this.data;
    }
    public getQtdCurtidas(): number{
        return this.qtdCurtidas;
    }
    public getQtdDescurtidas(): number{
        return this.qtdDescurtidas;
    }

    public setTitulo(novoTitulo:string): void{
        this.titulo = novoTitulo;
    }
    
    public setConteudo(novoConteudo: string): void{
        this.conteudo = novoConteudo;
    }
    public setQtdCurtidas(novaQtd:number): void{
        this.qtdCurtidas = novaQtd;
    }
    public setQtdDescurtidas(novaQtd:number): void{
        this.qtdDescurtidas = novaQtd;
    }
}