export class Categoria{
  id!:number | null;
  nombre!:string

  constructor(id:number | null, nombre:string){
    this.id = id;
    this.nombre = nombre;
  }
}
