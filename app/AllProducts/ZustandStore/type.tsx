export interface Product {
  id: number;
  name: string;
  reviews: number;
  price: number;
  remainingPrice?: number;
  discount: number;
  imageUrl: string;
  manufacturer: string;
  genericName: string;
  sizeStrip: number;
  detailsStrip: number;
  description: string;
  ingredients: string;
  drugClass: string;
  dosageForm: string;
  uses: string;
  dosage: string;
  overdoseGuidance: string;
  missedDoseGuidance: string;
  howToUse: string;
  whenNotToUse: string;
  sideEffects: string;
  precautionsAndWarnings: string;
  drugInteractions: string;
  storageOrDisposal: string;
  categoryName: string;
  rating: number;
  reviewsCount: number;
  
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string; 

}
export interface TopSellingProduct {
  id: number;
  name: string;
  imageUrl: string;
  discount: number;
  price: number;
  totalSold: number;
}
