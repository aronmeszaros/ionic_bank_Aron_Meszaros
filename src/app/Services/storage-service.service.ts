import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Transaction } from '../Entities/transaction';
import { number } from '@amcharts/amcharts4/core';

export interface TransactionInterface{
  id: number, 
  userId: number, 
  merchant: string, 
  iban: string, 
  payment: string, 
  amount: number, 
  category: string, 
  type: string, 
  date: number, 
  note: string
}
const TRANSACTIONS_KEY = "TransactionsStorage";
const SINGLE_TRANSACTION_KEY = "SinlgeTransactionStorage";

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  newID = 10;
  transaction: TransactionInterface[] = [
    {id: 1, userId: 1, merchant: 'Slovnaft', iban: '11100000034567898', payment: 'sent', amount: 89, category: 'Car', type: 'Debit card', date: Date.now(), note: 'Place of payment: Bratislava'},
      {id: 2, userId: 1, merchant: 'McDonalds', iban: '11100000034567898', payment: 'sent', amount: 6.99, category: 'Leisure', type: 'Debit card', date: Date.now(), note: 'Place of payment: Bratislava'},
      {id: 3, userId: 1, merchant: 'Cinemacity', iban: '11100000034567898', payment: 'sent', amount: 38, category: 'Leisure', type: 'Debit card', date: Date.now(), note: 'Place of payment: Bratislava'},
      {id: 4, userId: 1, merchant: 'Paypal', iban: '11100000034567898', payment: 'sent', amount: 8.99, category: 'Leisure', type: 'Debit card', date: Date.now(), note: 'Spotify monthly payment'},
      {id: 5, userId: 1, merchant: 'Bolt', iban: '11100000034567898', payment: 'sent', amount: 4.99, category: 'Transport', type: 'Debit card', date: Date.now(), note: 'Bratsilava'},
      {id: 6, userId: 1, merchant: 'Uctaren', iban: '11100000034567898', payment: 'recieved', amount: 650, category: 'other', type: 'e-banking', date: Date.now(), note: 'Mzda pre zamestnanca'}
  ];

  constructor(private storage: Storage) {
    this.storage.set(TRANSACTIONS_KEY, this.transaction).then((successData)=>{
      console.log("Data Stored");
      console.log(successData);
    });
  }
  
  //ADD
  addTransaction(transaction: TransactionInterface): Promise<any>{
    return this.getAllTransactions().then((member)=>{
      this.newID = member.length;
      transaction.id = this.newID +1;
      return this.storage.get(TRANSACTIONS_KEY).then((transactions: TransactionInterface[])=>{
        if(transactions){
          transactions.push(transaction);
          return this.storage.set(TRANSACTIONS_KEY, transactions);
        }else{
          return this.storage.set(TRANSACTIONS_KEY, [transaction]);
        }
      });
    });
  }
  //GET ALL
  getAllTransactions(): Promise<TransactionInterface[]>{
    return this.storage.get(TRANSACTIONS_KEY);
  }
  //GET
  getTransaction(id: number): Promise<TransactionInterface>{
    return this.storage.get(TRANSACTIONS_KEY).then((transactions: TransactionInterface[]) =>{
      if(!transactions || transactions.length === 0){
        return null;
      }
      for (let index of transactions) {
        if(index.id === id){
          return this.storage.set(SINGLE_TRANSACTION_KEY, index);
        }
      }
    });
  }
  //Count
  countTransactions(){
    let transactionsCount: number;
    transactionsCount =  this.transaction.length;
    return transactionsCount;
  }

}
