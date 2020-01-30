import { UserServiceService } from './../../../service/user-service.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,ReactiveFormsModule, FormBuilder} from '@angular/forms';
import * as sha256 from "sha256"
import { MatSnackBarHorizontalPosition, MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,private router:Router,private fb: FormBuilder,private userS:UserServiceService,private modalService: NgbModal) { }

  
  registerForm = this.fb.group({
    regUsername : ['', Validators.required],
    regPassword : ['', Validators.required],
    regFirstName : [''],
    regLastName : [''],
    regEmail : ['', Validators.required],
    regType : ['', Validators.required]
  });
  onRegSubmit() {
    if (this.registerForm.value['regType'] == 'admin'){
      this.registerForm.value['regType'] = 1
    }else{
      this.registerForm.value['regType'] = 0
    }
    this.registerForm.value['regPassword'] = sha256(this.registerForm.value['regPassword'])
    let body = JSON.stringify(this.registerForm.value);            
    var task = this.userS.reqUser(body).subscribe(
      t => {
        return t
      });
  }

  ngOnInit() {
  }
  mPass256
  onClickSubmit(){
    this.mPass256= sha256(this.mPass256)
  }

  message: string = 'Submit.';
  actionButtonLabel: string = 'close';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass: boolean = false;
  openSnackBar() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }
  closeResult: string;
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
    });
  } 


}
