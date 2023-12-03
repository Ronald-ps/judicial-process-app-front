import { defaultClient } from "@services/api";

interface Benefit {
  id: number;
  title: string;
  description: string;
  contribution_id: number;
}
export interface Contribution {
  id: number;
  title: string;
  description: string;
  user_id: number;
  benefits: Benefit[];
  date: string;
}
export const getContributions = async (
  userId: number
): Promise<Contribution[]> => {
  const contributions: Contribution[] = await defaultClient.get(`contributions`, {params: {user_id: userId}}).then(r => r.data);
  return contributions;
};
