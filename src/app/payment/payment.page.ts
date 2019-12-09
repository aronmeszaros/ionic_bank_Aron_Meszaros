import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../Services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../Services/user.service';
import { Transaction } from '../Entities/transaction';
import { User } from '../Entities/user';
import { MessageService } from '../Services/message.service';
import { ToastController } from '@ionic/angular';
import {BarcodeScannerOptions,BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  transactions: Transaction[];
  messages: string[] = [];
  @Input() user: User;
  users: User[];
  benefitiary: User;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  elementType = 'url';
  objectData = {benefitiaryName: "Aron", accountNumber: "+421904067380"};
  qrData = JSON.stringify(this.objectData);
  showScan = this.platform.is('cordova');
  benefitiaryData: any;
  newTransaction = {merchant: '', phone: '', amount: 0, category: ''};


  constructor(
    public toastController: ToastController, 
    private messageService: MessageService, 
    private transactionService: TransactionService, 
    private route: ActivatedRoute, 
    private userService: UserService, 
    private location: Location, 
    private router: Router,
    private platform: Platform,
    private barcodeScanner: BarcodeScanner) {
      this.encodeData = "https://www.dermalife.sk";
    //Options
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
   }

  ngOnInit() {
    this.getUser();
    this.getUsers();
    this.getTransactions();
  }
  ionViewWillEnter(){
    this.loadMessages(3000);
  }

  getUser(): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    const id = 1;
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }
  getUsers(): void{
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  getTransactions(): void {
    //const userId = +this.route.snapshot.paramMap.get('id');
    const userId = 1;
    this.transactionService.getTransactions(userId)
      .subscribe(transactions => this.transactions = transactions);
  }

  transfer(form): void {
    let merchant = this.newTransaction.merchant;
    let phone = this.newTransaction.phone;
    let amount = this.newTransaction.amount;
    let category = this.newTransaction.category;
    //Check the amount if it has a value
    if (amount == null || amount<=0) {this.messageService.addInfo('Enter amount');this.loadMessages(3000);return;}
    //Compare amount with account balance
    if(this.user.balance < amount){this.messageService.addInfo('The entered amount exceeds your account balance');this.loadMessages(3000);
      return;
    }
    //Check validity of phone number and if sender is specififed in any manner
    if(phone.length>0){if(!this.phonenumber(phone)){return;}}else if(merchant.length>0){}else{this.messageService.addInfo("Specify sender"); this.loadMessages(3000);return;};
    //create transaction
    let newTransaction = new Transaction;
    newTransaction = {id: null, userId: this.user.id, merchant: merchant, iban: phone, payment: 'sent', amount: amount, category: category, type: 'e-banking', date: new Date("2019-10-20"), note: 'from portal'}
    this.transactionService.addTransaction(newTransaction).subscribe(transaction => {this.transactions.push(transaction)});
    this.getTransactions();
    //subtract the amount from this user
    this.user.balance = this.user.balance - amount;
    this.userService.updateUser(this.user).subscribe();
    //if benefitiary is a user add amount to his balance
    if(this.benefitiary = this.users.find(benefitiary => benefitiary.phone == phone)){
      let balance = + amount;
      this.benefitiary.balance = this.benefitiary.balance + balance;
      this.userService.updateUser(this.benefitiary).subscribe(benefitiary => this.benefitiary = benefitiary);
      console.log("The account balance of " + this.benefitiary.first_name + " is: " + this.benefitiary.balance + "€");
    }
    //return to Dashboard with a message
    this.messageService.addInfo("Transaction successful");
    this.router.navigateByUrl('/dashboard');
  }

  goBack(): void {
    this.location.back();
  }
  async loadMessages(duration: number) {
    //Display messages with toast
    this.messages = this.messageService.getInfo();
    if(this.messages.length>0){
      const toast = await this.toastController.create({
        message: this.messages[0],
        duration: duration
      });
      toast.present();
    }
    this.messageService.clearInfo();
  }

  phonenumber(inputtxt: string): boolean{
  let phoneno = /^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
    if((inputtxt.match(phoneno))){
      return true;
    }
    else{
      this.messageService.addInfo('Phone number is invalid needs to be +XXX XXX XXX XXX');
      this.loadMessages(10000);
      return false;
    }
  }
  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        this.benefitiaryData = JSON.parse(this.scannedData["text"]);
        this.newTransaction.merchant = this.benefitiaryData.benefitiaryName;
        this.newTransaction.phone = this.benefitiaryData.accountNumber;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
  logForm(form) {
    console.log(form.value)
  }

}
