import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../shared/interface/user';
import { ApiConnectionService } from '../../../services/api-connection/api-connection.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public users:any; 
  public registerUser:User = new User();
  public currentRoute

  public myUserData: User = new User();
  public logUser: User = new User();
  public resetUser: User = new User();
  public message: String;

  constructor(
    private dataService: ApiConnectionService,
   
    private router: Router
  ) { 
    router.events.subscribe();
    this.currentRoute = router.url;
 
    if (this.currentRoute == "/login") {
     if (localStorage.getItem('token') != ""){
      this.router.navigate(['/profile']);
  
     }
    }
  }

  public page = "login"

  public Email = ''
  public email_valid = this.Email.length >0 ? false:true;

  public Password = ''
  public password_valid = this.Password.length >0 ? false:true;

  public Name = ''
  public name_valid = this.Name.length>0?false:true;

  public notif_msg=[]
  public success_msg = false
  public recover_msg = ""
  public login_failed_msg = ""

  public type = "password"
  public eyeclass="fas fa-eye-slash"

  ngOnInit() {
  }

  validate(){
    this.notif_msg=[];
    
    if (this.Email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)||this.Email.length <1) {
      this.email_valid = true;
    }else{
      this.email_valid = false;
      // this.notif_msg.push("Email invalid.")
    }

    if (this.Password.length <1) {
      this.password_valid = true;
    }else{
      let err = false;
      if (!this.Password.match(/\w*[A-Z]\w*/)){
        this.password_valid = false;
        err = true;
        this.notif_msg.push(" • 1 uppercase ")
      }
      if (!this.Password.match(/\w*[a-z]\w*/)){
        this.password_valid = false;
        err = true;
        this.notif_msg.push(" • 1 lowercase ")
      }
      if (!this.Password.match(/\w*[\d]\w*/)){
        this.password_valid = false;
        err = true;
        this.notif_msg.push(" • 1 number ")
      }
      if (!this.Password.match(/\w*[$@!%*#?&_.\-,+]\w*/)){
        this.password_valid = false;
        err = true;
        this.notif_msg.push(" • 1 special character ")
      }
      if (this.Password.length<8){
        this.password_valid = false;
        err = true;
        this.notif_msg.push(" • at least 8 characters ")
      }
      if (err){
        this.notif_msg.push("Password must contain :")
      }else{
        this.password_valid = true;
      }
    }

    if (this.page=='register') {
      if(this.Name.length <1) {
        this.name_valid = true;
      }else{
        let err = false;
        if(this.Name.length<4){
          this.name_valid = false;
          this.notif_msg.push("• at least 4 characters")
          err = true;
        }
        if(!this.Name.match(/^[A-Za-z0-9_]+$/)){
          this.notif_msg.push("•  alphanumeric characters and underscores '_'")
          this.name_valid = false;
          err = true;
        }
        if (err){
          this.notif_msg.push("Your Name must contain :")
        }else{
          this.name_valid = true;
        }
      }

     

      if ((this.Name.match(/^[A-Za-z0-9_]+$/) &&this.Name.length >3) ||this.Name.length <1) {
        this.name_valid = true;
      }else{
        this.name_valid = false;
      }
    }
  
    if(this.notif_msg.length>1){
      let reverse =[]
      for (let index = this.notif_msg.length; index >= 0; index--) {
        const element = this.notif_msg[index];
        reverse.push(element)
      }
      this.notif_msg=reverse
    }
 
  }

  reset(){
    this.Email = "";
    this.Password = "";
    this.Name="";
    this.email_valid = true;
    this.password_valid = true;
    this.name_valid=true;
    this.notif_msg=[];
  }

  eye(){
    this.type=this.type=="password"?"text":"password";
    this.eyeclass=this.eyeclass=="fas fa-eye-slash"?"fas fa-eye":"fas fa-eye-slash";
  }

  generate_token(length){
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
  }

  formSubmit(event) {
    if (this.page == 'register' && this.notif_msg.length==0){
      let email = event.target.querySelector('#email').value;
      let password = event.target.querySelector('#password').value;
      let name = event.target.querySelector('#username').value;
      this.registerUser = {email:email,username:name,password:password,token:this.generate_token(32),logo:'https://d2z1ksq6nul58p.cloudfront.net/sites/default/files/logo-white.svg',companyDescription:'',companyName:''};
      this.emailAndUserAvailable()
    }
    if (this.page=='recover'){
      let email = event.target.querySelector('#email').value.toLowerCase()
      this.dataService.getAllUsers().subscribe(res => {
        let valid =false
        for (let index = 0; index < res.length; index++) {
          if(email == res[index].email.toLowerCase()){
            valid = true
            var x = this;
            x.recover_msg = "Change your password"
            this.page="changePass"
            localStorage.setItem('user_id',res[index].id.toString());
            setTimeout(function () {
              x.recover_msg = ""
            }, 4000);
          }
        }
        if (valid==false){
          var x = this;
          x.recover_msg = "Email invalid!"
          setTimeout(function () {
            x.recover_msg = ""
          }, 4000);
        }
      });
    }

    if(this.page=="changePass"){
      let password = event.target.querySelector('#password').value;
      
      this.dataService.getAllUsers().subscribe(res => {
        for (let index = 0; index < res.length; index++) {
          if(localStorage.getItem('user_id').toUpperCase() == res[index].id.toString()){
            var x = this;
            x.recover_msg = "Password canged!"
            this.registerUser = res[index]
            this.registerUser.password = password
            this.dataService.updatePassword(this.registerUser).subscribe();
            this.reset()
            this.page='login';
            setTimeout(function () {
              x.recover_msg = ""
            }, 4000);
          }
        }
      });

    

  

    }
    if (this.page == 'login'){
      this.logUser.email = event.target.querySelector('#email').value;
      this.logUser.password = event.target.querySelector('#password').value;
      this.loginUser()
    }
  }

  loginUser() {
    this.login_failed_msg = ""
    this.users = this.dataService.getAllUsers()
    this.dataService.getAllUsers().subscribe(res => {
    let ok = false;let id = 0
     for (let index = 0; index < res.length; index++) {
       if(res[index].email ==   this.logUser.email ){
        if(res[index].password ==  this.logUser.password){
          ok = true
          id = Number(res[index].id)
        }
       }
     }
     if(ok==true){
      this.dataService
      .getUserById(id)
      .subscribe((res: any) => {
          localStorage.setItem('token', res[0].token);
          localStorage.setItem('id', id.toString());
          this.logUser = res[0]
          this.router.navigate(['/profile']);
          window.location.reload();
          console.log(res)
     });

     }else{
      this.login_failed_msg ="Your email or password is invalid, try again!"
      this.reset()
      var x = this;
      setTimeout(function () {
        x.login_failed_msg = "";
      }, 4000);
     }
    });

    // this.dataService
    //   .loginUser(this.logUser)
    //   .subscribe((res: any) => {
    //     console.log('res ', res);

    //     // const token = res.message.split(':')[1];
    //     // const success_message = res.success.toString();
    //     // // const isAdmin = res.roles.name.toString();
    //     // console.log('tip', typeof success_message);
    //     // console.log('token ', token);
    //     // // console.log('is admin= ', isAdmin);
    //     // if (success_message === 'false') {
    //     //   this.password_message = 'Your email or password is invalid, try again!'
    //     //   this.router.navigate(['/login']);
    //     // }
    //     // else {
    //     //   localStorage.setItem('token', token);
    //     //   localStorage.setItem('email', this.logUser.email.toString());
    //     //   localStorage.setItem('success_message', success_message);
    //     //   this.router.navigate(['/dashboard']);
    //     //   window.location.reload();
    //     //   this.password_message = '';
    //     // }

    //   }, (err) => {
    //     console.log(err);
    //   });
  }

  getUser(){
    this.users = this.dataService.getAllUsers()
     this.dataService.getAllUsers().subscribe(res => {
      let duplicate_email = false;
      for (let index = 0; index < res.length; index++) {
        if(res[index].email == "manolea.ioan@yahoo.com"){
          duplicate_email=true
        }
      }

     });
  }

  emailAndUserAvailable(){
    let Email = this.registerUser.email.toLowerCase()
    let User = this.registerUser.username.toLowerCase()
    this.users = this.dataService.getAllUsers()
    this.dataService.getAllUsers().subscribe(res => {
      let duplicate_email = false;
      let duplicate_user = false
      for (let index = 0; index < res.length; index++) {
        if(res[index].email.toLowerCase() == Email){
          duplicate_email=true
        }
        if(res[index].username.toLowerCase() == User){
          duplicate_user=true
        }
      }
      console.log(duplicate_email)
      if(duplicate_email==true){
        this.email_valid = false;
        this.notif_msg.push("Email \""+Email+"\" is already taken!")
      }else if(duplicate_user==true){
        this.name_valid = false;
        this.notif_msg.push("Username \""+User+"\" is already taken!")
      }else if(duplicate_user==false && duplicate_email==false){
        this.dataService.registerUser(this.registerUser).subscribe();
        this.reset()
        this.page = "login"
        var x = this;
        x.success_msg = true;
        setTimeout(function () {
          x.success_msg = false;
        }, 4000);
      }
     });
  }
}
