import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/interface/user';
import { Service } from '../../../shared/interface/service';
import { ApiConnectionService } from '../../../services/api-connection/api-connection.service';
import { Booking } from '../../../shared/interface/booking';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  public allServices:any 
  public allBookings:any 
  public selected_service = "Service name"
  public servicesnr = 0 
  public bookingsnr=0

  constructor( private dataService: ApiConnectionService) { }
  public account_id = Number(localStorage.getItem('id'))

  ngOnInit() {
    this.getAllServices(this.account_id)
  }

  getAllServices(id){
    this.dataService.getAllServicesId(id).subscribe((result: any) => {
    this.allServices = result;
    this.servicesnr=result.length
    });
  }

  getBookings(id){ 
    this.dataService.getBookingsbyServiceId(id).subscribe((result: any) => {
      this.allBookings = result;     
      this.bookingsnr = result.length
      });
  }
  handler(){
   
    let element: HTMLElement = document.getElementsByClassName('select_service')[0] as HTMLElement;
    element.click();
  }

}
