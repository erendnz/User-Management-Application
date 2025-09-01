export interface Limit {
  id: string;
  limitPeriod: "daily" | "weekly" | "monthly";
  limitType: "bet" | "deposit";
  limitValue: number;
  limitValueType: "percent" | "amount";
  status: boolean;
  created: string;
}