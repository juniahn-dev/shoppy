import { IUserCombineProps } from '@/hooks/store/user';

export const fakeProducts = [
  {
    id: 'key-id1',
    category: 'female',
    description: 'soo good',
    image: 'https://image',
    options: ['XL', 'L', 'M'],
    price: 124000,
    title: 'gorgeous shirt',
  },
  {
    id: 'key-id2',
    category: 'male',
    description: 'soo good job',
    image: 'https://image',
    options: ['XL', 'L', 'M', 'S'],
    price: 12400,
    title: 'gorgeous T',
  },
];

export const fakeProduct = {
  id: 'key-id1',
  category: 'female',
  description: 'soo good',
  image: 'https://image',
  options: ['XL', 'L', 'M'],
  price: 124000,
  title: 'gorgeous shirt',
};

export const fakeCart = [
  {
    id: 'key-cartId1',
    productId: 'key-id2',
    option: 'XL',
    price: 12400,
    image: 'https://image',
    title: 'gorgeous T',
    count: 1,
  },
  {
    id: 'key-cartId2',
    productId: 'key-id2',
    option: 'L',
    price: 12400,
    image: 'https://image',
    title: 'gorgeous T',
    count: 2,
  },
];

export const fakeUser = {
  user: {
    uid: 'X-dILOFDNION',
    displayName: 'juniahn',
    photoURL: 'https://juniahn-img',
  },
  loading: false,
} as IUserCombineProps;
