import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const AUTH_API = 'http://localhost:8080/icecream'

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public getAllFlavours() {
    return this.http.get(AUTH_API, httpOptions);
  }

  public addFlavour(flavourObj: any) {
    return this.http.post(AUTH_API, flavourObj, httpOptions);
  }

  public updateAppointment(appointmentObj: any, id:number) {
    return this.http.put(AUTH_API+'/'+id , appointmentObj, httpOptions);
  }

  public updateStatus(id:string, status:number) {
    return this.http.put(AUTH_API + "/update/status/"+id +'/'+status,  httpOptions);
  }

  public getFreeDoctors(startTime:any, endTime:any) {
    return this.http.get(AUTH_API+'/available/doctors?startTime='+startTime +'&endTime='+endTime, httpOptions);
  }

  public getDoctorsList() {
    return this.http.get(AUTH_API+'/doctors', httpOptions);
  }

}
