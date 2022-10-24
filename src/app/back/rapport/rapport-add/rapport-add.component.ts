import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Rapport} from "../../../common/Rapport";
import {ActivatedRoute, Router} from "@angular/router";
import {RapportService} from "../../../services/rapport.service";

@Component({
  selector: 'app-rapport-add',
  templateUrl: './rapport-add.component.html',
  styleUrls: ['./rapport-add.component.css']
})
export class RapportAddComponent implements OnInit {

  idconstat!:any;
  rapport : Rapport=new Rapport();
  add=this.fb.group({
    montant: ['',[Validators.required]],
    remarque: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(500)]]
  });
  constructor(private route : Router,private fb: FormBuilder,private rapportService : RapportService,private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.idconstat=params.get('id');})
  }
  addRapport(rapport:Rapport){




    rapport.montantRembourse=Number(this.add.controls['montant'].value!);
    rapport.remarque=this.add.controls['remarque'].value!;



    this.rapportService.addRapport(rapport,this.idconstat).subscribe(
      (data)=>{console.log(data)},
      (error)=>{/*this.messageService.add({severity:'failed', summary: 'Failed', detail: 'ERREUR'})*/;
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['../']);
          };},1000)
      },
      ()=>{/*this.messageService.add({severity:'success', summary: 'Success', detail: 'Ajouter avec succée'});*/

      }
    )
  }
}
