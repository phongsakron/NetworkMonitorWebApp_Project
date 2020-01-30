import { SystemService } from './service/system.service';

import { Chart } from 'chart.js';
import { DataService } from './service/data.service';
import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  ngOnInit(){}
}
