import { Observable, Subscription } from 'rxjs';
import { allDeviceDetail } from './../../../class/class';
import { DashboardService } from './../../../service/dashboard.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-live-down-device',
  templateUrl: './live-down-device.component.html',
  styleUrls: ['./live-down-device.component.css']
})
export class LiveDownDeviceComponent implements OnInit ,OnDestroy{
  
  constructor(private myService : DashboardService,
    private r : Router,
    private route: ActivatedRoute) { }
  myList
  dtTrigger: Subject<any> = new Subject();
  private sub : Subscription = new Subscription();
  ngOnInit() {
    this.sub.add(
      this.myService.getDevice().subscribe(data => {
        console.log("livedown");
        
        this.myList = data;
        this.dtTrigger.next();
      })
    ) 
      this.show()
  }
  ngOnDestroy(){
    this.sub.unsubscribe()
      this.dtTrigger.unsubscribe();
  }


  show(){
  }
  
  detail(id){
	this.r.navigate(['devicedetail',{ip:id}],{relativeTo:this.route})
  }

  
 
  
}
