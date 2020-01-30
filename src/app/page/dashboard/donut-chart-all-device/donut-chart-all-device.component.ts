import { SettingService } from './../../../service/setting.service';
import { ColorService } from './../../../service/color.service';
import { Chart } from 'chart.js';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { allDeviceDetail } from './../../../class/class';
import { DashboardService } from './../../../service/dashboard.service';
// require('chartjs-plugin-labels')
import 'chartjs-plugin-labels'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donut-chart-all-device',
  templateUrl: './donut-chart-all-device.component.html',
  styleUrls: ['./donut-chart-all-device.component.css']
})
export class DonutChartAllDeviceComponent implements OnInit, OnDestroy {
  private sub: Subscription = new Subscription();
  myList: allDeviceDetail[]
  upList = []
  downList = []
  dUp = 0
  dDown = 0
  dUnmonitor = 0
  ms
  valueC: any;
  constructor(private myService: DashboardService,
    private color: ColorService,
    private setS: SettingService,
    private modalService: NgbModal) {

  }
  interval
  index


  ngOnInit() {
    this.myPieChart = new Chart('pieChart', {
      type: 'pie',
      data: this.data,
      options: {
        title: {
          display: true,
          text: 'Amout All Device'
        },
        plugins: { //setup chartjs-plugin-labels plug in 
          labels: [

            {
              render: 'value',
              fontStyle: 'bold',
            }
          ],
        }
      }
    });
    this.update()
    this.interval = setInterval(() => {
      this.update()
    }, this.setS.getInterval());
  }


  ngOnDestroy(): void {
    this.destory = true
    this.sub.unsubscribe()
  }

  data = {
    labels: ["Up", "Down", "Not monitor"],
    datasets: [{
      label: "Amout",
      backgroundColor: [this.color.green, this.color.red, "#d2d6de"],
      data: [0, 0, 0]
    }]
  };
  myPieChart

  destory = false;
  update() {
    if (this.destory == false) {

      this.sub.add(
        this.myService.getDevice().subscribe(data => {
          console.log('donut');


          this.myList = data;
          this.count();
          this.setChart(this.dUp, this.dDown, this.dUnmonitor);
          this.myPieChart.data = this.data;
          this.myPieChart.update();
        })
      );
    }
  }
  setChart(up, down, notM) {
    this.data.datasets[0].data[0] = up
    this.data.datasets[0].data[1] = down
    this.data.datasets[0].data[2] = notM

  }


  count() {
    this.dUp = 0
    this.dDown = 0
    this.dUnmonitor = 0
    this.upList = []
    this.downList = []
    for (let my of this.myList) {
      //chack status
      if (my.active == 1 && my.icmpstatus == "1") {
        this.dUp++
        this.upList.push(my)

      }
      else if (my.active == 1 && my.icmpstatus == "0") {
        this.dDown++
        this.downList.push(my)
      }
      //check unMonitor
      if (my.active == 0) {
        this.dUnmonitor++
      }
    }
  }

  show() {
    console.log(this.upList, this.downList);

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'my-class' });
  }

  header = []
  headerSet() {
    this.header = []
    if (this.upList) {
      for (const key in this.upList[0]) {
        this.header.push(key)
      }
    } else if (this.downList) {
      for (const key in this.downList[0]) {
        this.header.push(key)
      }
    }

  }


}
