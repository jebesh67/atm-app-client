export type Transaction = {
  _id: string;
  accountNumber: string;
  type: "withdrawal" | "deposit";
  amount: number;
  balanceAfter: number;
  date: string;
  status: "completed" | "pending" | "failed";
};