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

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(5%)'}),
            style({opacity: 1, transform: 'translateY(0%)'}),
          ]))]), {optional: true})
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
  merchants = [];

  constructor(private storageService: StorageServiceService, public toastController: ToastController, private messageService: MessageService, private transactionService: TransactionService, private route: ActivatedRoute, private location: Location, private plt: Platform) { 
    this.plt.ready().then(() => {})
  }

  ngOnInit() {
    this.showItems();
    
  }

  ngAfterViewInit(){
    console.log(this.transactionTotal);
    this.loadMerchants();
  }

  ionViewDidEnter() {
    this.loadMessages();
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
  loadMerchants(){
    this.storageService.getAllTransactions().then(transactionsStorage => {
      this.transactionsStorage = transactionsStorage;
      let i = 0;
      this.transactionsStorage.forEach(element => {
        this.merchants[i] = element.merchant
        i++
      });
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
    this.items = [0,1,2,3,4,5,6,7,8,9,10];
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