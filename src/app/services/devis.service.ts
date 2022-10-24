import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Expert} from "../common/Expert";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Constat} from "../common/Constat";
import {baseUrl} from "../../environments/environment";
import {Devis} from "../common/Devis";

@Injectable({
  providedIn: 'root'
})
export class DevisService {


  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }

  getConstatById(id: any): Observable<Constat> {
    return this.httpClient.get<Constat>(baseUrl+'/EXPERT-SERVICE/expert/rapport/getconstat/'+id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })


    });


  }

  getDevisById(id: any): Observable<Devis> {
    return this.httpClient.get<Devis>(baseUrl+'/EXPERT-SERVICE/expert/constat/getdevis/'+id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })


    });


  }

  modifyDevis(d: Devis): Observable<Devis> {
    return this.httpClient.put<Devis>(baseUrl+'/EXPERT-SERVICE/expert/constat/editdevis',d,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })


    });


  }


}
