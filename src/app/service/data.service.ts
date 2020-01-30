import { activeDevice } from './../class/class';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  private API_URL
  constructor(private _http: HttpClient) {
    
    this.API_URL= environment.API_URL;
   }

  getDevice(){
    return this._http.get(this.API_URL+ "/api/getSelect");  
  }

  options = {headers: {'Content-Type': 'application/json'}}
  getLocationDistrict(){
    return this._http.get(this.API_URL+ "/getLocationDistrict")
  }

  getReport1(json){
    return this._http.post(this.API_URL+ "/report1",json,this.options)
  }
  getReport2(json){
    return this._http.post(this.API_URL+ "/report2",json,this.options)
  }
  getReport3(json){
    return this._http.post(this.API_URL+ "/report3",json)
  }
  getReport5(json){
    return this._http.post(this.API_URL+ "/report5",json)
  }

  getReport4(){
    return this._http.get(this.API_URL+ "/report4")
  }

  getCSV(){
    return this._http.get(this.API_URL+ "/getCSV")
  }



}
