export interface Transaction {
    transactionId: string,
    accountId: string,
    transactionType: string,
    targetAccount: string | null,
    balance: number
}