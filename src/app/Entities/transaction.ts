export class Transaction {
    id: number;
    userId: number;
    merchant: string;
    iban: string;
    payment: string;
    amount: number;
    category: string;
    type: string;
    date: Date;
    note: string;
}