import { Component, OnInit } from '@angular/core';
import {Responsable} from "../../common/Responsable";
import {FormBuilder, Validators} from "@angular/forms";
import {Role} from "../../common/Role";
import {Router} from "@angular/router";
import {ResponsableService} from "../../services/responsable.service";

@Component({
  selector: 'app-create-responsable',
  templateUrl: './create-responsable.component.html',
  styleUrls: ['./create-responsable.component.css']
})
export class CreateResponsableComponent implements OnInit {

  Responsable: Responsable= new Responsable();

  roles : string[]=Object.keys(Role).filter((item) => {
    return isNaN(Number(item));});

  addresponsable=this.fb.group({
    username: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
    nom: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    prenom: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(50)]],
    rol: ['',[Validators.required]]

  })

  constructor(private route : Router,private fb: FormBuilder,private ResponsableService:ResponsableService) { }

  ngOnInit(): void {
  }

  addResponsable(responsable:Responsable){


    let roles: string[]=[];
    roles.push(this.addresponsable.controls['rol'].value!)
    responsable.username=this.addresponsable.controls['username'].value!;//f
    responsable.nom=this.addresponsable.controls['nom'].value!;//f
    responsable.prenom=this.addresponsable.controls['prenom'].value!;//f
    responsable.password=this.addresponsable.controls['password'].value!;//f

    responsable.role=roles;

    this.ResponsableService.addResponsable(responsable).subscribe(
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
