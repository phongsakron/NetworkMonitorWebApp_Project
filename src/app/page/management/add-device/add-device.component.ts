import { DataService } from './../../../service/data.service';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceServiceService } from '../../../service/device-service.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private devices: DeviceServiceService,
    private modalService: NgbModal,
    private dt: DataService) { }


  addDeviceForm = this.fb.group({
    ip: ['', Validators.required],
    commu: ['', Validators.required],
    active: [false, Validators.required],
    hostname: [''],
    build: [''],
    location: [''],
    node: [''],
    rack: [''],
    brand: [''],
    contractNum: [''],
    type: [''],
    serialNumber: ['']
  });
  onRegSubmit() {
    let body = JSON.stringify(this.addDeviceForm.value);
    var task = this.devices.addDevice(body).subscribe(
      t => {
        return t
      });
  }

  ngOnInit() {
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
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' ,windowClass: 'my-class'});
  }


  // ! CSVtoJSON
  downloadCSV() {
    this.dt.getCSV().subscribe(data => {
      let de_data = atob(data['blob'].substring(2, data['blob'].length - 1))
      try {
        let isFileSaverSupported = !!new Blob;
      } catch (e) {
        console.log(e);
        return;
      }
      let blob = new Blob([de_data], { type: 'file/csv' });
      console.log(blob);
      saveAs(blob, `file.csv`);
    })
  }

  fileContent;
  public onChange(fileList: FileList): void {
    this.readFile(fileList).then((val) => {
      console.log(val);
      this.setContent()
    })
  }

  jsonContent;
  jsonHead;


  setContent() {
    this.jsonContent = this.csvJSON(this.fileContent);
  }
  readFile(fileList: FileList): Promise<any> {
    let file = fileList[0];
    // console.log(fileList)
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
    }
    fileReader.DONE
    fileReader.readAsText(file);
    
    return new Promise((resolve) => {
      setTimeout(() => {
          resolve('done');
        }
      , 1000);
    });
  }

  csvJSON(csv) {

    var lines = csv.split(/\r\n|\n/);
    //Split per line on tabs and commas
    var headers = lines[0].split(/\t|,/);
    var resultJson = [];

    for (var i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      resultJson.push(obj);

    }
    this.jsonHead = Object.keys(resultJson[0])
    return resultJson;
  }

  sucessList = []
  failList = []

  uploadCSV() {
    this.setContent()
    this.jsonContent.forEach(element => {
      let body = JSON.stringify(element);
      var task = this.devices.addDeviceCSV(body).subscribe(
        t => {
          console.log(t);
          if (t['task'] == 'success') {

            this.sucessList.push(element)
          } else {
            element['description'] = t['description']
            this.failList.push(element)
          }
          return t
        });


    });
  }


}
