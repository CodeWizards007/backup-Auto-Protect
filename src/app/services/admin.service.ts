import {Admin} from "../common/Admin";
import {Expert} from "../common/Expert";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {baseUrl} from "../../environments/environment";
import {Injectable} from "@angular/core";



@Injectable({
  providedIn: 'root'
})

export class AdminService{
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();
  constructor(private httpClient: HttpClient) { }

  getAdmins():Observable<Admin[]>{
    return this.httpClient.get<Admin[]>(baseUrl+'/ADMIN-SERVICE/admin/crud/getAll',{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }


}
