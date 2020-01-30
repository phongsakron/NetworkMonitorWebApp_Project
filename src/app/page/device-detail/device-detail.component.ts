import { DeviceServiceService } from './../../service/device-service.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private devices:DeviceServiceService
  ) { }


  sub
  id
  myData
  myList
  portList
  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['ip'];
      });
      this.myData = {
        "ip":this.id,
        "location" : "ICT",
        "upTime" : "3 hr",
        "status" : "Up",
        "portAmout" : 5,
        "index" : [0,1,2,3,4],
        "type" :["ga","ga","fa","fa","fa"],
        "portStatus" : ["Up","Up","Down","Down","Down"]
      }
      this.devices.getDeviceOne(this.myData['ip']).subscribe(data =>{
        console.log("device");
        
        this.myData['location'] = data[0]['location'];
        this.myData['build'] = data[0]['build'];
        this.myData['node'] = data[0]['node'];
        this.myData['rack'] = data[0]['rack'];
        this.myData['contractNumber'] = data[0]['contractnumber'];
        this.myData['serialNumber'] = data[0]['serialnumber'];
        this.myData['devicetype'] = data[0]['type'];
        this.myData['active'] = data[0]['active'];
        this.myData['community'] = data[0]['community'];
        this.myData['brand'] = data[0]['brand'];

      })

      this.devices.getIcmpDeviceOne(this.myData['ip']).subscribe(data=>{
        
        this.myList = data;
        this.dtTrigger.next();
      })

      this.devices.getPortDeviceOne(this.myData['ip']).subscribe(data=>{
        this.portList = data
      })

      this.devices.getSnmpDeviceOne(this.myData['ip']).subscribe(data=>{
        
        this.myData['upTime'] = data[0]['upTime'];
        
      })
  }

  // modal
  editDeviceForm = this.fb.group({
    ip : ['', Validators.required],
    commu : ['', Validators.required],
    active	 : [false, Validators.required],
    hostname : [''],
    build : [''],
    location : [''],
    node : [''],
    rack : [''],
    brand : [''],
    contractNum : [''],
    type : [''],
    serialNumber : ['']
  });
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  } 

  setForm(li){
    let ac : Boolean;
    if (li.active == 1) {
      ac = true
    }else{
      ac = false
    }
    this.editDeviceForm = this.fb.group({
      ip : [li.ip, Validators.required],
      commu : [li.community, Validators.required],
      active	 : [ac, Validators.required],
      hostname : [''],
      build : [li.build],
      location : [li.location],
      node : [li.node],
      rack : [li.rack],
      brand : [li.brand],
      contractNum : [li.contractnumber],
      type : [li.type],
      serialNumber : [li.serialnumber],
      deviceId : [li.deviceid]
    });
  }

  conEdit(){
    let body =  JSON.stringify(this.editDeviceForm.value)
    console.log(body);
    
    this.devices.editDevice(body).subscribe(data=>{

    })
    
  }
  

}
