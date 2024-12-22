export interface Product {
    id: number;
    name: string;
    reviews: number;
    price: number;
    remainingPrice?: number; // Make remainingPrice optional in the interface
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
  }
  export interface CartItem extends Product {
    quantity: number;
  }