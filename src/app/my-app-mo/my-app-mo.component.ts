import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SystemService } from '../service/system.service';
import { LoggingServiceService } from '../service/loggingService.service';

@Component({
  selector: 'app-my-app-mo',
  templateUrl: './my-app-mo.component.html',
  styleUrls: ['./my-app-mo.component.css']
})
export class MyAppMoComponent implements OnInit {

 
  constructor(private sys:SystemService,
    private loggS:LoggingServiceService,
    private r : Router,
    private route: ActivatedRoute) {
      this.userType = loggS.getType()
      this.fname = loggS.getFName()
      this.lname = loggS.getLName()
  }

  
  userType:string
  fname:string
  lname:string
  ngOnInit() {
    
   
  }
  ngOnDestroy(): void {
    
  }


  logout(){
    this.loggS.loggedOut()
    this.r.navigate(['.'])
  }

  clickDash(){
    this.r.navigate(['dashboard'],{relativeTo:this.route})
  }

  clickDatabase(){
    this.r.navigate(['database'],{relativeTo:this.route})
  }
  clickReport1(){
    this.r.navigate(['report'],{relativeTo:this.route})
  }
  clickReport2(){
    this.r.navigate(['report02'],{relativeTo:this.route})
  }
  clickReport3(){
    this.r.navigate(['report03'],{relativeTo:this.route})
  }
  clickReport4(){
    this.r.navigate(['report04'],{relativeTo:this.route})
  }
  clickReport5(){
    this.r.navigate(['report05'],{relativeTo:this.route})
  }
  clickAlert(){
    this.r.navigate(['alert'],{relativeTo:this.route})
  }
  clickUserAndDevice(){
    this.r.navigate(['management'],{relativeTo:this.route})
  }
  clickSetting(){
    	this.r.navigate(['setting'],{relativeTo:this.route})
  }

}
