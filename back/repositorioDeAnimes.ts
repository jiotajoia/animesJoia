import { Anime } from "./anime";

export class RepositorioDeAnimes{
    private animes: Anime[] = [];
    private animeID: number = 1;

    public getAnimes(): Anime[]{
        return this.animes;
    }

    public incluirAnime(nome:string,descricao:string,data:string,imagem:string,genero:string,autor:string): void{
        let anime1: Anime = new Anime(this.animeID,nome,descricao,data,imagem,genero,autor);
        this.animeID++;
        this.animes.push(anime1);
    }

    public consultarAnime(IDanime: number): Anime | null{
        let aProcurado: Anime | null = null;
        for (let aAtual of this.animes){
            if (aAtual.getID() == IDanime){
                aProcurado = aAtual;
                break;
            }
        }
        return aProcurado;
    }

    public consultarAnimeAtributo(atributo: String, valor: String): Anime[] {
        let aProcurado: Anime[] | null = [];
        for (let anime of this.animes){
            if((atributo == "titulo" && anime.getNome().toLowerCase().includes(valor.toLowerCase())) || (atributo == "genero" && anime.getGenero() == valor) || (atributo == "autor" && anime.getAutor().toLowerCase().includes(valor.toLowerCase()))){
                aProcurado.push(anime);
            }
        }
        return aProcurado;
    }

    public removerAnime(id:number): boolean{
        if(this.consultarAnime(id)){
            for (let indice = 0; indice < this.animes.length; indice++){
                if (this.animes[indice].getID() == id){
                    this.animes.splice(indice,1);
                    return true
                }
            }
        }
        return false;
    }
    
    public alterarAnime(id: number,novoNome: string, novoDesc: string,imagem:string, novoGenero:string,novoAutor:string): boolean{
        let anime = this.consultarAnime(id);
        if(anime){
            anime.setNome(novoNome);
            anime.setDescricao(novoDesc);
            anime.setImagem(imagem);
            anime.setGenero(novoGenero);
            anime.setAutor(novoAutor);
            return true;
        }
        return false;
    }

    public curtirAnime(id:number): number | null{
        let anime = this.consultarAnime(id);
        if (anime){
            anime.setQtdCurtidas(anime.getQtdCurtidas()+1)
            return anime.getQtdCurtidas();
        }
        return null;
    }

    public R_curtirAnime(id:number): number | null{
        let anime = this.consultarAnime(id);
        if (anime){
            anime.setQtdCurtidas(anime.getQtdCurtidas()-1)
            return anime.getQtdCurtidas();
        }
        return null;
    }

    public povoar(){
        this.incluirAnime('jujutsu kaisen','anime de poderzinho',new Date().toString().slice(4,25),'https://ovicio.com.br/wp-content/uploads/2024/07/20240716-jujutsu-kaisen-ovicio.webp','ação','gege akutami');
        this.incluirAnime('haikyuu','anime de volei',new Date().toString().slice(4,25),'https://sm.ign.com/ign_br/screenshot/default/haikyu-1_arwc.jpg','esporte','volei');
        this.incluirAnime('iruma kun','anime de capetinhas',new Date().toString().slice(4,25),'https://m.media-amazon.com/images/S/pv-target-images/5761c37e4e5d6b422d20ef3aae69845820f3752a63ee7c3c0af3230f8baa1d4d.jpg','isekai','jitajoia');
        this.incluirAnime('devilman','anime de odio',new Date().toString().slice(4,25),'https://i0.wp.com/cromossomonerd.com.br/wp-content/uploads/2018/01/DPMA97tUEAAesMc.jpg?fit=3992%2C2320&ssl=1','aventura','homem daibo');

        this.consultarAnime(2)?.incluirComentario('volei legal','volei muito legal',new Date().toString().slice(4,25));
        this.consultarAnime(2)?.incluirComentario('muito real','oikawa é o reizinho',new Date().toString().slice(4,25));
        this.consultarAnime(1)?.incluirComentario('volta gojo','ele vai voltar',new Date().toString().slice(4,25));
        this.consultarAnime(1)?.incluirComentario('subuxa','rei dos roteiros',new Date().toString().slice(4,25));

        this.consultarAnime(3)?.incluirComentario('4 temporada?','4 temporada quando veir T-T',new Date().toString().slice(4,25));
        this.consultarAnime(3)?.incluirComentario('azz-kun','lindo, apenas',new Date().toString().slice(4,25));
    }
}