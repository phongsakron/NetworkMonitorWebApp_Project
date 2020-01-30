import { async } from '@angular/core/testing';
import { PlatformModule } from '@angular/cdk/platform';
import { SettingService } from './../../../service/setting.service';
import { ColorService } from './../../../service/color.service';
import { Chart } from 'chart.js';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from './../../../service/dashboard.service';
import { allDeviceDetail } from './../../../class/class';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-line-chart-live',
  templateUrl: './line-chart-live.component.html',
  styleUrls: ['./line-chart-live.component.css']
})
export class LineChartLiveComponent implements OnInit,OnDestroy {
  myList: allDeviceDetail[]
  dUp = 0
  dDown = 0
  dUnmonitor = 0
  constructor(private myService: DashboardService,
    private color: ColorService,
    private datePipe: DatePipe,
    private setS: SettingService,
    private modalService: NgbModal) { }
  interval
  cnt = 0
  chartRange = 20
  private sub : Subscription = new Subscription();
  ngOnInit() {
    this.liveChart()
    this.setChart(this.myChart)
    this.interval = setInterval(() => {
      this.update()
      if (this.cnt > this.chartRange) {
        this.updateConfigByMutating(this.myChart)
      }
    }, 1000);
  }
  ngOnDestroy(){
    this.destroy = true;
    this.sub.unsubscribe()
  }
  data = {
    labels: [],
    datasets: [{
      data: [],
      label: "Up",
      borderColor: this.color.green,
      backgroundColor: this.color.greenlowOpacity,
      fill: true
    }, {
      data: [],
      label: "Down",
      borderColor: this.color.red,
      backgroundColor: this.color.redLowOpacity,
      fill: true
    }
    ]
  }
  destroy = false;
  update(){
    if (this.destroy == false) {
      console.log("send requset");
      
    this.sub.add(
      this.myService.getDevice().subscribe(data => {
        console.log("line");
        

        this.myList = data;
        let newDate = new Date(data[0]['timedate']);

        this.count();
        this.addData(this.myChart, this.datePipe.transform(newDate, "hh:mm:ss"), this.dDown, this.dUp)
        this.cnt = this.getLength(this.myChart)
      })
    ); 
    } 
  }

  myChart

  liveChart() {
    this.myChart = new Chart('liveChart', {
      type: 'line',
      data: this.data,
      options: {
        legend: { display: false },
        title: {
          display: true,
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Amount'
            },
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    });

  }
  a: any

  setRange(value) {
    this.chartRange = value
    this.setChart(this.myChart)
  }
  setChart(chart) {
    this.myService.getTimestampLog(this.chartRange).subscribe(data => {
      chart.data.labels = [];
      chart.data.datasets[0]['data'] = [];
      chart.data.datasets[1]['data'] = []
      data.reverse().forEach(element => {
        let newDate = new Date(element['timestamp']);
        this.addData(this.myChart, this.datePipe.transform(newDate, "hh:mm:ss"), element['down'], element['up'])
      });
      this.myChart.update();
    })
  }
  getLength(chart) {
    return chart.data.datasets[0]['data'].length
  }
  async addData(chart, label, up, down) {
    // let index =chart.data.labels.length
    // index -= 1
    // if(chart.data.labels[index] != label){
    await chart.data.labels.push(label);
    var i = 0
    await chart.data.datasets.forEach((dataset) => {
      if (i == 0) {
        dataset.data.push(down);
      }
      if (i == 1) {
        dataset.data.push(up);
      }
      i++;
    });

    chart.update();
    // }

  }

  async updateConfigByMutating(chart) {
    // console.log("log",chart.data.labels.length);
    // console.log("log",chart.data.datasets[0]['data'].length);
    // console.log("log",chart.data.datasets[1]['data'].length);
    
    while (chart.data.labels.length > 20 || chart.data.datasets[0]['data'] > 20 || chart.data.datasets[1]['data'] > 20) {
      await chart.data.labels.shift()
      await chart.data.datasets[0]['data'].shift()
      await chart.data.datasets[1]['data'].shift()
    }
    chart.update();
  }

  count() {
    this.dUp = 0
    this.dDown = 0
    this.dUnmonitor = 0
    for (let my of this.myList) {
      //chack status
      if (my.active == 1 && my.icmpstatus == "1") {
        this.dUp++
      }
      else if (my.active == 1 && my.icmpstatus == "0") {
        this.dDown++
      }
      //check unMonitor
      if (my.active == 0) {
        this.dUnmonitor++
      }
    }
  }
}

