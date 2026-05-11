import { RiderStats } from "./types";

export const INITIAL_RIDERS: RiderStats[] = [
  {
    id: "1",
    name: "Sonu Thakur",
    totalParcels: 120,
    deliveredParcels: 118,
    successRate: 98.3,
    failedParcels: 2,
    rank: "Team Leader",
  },
  {
    id: "2",
    name: "Aman",
    totalParcels: 110,
    deliveredParcels: 102,
    successRate: 92.7,
    failedParcels: 8,
    rank: "Pro Rider",
  },
  {
    id: "3",
    name: "Rohit",
    totalParcels: 105,
    deliveredParcels: 95,
    successRate: 90.5,
    failedParcels: 10,
    rank: "Pro Rider",
  },
  {
    id: "4",
    name: "Kunal",
    totalParcels: 95,
    deliveredParcels: 78,
    successRate: 82.1,
    failedParcels: 17,
    rank: "Fast Mover",
  },
  {
    id: "5",
    name: "Deepak",
    totalParcels: 100,
    deliveredParcels: 75,
    successRate: 75.0,
    failedParcels: 25,
    rank: "Needs Improvement",
  },
];

export const SMART_MESSAGES = [
  "Customers are answering today 😄",
  "OTP gods support this rider 🔥",
  "Legendary delivery streak detected",
  "Failure rate looking clean today 👏",
  "Maximum efficiency mode engaged ⚡",
  "Eco-delivery mode: Fast & Furious 🚴‍♂️",
];
