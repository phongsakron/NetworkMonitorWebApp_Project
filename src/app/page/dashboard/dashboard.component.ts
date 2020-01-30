import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/service/system.service';
import { LoggingServiceService } from 'src/app/service/loggingService.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private sys:SystemService,
    private loggS:LoggingServiceService,
    private r : Router,
    private route: ActivatedRoute) { }
  state
  state2
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

}
