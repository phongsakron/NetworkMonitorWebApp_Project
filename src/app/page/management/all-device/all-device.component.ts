import { Subject } from 'rxjs';
import { DeviceServiceService } from './../../../service/device-service.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-device',
  templateUrl: './all-device.component.html',
  styleUrls: ['./all-device.component.css']
})
export class AllDeviceComponent implements OnInit {

  constructor(
    private deviceSer: DeviceServiceService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }
  dtTrigger : Subject<any> = new Subject();
  myList
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
  ngOnInit() {
    this.deviceSer.getDevice().subscribe(data=>{
      console.log("all");
      
      this.myList = data
      
      this.dtTrigger.next();
    })

    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  dtOptions: DataTables.Settings = {
    "columns": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      { "orderable": false }
    ]
  };



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

  // delete
  idDelete
  ipDelete
  setDelete(li){
    this.idDelete = li.deviceid
    this.ipDelete = li.ip
   }
  conDelte(){
    this.deviceSer.deteteDevice(this.idDelete).subscribe(data=>{ 
      window.location.reload();
    })
  }

  // edit

  conEdit(){
    let body =  JSON.stringify(this.editDeviceForm.value)
    console.log(body);
    
    this.deviceSer.editDevice(body).subscribe(data=>{

    })
    
  }

 
  
}
