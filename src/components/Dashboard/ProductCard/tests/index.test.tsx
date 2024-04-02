import { render, screen } from '@testing-library/react';

import ProductCard from '..';
import { fakeProduct } from '@/test/datas';
import renderer from 'react-test-renderer';

describe('ProductCard', () => {
  const { image, title, price, category } = fakeProduct;

  // use snapshot
  it('renders flex type card', () => {
    const component = renderer.create(<ProductCard product={fakeProduct} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  // not use snapshot
  it('renders product cart', () => {
    render(<ProductCard product={fakeProduct} />);

    const productImg = screen.getByRole('img') as HTMLImageElement;

    expect(productImg.src).toBe(`${image}/`);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(`$${price}`)).toBeInTheDocument();
    expect(screen.getByText(category)).toBeInTheDocument();
  });
});
