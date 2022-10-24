import { Injectable } from '@angular/core';
import {Responsable} from "../common/Responsable";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }


  getResponsablesList(): Observable<Responsable[]> {
    return this.httpClient.get<Responsable[]>(baseUrl+'/resp/responsable/getAll',{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }



  deleteResponsable(id: any) {
    return this.httpClient.delete<string>(baseUrl+'/resp/responsable/DeleteID/' + id,{
      withCredentials: true,
    })
  }

  getResponsableById(id: string|null): Observable<Responsable> {
    return this.httpClient.get<Responsable>(baseUrl+'/resp/responsable/getOne/' + id,{
      withCredentials: true,
    });

  }

  editResponsable(c: Responsable): Observable<Responsable> {

    return this.httpClient.put<Responsable>(baseUrl+'/resp/responsable/updateResp', c,{
      withCredentials: true,
    });
  }

  addResponsable(c: Responsable): Observable<Responsable> {

    return this.httpClient.post<Responsable>(baseUrl+'/resp/auth/signup', c,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

}
