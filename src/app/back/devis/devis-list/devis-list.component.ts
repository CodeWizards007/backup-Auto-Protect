import { Component, OnInit } from '@angular/core';
import {Devis} from "../../../common/Devis";
import {Constat} from "../../../common/Constat";
import {baseUrl} from "../../../../environments/environment";
import {HttpHeaders} from "@angular/common/http";
import {Expert} from "../../../common/Expert";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthexpertServiceService} from "../../../services/authexpert.service";
import {DevisService} from "../../../services/devis.service";
declare var $: any;
@Component({
  selector: 'app-devis-list',
  templateUrl: './devis-list.component.html',
  styleUrls: ['./devis-list.component.css']
})
export class DevisListComponent implements OnInit {


  userInfo?: Expert;

  devis : Devis[]=[];
  constructor(private route : Router,private activatedroute: ActivatedRoute,private auth:AuthexpertServiceService,private devisService : DevisService) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.listDevis(params.get('id'));})

    this.auth.userProfile.subscribe((data) => {
      this.userInfo = data;
    });
    setTimeout(()=>{

      $(function () {


        $('#exams').DataTable({
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
            "infoFiltered": "(filtrer de _MAX_ total records)",
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

    },200);

  }

  listDevis(id:any){

    this.devisService.getConstatById(id).subscribe(
      (data)=>{


        for(let d of data.devis){
          this.devisService.getDevisById(d).subscribe(
            (data)=>{
this.devis.push(data);
            });
        }



        },
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{}
    )

  }

conf(devis:Devis){
    devis.status="confirmer";
this.devisService.modifyDevis(devis).subscribe(
  ()=>{

  }

)
}
ref(devis:Devis){
    devis.status="refuser";
this.devisService.modifyDevis(devis).subscribe(
  ()=>{

  }

)
}





  /* let devis: Devis[]=[]
  for(let d of constat.devis){
  devis.push( this.httpClient.get<Constat>(baseUrl+'/EXPERT-SERVICE/expert/rapport/getconstat/'+d,{
  withCredentials: true,
  headers:new HttpHeaders({
  'Access-Control-Allow-Origin':'*'
})


}))
}*/
}
