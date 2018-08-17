import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/interface/user';
import { Service } from '../../../shared/interface/service';
import { ApiConnectionService } from '../../../services/api-connection/api-connection.service';
import { map, switchMap, throttle } from 'rxjs/operators';
import { Booking } from '../../../shared/interface/booking';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public addTab = false
  public edit= false
  
  public allServices:any 

  public createSer:Service = new Service();

  public name=""
  public duration=""
  public description=""
  public spaces=this.getSpaces()
  public price=""
  public valid = false
  public succes = false

  public notif_on = false;
  public notif_txt = ""
  public errors = 0
  public account_id = Number(localStorage.getItem('id'))

  constructor( private dataService: ApiConnectionService) { }

  ngOnInit() {
     this.getAllServices(this.account_id)
  }

  getAllServices(id){
    this.dataService.getAllServicesId(id).subscribe((result: any) => {
    this.allServices = result;
    });
    this.allServices=this.allServices;
    
  }
  
  reset(){
    this.name=""
    this.duration=""
    this.description=""
    // this.spaces=""
    this.price=""
    this.createSer = new Service();
  }

  num(n){
    return Number(n)?true:false
  }

  createService(){
    this.errors=0
    this.notif_txt =""

    if (this.name.length<3 && this.name !="" ){
      this.notif_txt  += "The Name need to have at least 3 characters\n"
      this.errors+=1
    }

    if(this.duration.length>0  || this.price.length>0 ){
      if((!Number(this.duration)&& this.duration.length>0  ) || (!Number(this.price)&& this.price.length>0)  ){
        this.errors+=1
        this.notif_txt  += "Enter a number\n"
      }
    }
    
    if(this.errors==0 && this.name.length>=3 && this.duration!=""  && this.price!=""){
      this.valid = true
    }else{
    this.valid=false
    let x = this
    window.scrollTo(0, 0);
    this.notif_on=true;
    setTimeout(function () {
      x.notif_on = false
    }, 5000);
    }

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
    if(this.createSer.program[day][hour]==0){
      this.createSer.program[day][hour]=1
    }else{
      this.createSer.program[day][hour]=0
    }
    this.spaces= this.getSpaces()
  }

  submit(){
    if(this.errors==0 && this.name.length>=3 && this.duration!=""  && this.price!=""){
        this.createSer.name = this.name
        this.createSer.price = Number(this.price)
        this.createSer.description = this.description
        this.createSer.spaces = Number(this.spaces)
        this.createSer.duration = Number(this.duration)
        this.createSer.company_id= Number(localStorage.getItem('id'));
        this.createSer.available_spaces = Number(this.spaces);

        if(this.edit==false){
          this.dataService
          .createService(this.createSer)
          .subscribe((res: any) => {
            let x = this
            window.scrollTo(0, 0);
            this.reset();
            this.notif_txt  += "Service created!"
            this.addTab=false
            this.succes=true
            this.notif_on=true;
            setTimeout(function () {
              x.notif_on = false
              x.succes=false
              window.location.reload();
            }, 3000);
            
          });
        }else{
          this.dataService
          .updateService(this.createSer)
          .subscribe((res: any) => {
            let x = this
            window.scrollTo(0, 0);
            this.reset();
            this.notif_txt  += "Service edited!"
            this.addTab=false
            this.succes=true
            this.notif_on=true;
            setTimeout(function () {
              x.notif_on = false
              x.succes=false
            }, 3000);
            
          });
        }

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
    if(!start_day){
      return "Unavailable"
    }else
    if(end_hour==0){
      end_hour = start_hour+1
    }
    if(start_day==end_day){
      return (start_day+","+start_hour+":00 - "+end_hour +":00")
    }else{
      return (start_day+"-"+end_day+","+start_hour+":00 - "+end_hour +":00")
    }

   
  }

  editService(service){
    this.edit=true
    this.createSer = service
    this.name=service.name
    this.duration=service.duration
    this.description=service.description
    this.spaces=service.available_spaces
    this.price=service.price
    this.valid = true
    this.addTab=true
    console.log(service)
  }

  deleteService(service,index){


  
    this.dataService
      .getBookingsbyServiceId(service.id)
      .subscribe((res: any) => {
       
        let serviceslist = res
      
        for (const key in serviceslist) {
          if (serviceslist.hasOwnProperty(key)) {
            const id = serviceslist[key].id;
            this.dataService.deleteBookings(id).subscribe()
          }
        }

      }
    )


    this.dataService
      .deleteService(service.id)
      .subscribe((res: any) => {
        let x = this
        window.scrollTo(0, 0);
        this.reset();
        this.notif_txt  += "Service deleted!"
        this.addTab=false
        this.succes=true
        this.notif_on=true;
        setTimeout(function () {
          x.notif_on = false
          x.succes=false
        }, 3000);
        
      });
      var t = this.allServices.indexOf(this.allServices[index]);
    this.allServices.splice(t, 1);
  }

  getSpaces(){
    let spaces = 0
    for (const day in this.createSer.program) {
      if (this.createSer.program.hasOwnProperty(day)) {
        const ore = this.createSer.program[day];
        for (const ora in ore) {
          if (ore.hasOwnProperty(ora)) {
            const val_ora = ore[ora];

            if(val_ora==1){
              spaces+=1
            }
      
          }
        }
      }
    }
    return spaces
  }

}
