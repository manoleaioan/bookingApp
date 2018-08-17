import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/interface/user';
import { Service } from '../../../shared/interface/service';
import { ApiConnectionService } from '../../../services/api-connection/api-connection.service';
import { map, switchMap, throttle } from 'rxjs/operators';
import { Booking } from '../../../shared/interface/booking';

@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.css']
})
export class BooknowComponent implements OnInit {

  public addTab = false
  public tab=1
  public edit= false
  public popUpvisible=false
  public allServices:any
  public allUsers:any
  public companies = true 
  public servicesnr = 0 
  public createSer:Service = new Service();
  public createBooking:Booking = new Booking()
  public loggedUser:User = new User();

  public comp_name=""
  public comp_desc=""
  public comp_profile=""

  public name=""
  public email=""
  public phone=""
  
  public email_valid = this.email.length >0 ? false:true;
  public name_valid = this.name.length >0 ? false:true;
  public phone_valid = this.phone.length >0 ? false:true;
  public checked=false
  
  public duration=""
  public description=""
  public spaces=""
  public price=""
  public valid = false
  public succes = false

  public notif_on = false;
  public notif_txt = ""
  public errors = 0
  
  public account_id = Number(localStorage.getItem('id'))

  constructor( private dataService: ApiConnectionService) { }

  ngOnInit() {
 
     this.getLoggedUser(this.account_id)
     this.getAllUsers()
  }

  getAllUsers(){
    this.dataService.getAllUsers().subscribe((result: any) => {
      this.allUsers = result;
      });

  }

  getAllServices(id){
    this.dataService.getAllServicesId(id).subscribe((result: any) => {
    this.allServices = result;
    this.servicesnr=result.length

    });
   
  }
  
  getLoggedUser(id){
    this.dataService.getUserById(id).subscribe((result: any) =>this.loggedUser)
  }

  reset(){
    this.name=""
    this.duration=""
    this.description=""
    this.spaces=""
    this.price=""

    this.name=""
    this.email=""
    this.phone=""
    
  }

  num(n){
    return Number(n)?true:false
  }

  checkMarked(){
    let pro = 0
    for (const key in this.createSer.program) {
      if (this.createSer.program.hasOwnProperty(key)) {
        const element = this.createSer.program[key];
        for (let index = 0; index <10; index++) {
          const h = element[index];
          if(h==1){
            pro+=1;
          }
        }
      }
    }
    return pro
  }

  mark(day,hour){
    // if(this.createSer.program[day][hour]==0){
    //   this.createSer.program[day][hour]=1
    // }else{
    //   this.createSer.program[day][hour=0
    // }

    if(this.createSer.program[day][hour]==1){
      for (const day1 in this.createSer.program) {
        if (this.createSer.program.hasOwnProperty(day1)) {
          const ore = this.createSer.program[day1];
          for (const ora1 in ore) {
            if (ore.hasOwnProperty(ora1)) {
              const val_ora = ore[ora1];
              if(this.createSer.program[day1][ora1]==2){
                this.createSer.program[day1][ora1]=1
              }
 
            }}}}

      this.createSer.program[day][hour]=2
     
    }else
    if(this.createSer.program[day][hour]==2){
      this.createSer.program[day][hour]=1
   
    }
  }


  getAvailability(program){
    let start_hour = null
    let end_hour=null

    let start_day =""
    let end_day=""

    for (const day in program) {
      if (program.hasOwnProperty(day)) {
        const ore = program[day];
        for (const ora in ore) {
          if (ore.hasOwnProperty(ora)) {
            const val_ora = ore[ora];

            if(val_ora==1){
              if (start_hour ==null) {
                start_hour = Number(ora)
              }else if(ora<start_hour){
                 start_hour = Number(ora)
              }
              if (end_hour ==null) {
                end_hour = 0
   
              }else if(end_hour<=ora){
                end_hour = Number(ora)
              }
            }
      
          }
        }
      }
    }

    let week = {mon:1,tue:2,wed:3,thu:4,fri:5,sat:6,sun:7}
    for (const day in program) {
      const ore = program[day];
      let worked_day = false
      for (const key in ore) {
        if (ore.hasOwnProperty(key)) {
          const val_ora = ore[key];
          if(val_ora==1){
            worked_day=true
            if(start_day=="" || week[day] <=week[start_day]  ){
              start_day=day
            }
            if(end_day=="" || week[day] >=week[end_day]  ){
              end_day=day
            }
          }         
        }
      }
    }
    if(start_day==end_day){
      return (start_day+","+start_hour+":00 - "+end_hour +":00")
    }else{
      return (start_day+"-"+end_day+","+start_hour+":00 - "+end_hour +":00")
    }
    return (start_day+"-"+end_day+","+start_hour+":00 - "+end_hour +":00")
  }

  book(service){
    this.createSer = service
    this.popUpvisible=true;
  }

  validate(){
    let ok = 0
    if (this.email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)||this.email.length <1) {
      this.email_valid = true;
     ok+=1
    }else{
      this.email_valid = false;
    }

    if(this.name.length>3 ){
      this.name_valid = true;
      ok+=1    
    }else if(this.name.length>0){
      this.name_valid = false;
    }

    if(Number(this.phone)&& this.phone.length>0){
      this.phone_valid = true;
      ok+=1
    }else if(this.phone.length>0){
      this.phone_valid = false;
    }

    if(ok==3){
      this.valid=true
    }
  }

  nextTab(){
  
    if(this.valid==true){
   
      this.tab=2
    }
  }

  sendBooking(){
    for (const day in this.createSer.program) {
      if (this.createSer.program.hasOwnProperty(day)) {
        const ore = this.createSer.program[day];
        for (const ora in ore) {
          if (ore.hasOwnProperty(ora)) {
            const val_ora = ore[ora];

            if(val_ora==2){
              let endh :Number = Number(ora)+1
              this.tab=3
              console.log(
                this.name + " " + this.email + " " + this.phone + " " + day + ", " + ora + " - " + endh + " " + this.createSer.id
             
              )
             this.createBooking.service_id = this.createSer.id
             this.createBooking.name=this.name
             this.createBooking.email = this.email
             this.createBooking.phone = Number(this.phone)
             this.createBooking.available = day + ", " + ora + " - " + endh
             this.createBooking.company_id = this.createSer.company_id
             this.createBooking.serviceName = this.createSer.name
             this.dataService
              .createBooking(this.createBooking)
              .subscribe((res: any) => {
              
                
              });
              this.createSer.program[day][ora]=0
              this.createSer.available_spaces = Number(this.createSer.available_spaces)-1
              this.dataService
                .updateService(this.createSer)
                .subscribe((res: any) => {
              
                });
            }
      
          }
        }
      }
    }
  }

  displayBookings(id,comp_name,comp_profile,comp_desc){
    this.comp_name=comp_name
    this.comp_desc=comp_desc
    this.comp_profile=comp_profile

    this.companies=false
    this.getAllServices(Number(id))
  }

}
