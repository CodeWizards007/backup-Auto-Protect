import { Component, OnInit } from '@angular/core';
import {Admin} from "../../common/Admin";
import {Router} from "@angular/router";

import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrls: ['./admin-stats.component.css']
})
export class AdminStatsComponent implements OnInit {

  admins: Admin[]=[];



  constructor(private route : Router, private adminService:AdminService ) { }

  ngOnInit(): void {
    this.listAdmins();
  }

  listAdmins(){
    this.adminService.getAdmins().subscribe(
      (data)=>{this.admins=data},
      (error)=>{
        setTimeout(()=>{
          if(error.status==401){
            this.route.navigate(['login']);
          };},1000)
      },
      ()=>{}
    )
  }

}
