import { Subject } from 'rxjs';
import { UserServiceService } from './../../../service/user-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import * as sha256 from "sha256"
@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {

  constructor(private userSer : UserServiceService,private modalService: NgbModal,private fb: FormBuilder) { }

  myUser
  dtTrigger : Subject<any> = new Subject();
  editForm = this.fb.group({
    regUsername : ['', Validators.required],
    regPassword : ['', Validators.required],
    regFirstName : [''],
    regLastName : [''],
    regEmail : ['', Validators.required],
    regType : ['', Validators.required]
  });
  userId
  dtOptions: DataTables.Settings = {
    "columns": [
      null,
      null,
      null,
      { "orderable": false }
    ]
  };

  ngOnInit() {
    this.userSer.getAllUser().subscribe(data =>{
      this.myUser = data  
      this.dtTrigger.next()  
    })
  }

  OnDestroy(){
    this.dtTrigger.unsubscribe()
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  } 

  


  // delete
  deleteId = 0
  deleteUsername = null
  setDelete(li){
      this.deleteId = li.id
      this.deleteUsername = li.username
  }
  deleteUser(){
    this.userSer.deleteUser(this.deleteId).subscribe(data=>{
      
    })
    this.deleteId = 0
    this.deleteUsername = null
  }

  // edit
  setForm(li){
    
    this.editForm = this.fb.group({
      regUsername : [li.username, Validators.required],
      regPassword : [li.password, Validators.required],
      regFirstName : [li.firstname],
      regLastName : [li.lastname],
      regEmail : [li.email, Validators.required],
      regType : ['', Validators.required]
    });

    this.userId = li.id
  }
  
  editUser(){
    if (this.editForm.value['regType'] == 'admin'){
      this.editForm.value['regType'] = 1
    }else{
      this.editForm.value['regType'] = 0
    }
    let jsonD = {
        'Id' : this.userId,
        'Username' : this.editForm.value['regUsername'],
        'Password' : sha256(this.editForm.value['regPassword']),
        'FirstName' : this.editForm.value['regFirstName'],
        'LastName' : this.editForm.value['regLastName'],
        'Email' : this.editForm.value['regEmail'],
        'type' : this.editForm.value['regType'],
    }
    this.userSer.editUser(jsonD).subscribe(data=>{
      
    })
  }


  show(){
    console.log(this.editForm.value);
    
  }

}
