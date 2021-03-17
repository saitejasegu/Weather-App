import { Component, OnInit } from '@angular/core';
import { NgAuthService } from "../../ng-auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  user:any;
  parsedJson: any;
  constructor(public ngAuthService: NgAuthService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.parsedJson = JSON.parse(this.user);
    console.log(this.parsedJson.uid);
    localStorage.setItem('authtoken',this.parsedJson.uid);
  }

}
