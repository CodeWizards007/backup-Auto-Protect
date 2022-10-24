import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Expert} from "../common/Expert";
import {baseUrl} from "../../environments/environment";
import {Constat} from "../common/Constat";

@Injectable({
  providedIn: 'root'
})
export class ConstatService {



  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }


  getConstatsList(id:any): Observable<Constat[]> {
    return this.httpClient.get<Constat[]>(baseUrl+'/EXPERT-SERVICE/expert/constat/getall/'+id,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }



  delete(id: any) {
    return this.httpClient.delete<string>(baseUrl+'/EXPERT-SERVICE/expert/' + id,{
      withCredentials: true,
    })
  }

  getExpertById(id: string|null): Observable<Expert> {
    return this.httpClient.get<Expert>('http://localhost:8080/utilisateur/getConsultant/' + id,{
      withCredentials: true,
    });

  }

  editExpert(c: Expert): Observable<Expert> {

    return this.httpClient.put<Expert>('http://localhost:8080/utilisateur/edit/Consultant', c,{
      withCredentials: true,
    });
  }
  addExpert(c: Expert): Observable<Expert> {

    return this.httpClient.post<Expert>(baseUrl+'/EXPERT-SERVICE/expert/auth/signup', c,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }


}
