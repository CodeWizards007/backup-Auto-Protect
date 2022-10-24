import { Component, OnInit } from '@angular/core';
import {Admin} from "../../common/Admin";
import {Router} from "@angular/router";
import {AuthadminServiceService} from "../../services/authadmin.service";
import {Role} from "../../common/Role";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  admin:Admin=new Admin();

  roles : string[]=Object.keys(Role).filter((item) => {
    return isNaN(Number(item));});


  addadmin=this.fb.group({
    username: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(40)]],
    nom: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
    cin: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
    prenom: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
    adresse: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(30)]],
    password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(50)]],
    telephone: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('[0-9]+')]],
    email: ['',[Validators.required,Validators.email]],
    dateNaissance: ['',[Validators.required]],

    rol: ['',[Validators.required]]

  })


  constructor(private route : Router,private authAdmin:AuthadminServiceService,private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  addAdmin(admin:Admin){

    let roles: string[]=[];
    roles.push(this.addadmin.controls['rol'].value!)
    admin.username=this.addadmin.controls['username'].value!;//f
    admin.nom=this.addadmin.controls['nom'].value!;//f
    admin.prenom=this.addadmin.controls['prenom'].value!;//f
    admin.telephone=Number(this.addadmin.controls['telephone'].value!);//f
    admin.email=this.addadmin.controls['email'].value!;//f
    admin.password=this.addadmin.controls['password'].value!;//f
    admin.cin=Number(this.addadmin.controls['cin'].value!);
    admin.adresse=this.addadmin.controls['adresse'].value!;

    admin.role=roles;

    this.authAdmin.signup(admin).subscribe(
      (data)=>{console.log(data)},
      (error)=>{/*this.messageService.add({severity:'error', summary: 'Error', detail: error.error.message});*/
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)},
      ()=>{/*this.messageService.add({severity:'success', summary: 'Success', detail: 'Ajouter avec succée'}
      );*/
      }
    )

  }



}
