import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

constructor() { }

// milisecon
  interval = 5000
 
  public getInterval() {
    return this.interval
  }

  
  public setInterval(v) {
    this.interval = v;
  }
  
  
}
