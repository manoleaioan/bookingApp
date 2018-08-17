import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../shared/interface/user';
import { ApiConnectionService } from '../../../services/api-connection/api-connection.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public logUser: User = new User();
  public notif_on = false;
  constructor(
    private dataService: ApiConnectionService,
   
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService
    .getUserById(Number(localStorage.getItem("id")))
    .subscribe((res: any) => {
        this.logUser = res[0]
        console.log("logo este"+this.logUser.logo)
   });
  }

  logOut(){
    localStorage.setItem('token', '');
    localStorage.setItem('id', '');
    this.router.navigate(['/login']);
  }

  save(){
    this.dataService
    .updateUser(this.logUser)
    .subscribe((res: any) => {
    let x = this
    this.notif_on=true;
    setTimeout(function () {
      x.notif_on = false
    }, 2000);
   });
    
  }
}
