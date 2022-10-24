import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {BehaviorSubject, Observable} from "rxjs";

import {Expert} from "../common/Expert";
import {LoginRequest} from "../common/LoginRequest";
import {baseUrl} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthexpertServiceService {

  userProfile:BehaviorSubject<Expert> = new BehaviorSubject<Expert>({
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
uservalue:BehaviorSubject<Expert> = new BehaviorSubject<Expert>(JSON.parse(localStorage.getItem('user-profile')!));



  constructor(private http: HttpClient) { }

  login(c: LoginRequest):Observable<Expert>  {

    return this.http.post<Expert>(baseUrl+'/EXPERT-SERVICE/expert/auth/signin', c,{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })

    });
  }

  profile(id:any): Observable<Expert> {
   /* console.log(this.http.get<Expert>('http://localhost:8080/utilisateur/get/'+id, {
      withCredentials: true,
    }));*/


    return this.http.get<Expert>(baseUrl+'/EXPERT-SERVICE/expert/crud/get/'+id, {
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }

  saveUserToLocalStorage(u: Expert) {

    this.userProfile.next(u);
    //console.log(this.userProfile);
    window.localStorage.setItem('user-profile', JSON.stringify(u));
  }


  loadUserFromLocalStorage(): Expert {
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
    return this.http.post(baseUrl+'/EXPERT-SERVICE/expert/auth/signout',{},{
      withCredentials: true,
      headers:new HttpHeaders({
        'Access-Control-Allow-Origin':'*'
      })
    });
  }


  get isExpertIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user-profile')!);
    return !!user.role.includes("ROLE_EXPERT");

  }



}
