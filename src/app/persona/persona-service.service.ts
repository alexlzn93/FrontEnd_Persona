import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Persona } from './persona';
@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

  private APIaddPersona: string = 'http://localhost:8082/añadir';
  private APIgetPersonas: string = 'http://localhost:8082/listPersonas';
  private APIdeletePersonas: string = 'http://localhost:8082/delete';

  private httpHeaders= new HttpHeaders({'Content-Type': 'application/json'})

  constructor(public http: HttpClient) { }

  listarPersonas(): Observable<Persona[]> { //le mando al Obvservable que observe este metodo
      return this.http.get<Persona[]>(this.APIgetPersonas);
  }

  addPersona(persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(this.APIaddPersona,persona,{headers:this.httpHeaders})
  }
  deletePersona(id:number):Observable<Persona>{
    return this.http.delete<Persona>(this.APIdeletePersonas+ "/" + id);
  }
}
