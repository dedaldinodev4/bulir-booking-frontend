import { Transaction } from "@/schemas/transaction";

export function calculateGMV(transactions: Transaction[]): number {
  return transactions
    .filter(t => t.status === 'PAID')
    .reduce((sum, t) => sum + Number(t.amount), 0)
}


export function totalTransactions(transactions: Transaction[]): number {
  return transactions.length
}

export function paidTransactionsCount(transactions: Transaction[]): number {
  return transactions.filter(t => t.status === 'PAID').length
}

export function failedTransactionsCount(transactions: Transaction[]): number {
  return transactions.filter(t => t.status === 'FAILED').length
}

export function paymentConversionRate(transactions: Transaction[]): number {
  const total = transactions.length
  if (total === 0) return 0

  const paid = paidTransactionsCount(transactions)
  return (paid / total) * 100
}


export function transactionSuccessRate(
  transactions: Transaction[]
) {
  const paid = transactions.filter(t => t.status === 'PAID').length
  const failed = transactions.filter(
    t => t.status === 'FAILED' || t.status === 'REFUNDED'
  ).length

  const total = paid + failed

  if (total === 0) {
    return {
      paidRate: 0,
      failedRate: 0,
      dominant: 'NONE',
    }
  }

  const paidRate = (paid / total) * 100
  const failedRate = (failed / total) * 100

  return {
    paid,
    failed,
    paidRate,
    failedRate,
    dominant:
      paid > failed
        ? 'PAID'
        : failed > paid
          ? 'FAILED'
          : 'EQUAL',
  }
}


