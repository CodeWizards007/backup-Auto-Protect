import { Component, OnInit } from '@angular/core';
import {AuthexpertServiceService} from "../../../services/authexpert.service";
import {ConstatService} from "../../../services/constat.service";
import {Router} from "@angular/router";
import {Constat} from "../../../common/Constat";
import {Expert} from "../../../common/Expert";
declare var $: any;
@Component({
  selector: 'app-list-constats-expert',
  templateUrl: './list-constats-expert.component.html',
  styleUrls: ['./list-constats-expert.component.css']
})
export class ListConstatsExpertComponent implements OnInit {

  userInfo?: Expert;

  constats : Constat[]=[];
  /*title = 'TD';
  dtOptions: any = {};*/
  constructor(private constatService:ConstatService, private auth:AuthexpertServiceService,private route : Router) { }

  ngOnInit(): void {
    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;this.listConstats(1);

    });




    setTimeout(()=>{

      $(function () {


        $('#TD').DataTable({
          "paging": true,
          "lengthChange": true,
          "searching": true,
          "ordering": true,
          "info": true,
          "autoWidth": true,
          "responsive": true,



          "language": {
            "lengthMenu": "Afficher _MENU_ ",
            "zeroRecords": "Rien Trouver ",
            "info": "Affichage page _PAGE_ de _PAGES_",
            "infoEmpty": "Aucunne information disponible",
            "infoFiltered": "(filtrer de _MAX_ total resultats)",
            "search": " <div style='margin-right:49%'>Rechercher:</div>",

            "paginate":{
              "previous":"Précédent",
              "next": "Prochain",
              "last":"Dernier",
              "first":"Premier",
            }
          }

        });
      });

console.log(this.constats)


    },200)


  }

  listConstats(id:any){

    this.constatService.getConstatsList(id).subscribe(
      (data)=>{this.constats=data;},
      (error)=>{

        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)

      },
      ()=>{}
    )

  }
 /* delete(id:any){

    this.constatService.delete(id).subscribe(
      (data) =>{this.listConsultant();window.location.reload();},
      (error) =>{}
    );
    this.listConsultant();

  }*/



}
