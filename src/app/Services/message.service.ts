import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  infoMessages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  addInfo(message: string) {
    this.infoMessages.push(message);
  }

  get(): string[]{
    return this.messages;
  }

  getInfo(): string[]{
    return this.infoMessages;
  }

  clear() {
    this.messages = [];
  }
  clearInfo() {
    this.infoMessages = [];
  }
}