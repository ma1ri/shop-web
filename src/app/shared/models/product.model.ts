import { Brand } from './brand.model';
import { Category } from './category.model';
import { Image } from './image.model';
import { User } from './user.model';

export interface Product {
  _id: string;
  productName: string;
  userId: User;
  categoryId: Category;
  brandId: Brand;
  price: number;
  newPrice?: number;
  inStock: boolean;
  onSale: boolean;
  description: string;
  imageIds: Image[];
}
