import { SettingService } from './../../service/setting.service';
import { LoggingServiceService } from './../../service/loggingService.service';
import { SystemService } from './../../service/system.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  
  constructor(private sys:SystemService,
    private loggS:LoggingServiceService,
    private r : Router,
    private route: ActivatedRoute) {
      this.userType = loggS.getType()
      this.fname = loggS.getFName()
      this.lname = loggS.getLName()
      console.log("cons set");
      
  }

  state
  state2
  userType:string
  fname:string
  lname:string
  ngOnInit() {
    this.sys.getScriptState().subscribe(data=>{
      console.log(data);
      
      if(data['state'] == "STATE_PAUSED"){
        this.state = false
      }else
      {
        this.state = true
      }
      
    })
    this.sys.getAlertState().subscribe(data=>{
      console.log(data);
      
      if(data['state'] == "STATE_PAUSED"){
        this.state2 = false
      }else
      {
        this.state2 = true
      }
      
    })
   
  }
  ngOnDestroy(): void {
    
  }

  // toggle slide
  disabled = false;
  
  slideToggle() {
    this.sys.toggleScript().subscribe(data=>{
    })
    this.ngOnInit()
  }
  slideToggleAlert() {
    this.sys.toggleAlert().subscribe(data=>{
    })
    this.ngOnInit()
  }

 

}
