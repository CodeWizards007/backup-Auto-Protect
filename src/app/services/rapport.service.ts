import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Constat} from "../common/Constat";
import {baseUrl} from "../../environments/environment";
import {Rapport} from "../common/Rapport";

@Injectable({
  providedIn: 'root'
})
export class RapportService {


  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }


  addRapport(r:Rapport,id:any): Observable<Rapport> {
    return this.httpClient.post<Rapport>(baseUrl+'/EXPERT-SERVICE/expert/rapport/add/'+id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }
}
