import { Honorary, type Client } from "@services/client/types";

export interface Observation {
  id: number;
  description: string;
  process_id: number;
  process_code: string;
  created_at: string;
}

export interface Evolution {
  id: number;
  description: string;
  process_id: number;
  process_code: string;
  created_at: string;
}

export interface DetailedProcess {
  id: number;
  code: string;
  client: Client;
  start_date: string;
  description: string;
  observations: Observation[];
  evolutions: Evolution[];
  honoraries: Honorary[];
  type: string;
}
