import { Component, OnInit } from '@angular/core';

import {AuthexpertServiceService} from "../../services/authexpert.service";
import {Expert} from "../../common/Expert";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userInfo!: Expert;

  constructor(private auth:AuthexpertServiceService) { }

  ngOnInit(): void {


    this.userInfo = this.auth.loadUserFromLocalStorage();


  }

}
