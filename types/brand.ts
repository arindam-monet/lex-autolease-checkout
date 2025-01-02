export interface BrandAccount {
    id: string;
    name: string;
    profilePictureURL: string;
    conversionRate?: number;
    websiteURL?: string;
    brandIndustry?: string;
    parentBrand?: string;
    allowExchangeUnderParent?: boolean;
  }

  export interface Brand {
    id: string;
    name: string;
    profilePictureURL: string;
    conversionRate: number;
    websiteURL: string;
  }

  export interface LinkedBrandAccount {
    brand: BrandAccount;
    brandId: string;
    consumerId: string;
    countryCode: string;
    createdAt: string;
    email: string;
    id: string;
    mobileNumber: string;
    verificationId: string;
    verified: boolean;
  }