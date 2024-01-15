import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/core/models/categoria';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private URLCATEGORIA :string = "/categoria"
  private URL :string  = environment.api;

  constructor(private http: HttpClient) { }

  public getAllCategories():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.URL}${this.URLCATEGORIA}`);
  }

  public insertCategories(categoria:any){
    delete categoria.id;
    return this.http.post(`${this.URL}${this.URLCATEGORIA}`,categoria).toPromise();
  }

  public deleteCategories(id:number){
    return this.http.delete(`${this.URL}${this.URLCATEGORIA}/${id}`).toPromise()
  }


}
