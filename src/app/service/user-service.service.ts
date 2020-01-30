import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  private API_URL
  constructor(private _http: HttpClient) {
    
    this.API_URL= environment.API_URL;
   }

  options = {headers: {'Content-Type': 'application/json'}}
  reqUser(jsonData){
    return this._http.post(this.API_URL+"/userAdd",jsonData,this.options)
  }

  getAllUser(){
    return this._http.get(this.API_URL+"/getUser")
  }

  editUser(jsonData){
    return this._http.post(this.API_URL+"/userEdit",jsonData,this.options)
  }

  deleteUser(id){
    return this._http.delete(this.API_URL+"/userRemove/"+id)
  }

  auth(user,pass){
    return this._http.post(this.API_URL+"/auth/"+user+"/"+pass,this.options)
  }
  
  getUserById(id){
    return this._http.get(this.API_URL+"/getUserById/"+id)
  }

  toogleAlert(json){
    return this._http.post(this.API_URL+"/toggleMailUser",json,this.options)
  }
}
