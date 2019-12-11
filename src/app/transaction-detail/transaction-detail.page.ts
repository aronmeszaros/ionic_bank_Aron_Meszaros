import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Transaction} from '../Entities/transaction';
import {TransactionService} from '../Services/transaction.service';
import { Platform } from '@ionic/angular';
import { StorageServiceService, TransactionInterface } from '../Services/storage-service.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss']
})
export class TransactionDetailPage implements OnInit {
  transaction: Transaction;
  transactionStorage: TransactionInterface;

  constructor(private storageService: StorageServiceService, private plt: Platform, private transactionService: TransactionService, private route: ActivatedRoute, private location: Location) {
    this.plt.ready().then(() => {this.loadTransactionStorage();})
  }

  ngOnInit() {
    this.getTransaction();
  }
  ionViewDidEnter(){
    this.loadTransactionStorage();
  }


  getTransaction(): void {
    const transactionId = +this.route.snapshot.paramMap.get('id');
    this.transactionService.getTransaction(transactionId)
      .subscribe(transaction => 
        {this.transaction = transaction
          //debugger;
        });

  }
  loadTransactionStorage(): void{
    const transactionId = +this.route.snapshot.paramMap.get('id');
    this.storageService.getTransaction(transactionId).then((transactionStorage)=>{
      this.transactionStorage = transactionStorage;
      console.log("Detail: "+this.transactionStorage);
    });
  }
  goBack(): void {
    this.location.back();
  }


}