
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
  client_id: number;
  start_date: string;
  description: string;
  observations: Observation[];
  evolutions: Evolution[];
  type: string;
}
