import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/ng-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:any;
  constructor(public ngAuthService: NgAuthService) { }

  ngOnInit(): void {
    this.user=localStorage.getItem('user');
  }

}
