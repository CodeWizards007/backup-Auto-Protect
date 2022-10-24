import { Component, OnInit } from '@angular/core';
import {Expert} from "../../../common/Expert";
import {FormBuilder, Validators} from "@angular/forms";
import {Role} from "../../../common/Role";
import {Router} from "@angular/router";
import {ExpertService} from "../../../services/expert.service";


@Component({
  selector: 'app-expert-add',
  templateUrl: './expert-add.component.html',
  styleUrls: ['./expert-add.component.css']
})
export class ExpertAddComponent implements OnInit {

  expert: Expert= new Expert();

  roles : string[]=Object.keys(Role).filter((item) => {
    return isNaN(Number(item));});

  addexpert=this.fb.group({
    username: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
    nom: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    cin: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
    prenom: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
    adresse: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(30)]],
    password: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(50)]],
    telephone: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(12),Validators.pattern('[0-9]+')]],
    email: ['',[Validators.required,Validators.email]],

    photo: ['',[Validators.pattern('http[s]?://.*')]],

    rol: ['',[Validators.required]]

  })


  constructor(private route : Router,private fb: FormBuilder,private expertService:ExpertService) { }

  ngOnInit(): void {



  }

  addExpert(expert:Expert){


    let roles: string[]=[];
    roles.push(this.addexpert.controls['rol'].value!)
    expert.username=this.addexpert.controls['username'].value!;//f
    expert.nom=this.addexpert.controls['nom'].value!;//f
    expert.prenom=this.addexpert.controls['prenom'].value!;//f
    expert.telephone=Number(this.addexpert.controls['telephone'].value!);//f
    expert.email=this.addexpert.controls['email'].value!;//f
    expert.password=this.addexpert.controls['password'].value!;//f
    expert.cin=Number(this.addexpert.controls['cin'].value!);
    expert.adresse=this.addexpert.controls['adresse'].value!;

    expert.role=roles;

    this.expertService.addExpert(expert).subscribe(
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


  get nom(){
    return this.addexpert.get('nom');
  }
  get photo(){
    return this.addexpert.get('photo');
  }
  get prenom(){
    return this.addexpert.get('prenom');
  }
  get email(){
    return this.addexpert.get('email');
  }
  get telephone(){
    return this.addexpert.get('telephone');
  }


}
