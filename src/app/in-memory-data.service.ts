import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Transaction} from './Entities/transaction';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const transactions = [
      {id: 1, userId: 1, merchant: 'Slovnaft', iban: '11100000034567898', payment: 'sent', amount: 89, category: 'Car', type: 'Debit card', date: new Date("2019-10-25"), note: 'Place of payment: Bratislava'},
      {id: 2, userId: 1, merchant: 'McDonalds', iban: '11100000034567898', payment: 'sent', amount: 6.99, category: 'Leisure', type: 'Debit card', date: new Date("2019-10-26"), note: 'Place of payment: Bratislava'},
      {id: 3, userId: 1, merchant: 'Cinemacity', iban: '11100000034567898', payment: 'sent', amount: 38, category: 'Leisure', type: 'Debit card', date: new Date("2019-10-26"), note: 'Place of payment: Bratislava'},
      {id: 4, userId: 1, merchant: 'Paypal', iban: '11100000034567898', payment: 'sent', amount: 8.99, category: 'Leisure', type: 'Debit card', date: new Date("2019-10-30"), note: 'Spotify monthly payment'},
      {id: 5, userId: 1, merchant: 'Bolt', iban: '11100000034567898', payment: 'sent', amount: 4.99, category: 'Transport', type: 'Debit card', date: new Date("2019-10-30"), note: 'Bratsilava'},
      {id: 6, userId: 1, merchant: 'Uctaren', iban: '11100000034567898', payment: 'recieved', amount: 650, category: 'other', type: 'e-banking', date: new Date("2019-10-31"), note: 'Mzda pre zamestnanca'},
      {id: 7, userId: 2, merchant: 'Uctaren', iban: '11100000034567898', payment: 'recieved', amount: 850, category: 'other', type: 'e-banking', date: new Date("2019-10-31"), note: 'Mzda pre zamestnanca'},
      {id: 8, userId: 2, merchant: 'LeKart', iban: '11100000034567898', payment: 'sent', amount: 28, category: 'Leisure', type: 'Debit card', date: new Date("2019-10-20"), note: 'Spotify monthly payment'},
      {id: 9, userId: 2, merchant: 'Austrian Airlines', iban: '11100000034567898', payment: 'sent', amount: 250, category: 'Travel', type: 'Debit card', date: new Date("2019-10-20"), note: 'Vienna -> Lisbon'},
      {id: 10, userId: 2, merchant: 'TAP', iban: '11100000034567898', payment: 'sent', amount: 220, category: 'Travel', type: 'Debit card', date: new Date("2019-10-20"), note: 'Lisbon -> Vienna'},
      {id: 11, userId: 2, merchant: 'Yeme', iban: '11100000034567898', payment: 'sent', amount: 150, category: 'Shopping', type: 'Debit card', date: new Date("2019-10-20"), note: 'Yeme potraviny Ružinov'},
      {id: 12, userId: 3, merchant: 'Russian Assets', iban: '11100000034567898', payment: 'sent', amount: 48000, category: 'other', type: 'e-banking', date: new Date("2019-10-20"), note: ''}
    ];
    const users = [
      {id: 1, username: 'ameszaros', first_name: 'Aron', last_name: 'Meszaros', address: 'Keltska', phone: '+421 904 067 380', city: 'Bratislava', country: 'Slovakia', psc: '85110', balance: 1228},
      {id: 2, username: 'johnd', first_name: 'John', last_name: 'Doe', address: 'Ivy street', phone: '+421 903 456 911', city: 'New Castle', country: 'GB', psc: '208 10', balance: 345},
      {id: 3, username: 'jmrkv', first_name: 'Ján', last_name: 'Mrkvička', address: 'Bezručová', phone: '0904567987', city: 'Bratislava', country: 'Slovakia', psc: '811 09', balance: 12000}
    ];
    return {transactions, users};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(transactions: Transaction[]): number {
    return transactions.length > 0 ? Math.max(...transactions.map(transaction => transaction.id)) + 1 : 12;
  }
}