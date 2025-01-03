import { Brand, BrandAccount, LinkedBrandAccount } from "@/types/brand";

export interface ConsumerLinkedBrandAccountResponse {
  brands: BrandAccount[];
}

export interface ConsumerDashboardResponse {
  session: Session;
  message: string;
}

export interface Session {
  id: string;
  consumerId: string;
  sessionId: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface StreamResponse {
  part: number;
  points: PointData[];
  account: LinkedBrandAccount;
}

export interface PointData {
  points: string;
  expirationDate: string;
}


export interface Account {
  id: string;
  consumerId: string;
  brandId: string;
  email: string | null;
  countryCode: string;
  mobileNumber: string;
  verified: boolean;
  createdAt: string;
  verificationId: string;
  brand: Brand;
}


export interface RedeemPointsRequest {
  apiKey: string;
  secretKey: string;
  brandName: string;
  totalPoints: number;
  consumerId: string;
}