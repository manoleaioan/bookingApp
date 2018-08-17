import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/interface/user';
import { Service } from '../../../shared/interface/service';
import { ApiConnectionService } from '../../../services/api-connection/api-connection.service';
import { Booking } from '../../../shared/interface/booking';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public allServices:any 
  public allBookings:any 
  public selected_service = "Service name"
  public servicesnr = 0 
  public bookingsnr=0

  public mon=[]
  public tue=[]
  public wed=[]
  public thu=[]
  public fri=[]
  public sat=[]
  public sun=[]

  constructor( private dataService: ApiConnectionService) { }
  public account_id = Number(localStorage.getItem('id'))

  ngOnInit() {
    this.getBookings(this.account_id)

  }

  getBookings(id){ 
    this.dataService.getBookingsbyCompanyId(id).subscribe((result: any) => {
      this.allBookings = result; 
      this.bookingsnr = result.length
      for (const key in this.allBookings) {
        if (this.allBookings.hasOwnProperty(key)) {
          const book = this.allBookings[key];
          const day  = book.available.split(',')[0]
          this[day].push(book)
        }
      }
      });
  }

}
