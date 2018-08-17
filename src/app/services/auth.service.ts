import { Router } from "@angular/router";
import { Injectable, OnInit } from "@angular/core";
@Injectable()
export class AuthService implements OnInit {
  public token = localStorage.getItem('token')
  
  public success_message = localStorage.getItem('success_message');
  constructor(private router: Router) { }
  ngOnInit() {

  }

  isAuthenticated() {
    if (this.token != '') {
      return true;
    }
    return false;
  }
}