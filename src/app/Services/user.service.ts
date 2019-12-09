import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {User} from '../Entities/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET heroes from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
  
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user,this.httpOptions);
  }
}