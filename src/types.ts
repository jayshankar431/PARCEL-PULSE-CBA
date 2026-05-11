export type RiderRank = "Team Leader" | "Elite Rider" | "Pro Rider" | "Fast Mover" | "Needs Improvement";

export interface RiderStats {
  id: string;
  name: string;
  totalParcels: number;
  deliveredParcels: number;
  successRate: number;
  failedParcels: number;
  rank: RiderRank;
  earnings: number;
  pressure: number; // 0-100
  trend: number[]; // Last 7 days success rates
}

export interface TeamStats {
  totalRiders: number;
  activeRiders: number;
  teamSuccessRate: number;
  lowestFailureRate: number;
  bestPerformer: string;
}
