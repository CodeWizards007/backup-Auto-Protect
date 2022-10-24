import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {BehaviorSubject, Observable} from "rxjs";


import {LoginRequest} from "../common/LoginRequest";
import {baseUrl} from "../../environments/environment";
import {Responsable} from "../common/Responsable";

@Injectable({
  providedIn: 'root'
})
export class AuthresponsableServiceService {

  userProfile:BehaviorSubject<Responsable> = new BehaviorSubject<Responsable>({
    id:0,
    nom:'',
    prenom:'',
    username:'',
    password:'',
    role:[''],
    roles:[''],
  });
  uservalue:BehaviorSubject<Responsable> = new BehaviorSubject<Responsable>(JSON.parse(localStorage.getItem('user-profile')!));

  constructor(private http: HttpClient) { }

  login(c: LoginRequest):Observable<Responsable>  {

    return this.http.post<Responsable>(baseUrl+'/resp/auth/signin', c,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  profile(id:any): Observable<Responsable> {
    /* console.log(this.http.get<Admin>('http://localhost:8080/utilisateur/get/'+id, {
       withCredentials: true,
     }));*/


    return this.http.get<Responsable>(baseUrl+'/resp/responsable/getOne/'+id, {
      withCredentials: true,
    });
  }

  saveUserToLocalStorage(u: Responsable) {

    this.userProfile.next(u);
    //console.log(this.userProfile);
    window.localStorage.setItem('user-profile', JSON.stringify(u));
  }


  loadUserFromLocalStorage(): Responsable {
    if (this.userProfile.value.id == 0) {
      let fromLocalStorage = localStorage.getItem('user-profile');
      if (fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    return this.userProfile.value;
  }

  logout(){
    localStorage.removeItem('user-profile');
    return this.http.post('http://localhost:8080/resp/auth/signout',{},{
      withCredentials: true,
    });
  }


 get isResponsableIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    return !!user.role.includes("ROLE_RESPONSABLE");

  }



}
