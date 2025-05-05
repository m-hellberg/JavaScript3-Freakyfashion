export interface Product {
  id: number;
  name: string;
  brand: string;
  sku: string;
  price: number;
  image: string;
  description: string;
  slug: string; 
  publicationDate: Date;
  isNew: number;
  purchasesThisMonth: number;
  isPopular: number;
}
  