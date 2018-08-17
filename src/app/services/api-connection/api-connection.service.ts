import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../shared/interface/user';
import { Service } from '../../shared/interface/service';
import {Booking}  from '../../shared/interface/booking'; 

import { map, switchMap, throttle } from 'rxjs/operators';

const Token = localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'x-access-token': localStorage.getItem('token') ? localStorage.getItem('token') : ''
  })
};

const Api = {
  // base: 'http://192.168.210.116:8080/',
  base: 'http://localhost:3000/',
  base1: 'http://localhost:3000/',
  userByEmail1: 'users',
  users: 'users',
  userByEmail: 'user?email=',
  register: 'users',
  login: 'users',
  reset: 'reset',
  changepass: 'users',
  userById: 'users',
  categories: 'categories?token=',
  createCategory: 'create/category?token=',
  coursesByCategoryId: 'courses?category=',
  courseById: 'courses?id=',
  createCourse: 'create/course?token=',
  chaptersByCourseId: 'chapters?course=',
  chapterById: 'chapter?id=',
  createChapter: 'create/chapter',
  questionsByChapterId: 'create/chapter',
  createQuestions: 'create/question',
  user: 'user',
  course: 'course',
  course_category: '/courses?category=',
  service : 'services',
  bookings: 'bookings'
};

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(Api.base + Api.users);
  }

  registerUser(userData: User): Observable<User> {
    return this.http.post<User>(Api.base + Api.register, userData, httpOptions);
  }

  loginUser(userData: User): Observable<User> {
    return this.http.post<User>(Api.base + Api.login, userData, httpOptions);
  }

  resetPassword(userData: User) {
    return this.http.post<User>(Api.base + Api.reset, userData, httpOptions);
  }

  getUserById(id: Number): Observable<User> {
    return this.http.get<User>(Api.base + Api.users + `?id=${id}`);
  }

  deleteUser(id: Number): Observable<User> {
    return this.http.delete<any>(Api.base + Api.users + `/${id}`)
  }

  getUserByEmail(email: String): Observable<User[]> {
    return this.http.get<User[]>(Api.base + Api.userByEmail + email, httpOptions);
  }

  updateImage(id: Number, userData: User): Observable<User> {
    return this.http.put<User>(Api.base + Api.course + `/${id}`, userData, httpOptions);
  }

  updateUser(userData: User): Observable<User> {
    return this.http.put<User>(
      Api.base + Api.userById  +"/"+   userData.id,
      userData,
      httpOptions
    );
  }

  updatePassword(userData: User): Observable<User> {
    return this.http.put<User>(
      Api.base +  Api.changepass +"/"+userData.id,
      userData,
      httpOptions
    );
  }


  //services
  createService(serviceData: Service): Observable<Service> {
    return this.http.post<Service>(Api.base + Api.service, serviceData, httpOptions);
  }

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(Api.base + Api.service);
  }

  getAllServicesId(id:number): Observable<Service[]> {
    return this.http.get<Service[]>(Api.base + Api.service+  `/?company_id=${id}`);
  }

  updateService(serviceData: Service): Observable<Service> {
    return this.http.put<Service>(
      Api.base + Api.service  +"/"+   serviceData.id,
      serviceData,
      httpOptions
    );
  }

  deleteService(id: Number): Observable<Service> {
    return this.http.delete<any>(Api.base + Api.service + `/${id}`)
  }

  //bookings
  createBooking(bookingData: Booking): Observable<Booking> {
    return this.http.post<Booking>(Api.base + Api.bookings, bookingData, httpOptions);
  }

  deleteBooking(id: Number): Observable<Booking> {
    return this.http.delete<any>(Api.base + Api.bookings + `/${id}`)
  }

  deleteBookings(id: String): Observable<Booking> {
    return this.http.delete<any>(Api.base + Api.bookings + `/${id}`)
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(Api.base + Api.bookings);
  }

  getBookingsbyServiceId(service_id: Booking){
    return this.http.get<any>(Api.base + Api.bookings +  `/?service_id=${service_id}`)
  }

  getBookingsbyCompanyId(service_id: Booking){
    return this.http.get<any>(Api.base + Api.bookings +  `/?company_id=${service_id}`)
  }

}
