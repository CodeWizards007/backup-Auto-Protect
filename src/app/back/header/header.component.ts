import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';
import {AuthexpertServiceService} from "../../services/authexpert.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthexpertServiceService,private route : Router) { }

  ngOnInit(): void {
  }


  logout(){
    this.auth.logout().subscribe(()=>{
      window.localStorage.clear();this.route.navigate(['../']);
    });
  }
}
