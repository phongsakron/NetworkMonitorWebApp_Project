import { Observable } from 'rxjs';
import { allDeviceDetail } from './../class/class';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private API_URL
  url :any
  constructor(private _http: HttpClient) {
    this.API_URL= environment.API_URL;
   }

  getDevice(): Observable<any>{
    this.url = this.API_URL+"/dashboard"
    return this._http.get(this.url);  
  }
  getTimestampLog(amount:any): Observable<any>{
    this.url = this.API_URL+"/getTimestampLog/"
    this.url += amount
    return this._http.get(this.url);  
  }

  getUpDownAmount(status:any): Observable<any>{
    this.url = this.API_URL+"/getupdownamout/"
    this.url += status
    return this._http.get(this.url);  
  }
  getHorizonChart(){
    return this._http.get(this.API_URL+"/getHorizonChart");  
  }
}
