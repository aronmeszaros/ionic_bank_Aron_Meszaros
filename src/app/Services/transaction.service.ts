import {Injectable} from '@angular/core';
import {Transaction} from '../Entities/transaction';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionsUrl = 'api/transactions';  // URL to web api
  private log(message: string) {
    this.messageService.add(`TransactionService: ${message}`);
  }

  constructor(private http:HttpClient, private messageService: MessageService) { }

  getTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.transactionsUrl}/?userId=${userId}`).pipe(
      tap(_ => this.log('fetched transactions')),
      catchError(this.handleError<Transaction[]>('getTransactions', []))
    );
  }

  getTransaction(transactionId: number): Observable<Transaction> {
    const url = `${this.transactionsUrl}/${transactionId}`;
    return this.http.get<Transaction>(url);
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  /** POST: add a new hero to the server */
  addTransaction (transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionsUrl, transaction, this.httpOptions).pipe(
      tap((newTransaction: Transaction) => this.log(`added transaction w/ id=${newTransaction.id}`)),
      catchError(this.handleError<Transaction>('addTransaction'))
    );
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionsUrl);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}