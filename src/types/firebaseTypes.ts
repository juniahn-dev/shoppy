export interface IProductListProps {
  category: string;
  description: string;
  id: string;
  image: string;
  options: string[];
  price: number;
  title: string;
}

export interface IUsersCartProps {
  option: string;
  price: number;
  image: string;
  title: string;
  productId: string;
  count: number;
}
