import { IProductListProps, IUsersCartProps } from './firebaseTypes';

export interface ICartProductAmountProps {
  changeTarget: string;
  product: IUsersCartProps;
  uid: string;
}

export interface IDeleteCartProductProps {
  product: IUsersCartProps;
  uid: string;
}

export interface ICartProps {
  id: string | string[];
  product: IProductListProps;
  option: string;
  uid: string;
}
