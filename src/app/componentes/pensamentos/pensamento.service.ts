import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  constructor(private http: HttpClient) { }

  private readonly API = 'http://localhost:3000/pensamentos'

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]> {
    const itensPagina = 6;

    let params = new HttpParams()
      .set("_page", pagina)
      .set("_limit", itensPagina)

    if(filtro.trim().length > 1) {
      params = params.set("q", filtro)
    }

    if(favoritos) {
      params = params.set("favorito", true)
    }

    //return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${itensPagina}`)
    return this.http.get<Pensamento[]>(this.API, { params })
  }

  // listarFavoritos(pagina: number, filtro: string): Observable<Pensamento[]> {
  //   const itensPagina = 6;

  //   let params = new HttpParams()
  //     .set("_page", pagina)
  //     .set("_limit", itensPagina)
  //     .set("favorito", true)

  //   if(filtro.trim().length > 1) {
  //     params = params.set("q", filtro)
  //   }

  //   return this.http.get<Pensamento[]>(this.API, { params })
  // }

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento )
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito
    const url = `${this.API}/${pensamento.id}`
    return this.editar(pensamento)
  }
}
