import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseURL = 'http://localhost:5000/api/evento';

  constructor(private http: HttpClient) { }

  getAllEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL);
  }

  getEventoByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseURL}/getByTema/${tema}`);
  }

  getEventoById(id: number): Observable<Evento> {
    var teste = this.http.get<Evento>(`${this.baseURL}/${id}`);
    return teste
  }

  postEvento(evento: Evento) {
    return this.http.post(`${this.baseURL}`, evento);
  }

  postUpload(file: File, name: string, idEvento?: number){
    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, name)


    return this.http.post(`${this.baseURL}/upload`, formData );
  }

  putEvento(evento: Evento) {
    return this.http.put(`${this.baseURL}/${evento.eventoId}`, evento);
  }

  delete(idEvento: number) {
    return this.http.delete(`${this.baseURL}/${idEvento}`);
  }
  

}
