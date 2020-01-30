import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
@Injectable()
export class DeviceServiceService {
  private API_URL
  constructor(private _http: HttpClient) {
    
    this.API_URL= environment.API_URL;
   }

    options = {headers: {'Content-Type': 'application/json'}}
    addDevice(jsonData){
      return this._http.post(this.API_URL+"/deviceAdd",jsonData,this.options)
    }
    addDeviceCSV(jsonData){
      return this._http.post(this.API_URL+"/deviceAddCSV",jsonData,this.options)
    }
    getDevice(){
        return this._http.get(this.API_URL+"/getDevice");  
      }



    // single device
    getDeviceOne(ip){
        return this._http.get(this.API_URL+"/getDeviceOne/"+ip);  
      }
    getSnmpDeviceOne(ip){
        return this._http.get(this.API_URL+"/getSnmpDeviceOne/"+ip);  
      }
    getPortDeviceOne(ip){
        return this._http.get(this.API_URL+"/getPortDeviceOne/"+ip);  
      }
    getIcmpDeviceOne(ip){
        return this._http.get(this.API_URL+"/getIcmpDeviceOne/"+ip);  
      }
    getIcmpDeviceOneLast(ip){
        return this._http.get(this.API_URL+"/getIcmpDeviceOne/"+ip);  
      }


    // delete
    deteteDevice(id){
      return this._http.delete(this.API_URL+"/deviceRemove/"+id); 
    }  

    // edit
    editDevice(jsonData){
      return this._http.post(this.API_URL+"/editDevice",jsonData,this.options)
    }
}
