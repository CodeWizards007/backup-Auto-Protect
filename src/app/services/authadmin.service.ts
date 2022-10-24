import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {BehaviorSubject, Observable} from "rxjs";


import {LoginRequest} from "../common/LoginRequest";
import {baseUrl} from "../../environments/environment";
import {Admin} from "../common/Admin";

@Injectable({
  providedIn: 'root'
})
export class AuthadminServiceService {

  userProfile:BehaviorSubject<Admin> = new BehaviorSubject<Admin>({
    id:0,
    nom:'',
    prenom:'',
    username:'',
    email:'',
    password:'',
    cin:0,
    telephone:0,
    adresse:'',
    dateNaissance:new Date(),
    createdAt:new Date(),
    updatedAt:new Date(),
    role:[''],
    roles:[''],
  });
  uservalue:BehaviorSubject<Admin> = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('user-profile')!));

  constructor(private http: HttpClient) { }

  login(c: LoginRequest):Observable<Admin>  {

    return this.http.post<Admin>(baseUrl+'/ADMIN-SERVICE/admin/auth/signin', c,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  signup(a:Admin):Observable<Admin>{
    return this.http.post<Admin>(baseUrl+'/ADMIN-SERVICE/admin/auth/signup',a,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
    })
    });
  }

  profile(id:any): Observable<Admin> {
    /* console.log(this.http.get<Admin>('http://localhost:8080/utilisateur/get/'+id, {
       withCredentials: true,
     }));*/


    return this.http.get<Admin>(baseUrl+'/ADMIN-SERVICE/admin/crud/get/'+id, {
      withCredentials: true,
    });
  }

  saveUserToLocalStorage(u: Admin) {

    this.userProfile.next(u);
    //console.log(this.userProfile);
    window.localStorage.setItem('user-profile', JSON.stringify(u));
  }


  loadUserFromLocalStorage(): Admin {
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
    return this.http.post('http://localhost:8080/api/auth/signout',{},{
      withCredentials: true,
    });
  }


 get isAdminIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    return !!user.role.includes("ROLE_ADMIN");

  }



}
