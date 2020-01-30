import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingServiceService {


  constructor() {
    this.state = false
    this.type = 'user'
    this.fName = 'user'
    this.lName = 'user'

   }
  
  private state : boolean;
  private type : string ;
  private fName : string ;
  private lName : string ;
  private id ;
  
  
  public setType(v : string) {
    this.type = v;
    
  }
  public getType() {
    return this.type;
  }
  public setFName(v : string) {
    this.fName = v;
    
  }
  public getFName() {
    return this.fName;
  }
  public setLName(v : string) {
    this.lName = v;
    
  }
  public getLName() {
    return this.lName;
  }
  public setId(v : string) {
    this.id = v;
    
  }
  public getId() {
    return this.id;
  }
  
  
  public loggedIn() {
    this.state = true
    
  }
  public getState() {
    
    return this.state
    
  }
  public loggedOut() {
    this.state = false
    
  }

}
