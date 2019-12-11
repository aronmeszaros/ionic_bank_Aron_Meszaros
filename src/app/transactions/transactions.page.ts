import { Component, OnInit, Input } from '@angular/core';
import {Transaction} from '../Entities/transaction';
import {TransactionService} from '../Services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { MessageService } from '../Services/message.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss']
})
export class TransactionsPage implements OnInit {
  transactions: Transaction[];
  messages: string[] = [];
  constructor(public toastController: ToastController, private messageService: MessageService, private transactionService: TransactionService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getTransactions();
  }

  ionViewDidEnter() {
    this.loadMessages();
  }

  getTransactions(): void {
    //const userId = +this.route.snapshot.paramMap.get('id');
    const userId = 1;
    this.transactionService.getTransactions(userId)
      .subscribe(transactions => this.transactions = transactions);
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

}