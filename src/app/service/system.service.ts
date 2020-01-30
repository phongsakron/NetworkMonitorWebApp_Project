import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
@Injectable()
export class SystemService {

  private API_URL
  constructor(private _http: HttpClient) {
    
    this.API_URL= environment.API_URL;
   }

  getScriptState() {
    return this._http.get(this.API_URL+"/getScriptState");
  }
  toggleScript() {
    return this._http.get(this.API_URL+"/toggleScript");
  }

  getAlertState() {
    return this._http.get(this.API_URL+"/getAlertState");
  }
  toggleAlert() {
    return this._http.get(this.API_URL+"/toggleAlert");
  }
}


