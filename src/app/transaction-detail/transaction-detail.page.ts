import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Transaction} from '../Entities/transaction';
import {TransactionService} from '../Services/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss']
})
export class TransactionDetailPage implements OnInit {
  transaction: Transaction;

  constructor(private transactionService: TransactionService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getTransaction();

  }

  getTransaction(): void {
    const transactionId = +this.route.snapshot.paramMap.get('id');
    this.transactionService.getTransaction(transactionId)
      .subscribe(transaction => 
        {this.transaction = transaction
          //debugger;
        });

  }
  goBack(): void {
    this.location.back();
  }


}