import { Observable, Subscription } from 'rxjs';
import { DashboardService } from './../../../service/dashboard.service';
import { DataService } from './../../../service/data.service';
import { SettingService } from './../../../service/setting.service';
import { DeviceServiceService } from './../../../service/device-service.service';
import { ColorService } from './../../../service/color.service';
import { Chart } from 'chart.js';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-horizon-chart-device-location',
  templateUrl: './horizon-chart-device-location.component.html',
  styleUrls: ['./horizon-chart-device-location.component.css']
})
export class HorizonChartDeviceLocationComponent implements OnInit ,OnDestroy{
  
  constructor(private color: ColorService
    , private devices: DeviceServiceService,
    private setS: SettingService,
    private dataS: DataService,
    private dash: DashboardService,
    private modalService: NgbModal) { }

  private sub : Subscription = new Subscription();
  mylist
  interval
  device
  state = "build"
  destory = false
  ngOnInit() {
    this.horizonChart();
    this.tryUpdate()
    this.interval = setInterval(() => {
 if (this.destory == false) {
  
  this.tryUpdate() 
 }
    }, this.setS.getInterval());
  }
  ngOnDestroy(){
    this.destory = true
    this.sub.unsubscribe();
  }
  myChart
  data = {
    labels: [],
    datasets: [
      {
        label: "Up",
        backgroundColor: this.color.green,
        data: [0, 0, 0, 0]
      }, {
        label: "Down",
        backgroundColor: this.color.red,
        data: [0, 0, 0, 0]
      }
    ]
  }

  horizonChart() {
    this.myChart = new Chart('horizonChart', {
      type: 'horizontalBar',
      data: this.data,
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'All Device'
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }

    });

  }

  tryUpdate() {

    if (this.state == 'build') {

      this.toBuild()
    }
    if (this.state == 'node') {
      this.toNode()
    }
    if (this.state == 'location') {
      this.toLocation()
    }
  }

  dataTable = []
  header = []
  debug() {
    console.log("header", this.header);
    console.log("dataTable", this.dataTable);

  }

  show(inp) {
    console.log("data", inp);

  }

  toBuild(){
    this.sub.add(
      this.dash.getHorizonChart().subscribe(data => {
        // console.log(data);
        let loca = []
        let d1 = []
        let d2 = []
        this.dataTable = []
        data['build'].forEach(element => {
          // console.log("ele", element);
          loca.push(element['location'])
          d1.push(element['up'])
          d2.push(element['down'])
          let json = {
            "location": element['location'],
            "up": element['upList'],
            "down": element['downList']
          }
          if (element['upList'][0]) {
            this.header = []
            for (const key in element['upList'][0]) {
              if(key != "active"){
                this.header.push(key)
              }
            }
          } else if (element['downList'][0]) {
            this.header = []
            for (const key in element['downList'][0]) {
              if(key != "active"){
                this.header.push(key)
              }
              
            }
          }
          this.dataTable.push(json)
  
        });
  
        this.data.labels = loca
        this.data.datasets[0].data = d1
        this.data.datasets[1].data = d2
        this.myChart.update();
        this.state = 'build'
      })
    );
  }

  toNode() {
    this.sub.add(
      this.dash.getHorizonChart().subscribe(data => {
        let loca = []
        let d1 = []
        let d2 = []
        this.dataTable = []
        data['node'].forEach(element => {
          // console.log(element);
  
          loca.push(element['location'])
          d1.push(element['up'])
          d2.push(element['down'])
          let json = {
            "location": element['location'],
            "up": element['upList'],
            "down": element['downList']
          }
          if (element['upList'][0]) {
            this.header = []
            for (const key in element['upList'][0]) {
              if(key != "active"){
                this.header.push(key)
              }
            }
          } else if (element['downList'][0]) {
            this.header = []
            for (const key in element['downList'][0]) {
              if(key != "active"){
                this.header.push(key)
              }
              
            }
          }
          this.dataTable.push(json)
  
        });
  
        this.data.labels = loca
        this.data.datasets[0].data = d1
        this.data.datasets[1].data = d2
        this.myChart.update();
        this.state = 'node'
      })
    );
  }

  toLocation() {
    this.sub.add(
      this.dash.getHorizonChart().subscribe(data => {
        let loca = []
        let d1 = []
        let d2 = []
        this.dataTable = []
        data['location'].forEach(element => {
          // console.log(element);
  
          loca.push(element['location'])
          d1.push(element['up'])
          d2.push(element['down'])
          let json = {
            "location": element['location'],
            "up": element['upList'],
            "down": element['downList']
          }
          if (element['upList'][0]) {
            this.header = []
            for (const key in element['upList'][0]) {
              if(key != "active"){
                this.header.push(key)
              }
            }
          } else if (element['downList'][0]) {
            this.header = []
            for (const key in element['downList'][0]) {
              if(key != "active"){
                this.header.push(key)
              }
              
            }
          }
          this.dataTable.push(json)
  
        });
  
        this.data.labels = loca
        this.data.datasets[0].data = d1
        this.data.datasets[1].data = d2
        this.myChart.update();
        this.state = 'location'
      })
    );
    
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'my-class' });
  }

}
