import { LoggingServiceService } from './../service/loggingService.service';
import { UserServiceService } from './../service/user-service.service';
import { User } from './../class/class';
import { Observable } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,ReactiveFormsModule, FormBuilder} from '@angular/forms';
import * as sha256 from "sha256"
import { MatSnackBarHorizontalPosition, MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  mUser:string = ""
  mPass:string = ""

  userFormControl = new FormControl('', [
    Validators.required
  ]);
  passFormControl = new FormControl('', [
    Validators.required
  ]);

  registerForm = this.fb.group({
    regUsername : ['', Validators.required],
    regPassword : ['', Validators.required],
    regFirstName : [''],
    regLastName : [''],
    regEmail : ['', Validators.required]
  });
  onRegSubmit() {
    this.registerForm.value['regPassword'] = sha256(this.registerForm.value['regPassword'])
    let body = JSON.stringify(this.registerForm.value);            
    var task = this.userS.reqUser(body).subscribe(
      t => {
        return t
      });
  }

  constructor(
    public snackBar: MatSnackBar,
    private router:Router,
    private fb: FormBuilder,
    private userS:UserServiceService,
    private modalService: NgbModal,
    private loggS:LoggingServiceService) { }

  ngOnInit() { 
  }
  mPass256
  onClickSubmit(){
    this.mPass256= sha256(this.mPass)
  }

  message: string = 'Register Complete.';
  actionButtonLabel: string = 'close';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
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

  onSingin(){
    let pass = sha256(this.passFormControl.value)
    this.userS.auth(this.userFormControl.value,pass).subscribe(data=>{
      
      if(data['auth'] == 'success'){
        this.loggS.loggedIn()
        this.loggS.setFName(data['fname'])
        this.loggS.setId(data['id'])
        this.loggS.setLName(data['lname'])
        this.loggS.setType(data['type'])
        this.router.navigate(['main'])    
      }
      
    })
    
  }


}
