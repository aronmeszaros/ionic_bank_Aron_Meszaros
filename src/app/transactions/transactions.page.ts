import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  stagger,
  animateChild
} from '@angular/animations';
import {Transaction} from '../Entities/transaction';
import {TransactionService} from '../Services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastController, Platform } from '@ionic/angular';
import { MessageService } from '../Services/message.service';
import { StorageServiceService, TransactionInterface } from '../Services/storage-service.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  animations: [
      trigger('fade', [
        transition(':enter', [style({opacity: 0}), animate('.6s ease')])
      ]),
      trigger('stagger', [
        transition(':enter', [
          query(':enter', stagger('.3s', [animateChild()]), {optional: true})
        ])
      ])
    ]
})
export class TransactionsPage implements OnInit {
  transactions: Transaction[];
  transactionsStorage: TransactionInterface[] = [];
  messages: string[] = [];
  transactionTotal = 0;
  animate = true;
  items = [];
  isPageLoaded = false;

  constructor(private storageService: StorageServiceService, public toastController: ToastController, private messageService: MessageService, private transactionService: TransactionService, private route: ActivatedRoute, private location: Location, private plt: Platform) { 
    this.plt.ready().then(() => {this.loadTransactionsStorage();})
  }

  ngOnInit() {
    this.showItems();
  }

  ngAfterViewInit(){
    console.log(this.transactionTotal);
    this.countTransactions();
  }

  ionViewDidEnter() {
    this.loadMessages();
    this.isPageLoaded = true;
  }

  async waiting(){
    await this.delay(50000, 1000);
  }
  //Load from Ionic Storage
  loadTransactionsStorage(){
    this.storageService.getAllTransactions().then(transactionsStorage => {
      this.transactionsStorage = transactionsStorage;
    });
    this.transactionTotal = this.storageService.countTransactions();
  }
  countTransactions(){
    this.storageService.getAllTransactions().then(transactionsStorage => {
      this.transactionsStorage = transactionsStorage;
    });
    this.transactionTotal = this.storageService.countTransactions();
  }
  goBack(): void {
    //console.log(this.transactions);
    this.location.back();
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
  /*
  getAllTransactions(){
    this.transactionService.getAllTransactions().subscribe(transactions => this.transactions = transactions);
  }
  */

  loadTransactions(){
    this.loadTransactionsStorage();
  }
  showItems() {
    this.items = [0,1,2,3,4];
  }

  hideItems() {
    this.items = [];
  }

  toggle() {
    this.items.length ? this.hideItems() : this.showItems();
   }
   delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
  }

}