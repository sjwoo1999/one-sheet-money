export interface ExpenseRecord {
  amount: number;
  category: string;
  note?: string;
  ts: string; // ISO timestamp
}

const expensesStore: ExpenseRecord[] = [];

export function addExpense(record: ExpenseRecord) {
  expensesStore.push(record);
}

export function listExpenses(): ExpenseRecord[] {
  return expensesStore;
}
