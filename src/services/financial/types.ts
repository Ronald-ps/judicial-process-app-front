export interface Honorary {
  date: Date | string;
  process: number;
  description: string;
  value: number;
  paid_value: number;
  created_at: Date | string;
  created_by: number; /* ids */
}
