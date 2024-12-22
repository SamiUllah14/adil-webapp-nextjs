// types/Product.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    discount: number;
    imageUrl: string;
    rating: number;
    reviewsCount: number;
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
  }
  