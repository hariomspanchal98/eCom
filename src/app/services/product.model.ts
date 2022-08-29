export interface Product{
    price: number;
  _id: string;
  _org: {
    _id: string;
    name: string;
    email: string;
  };
  name: string;
  description: string;
  images: { public_id: string; url: string }[]; 
  createdAt: string;
  count: number;
  cart:boolean;
}