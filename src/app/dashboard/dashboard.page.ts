import { Component, OnInit } from '@angular/core';
import {User} from '../Entities/user';
import {UserService} from '../Services/user.service';
import { ToastController, Platform } from '@ionic/angular';
import { MessageService } from '../Services/message.service';
import { TransactionService } from '../Services/transaction.service';
import { Transaction } from '../Entities/transaction';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { TransactionInterface, StorageServiceService } from '../Services/storage-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private chart: am4charts.PieChart;
  transactions: Transaction[];
  transactionsStorage: TransactionInterface[] = [];
  user: User;
  messages: string[] = [];

  constructor(
    private transactionService: TransactionService,
    private storageService: StorageServiceService, 
    public toastController: ToastController, 
    private messageService: MessageService, 
    private userService: UserService,
    private plt: Platform) { 
      this.plt.ready().then(() => {this.loadTransactionsStorage();})
    }

  ngOnInit() {
    this.getUser();
    this.getTransactions();
    
  }
  ionViewDidEnter() {
    this.loadMessages();
    this.loadTransactionsStorage();
  }

  getUser(): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    const id = 1;
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }
  getTransactions(): void {
    //const userId = +this.route.snapshot.paramMap.get('id');
    const userId = 1;
    const req = this.transactionService.getTransactions(userId);
    req.subscribe(transactions => this.transactions = transactions);
  }
  //Load from Ionic Storage
  loadTransactionsStorage(){
    this.storageService.getAllTransactions().then(transactionsStorage => {
      this.transactionsStorage = transactionsStorage;
      this.loadChart();
    });
  }
  async loadMessages() {
    //Display messages with toast
    this.messages = this.messageService.getInfo();
    if(this.messages.length>0){
      const toast = await this.toastController.create({
        message: this.messages[0],
        duration: 3000
      });
      toast.present();
    }
    this.messageService.clearInfo();
  }
  // async function always returns a Promise
  async loadChart(): Promise<void> {

    await this.delay(500, i);
    let chart = am4core.create("pie-chart", am4charts.PieChart);
    let title = chart.titles.create();
    title.text = "Spending Report";
    let stat = this.findCategoryOccurance(this.transactionsStorage);
    let data = [];
    for(var i = 0; i < stat[1].length; i++ ){
      data.push({id: i, category: stat[0][i], count: stat[1][i]});
    }
    chart.data = data;
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "count";
    pieSeries.dataFields.category = "category";
    chart.legend = new am4charts.Legend();
  }
  findCategoryOccurance(arr) {
    var a = [], b = [], prev;

    arr.sort((a,b) => a.category > b.category ? 1 : -1);
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i].category !== prev ) {
            a.push(arr[i].category);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i].category;
    }
    return [a, b];
  }
  delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
  }

}