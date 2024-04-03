import { fakeCart, fakeUser } from '@/test/datas';
import { render, screen, waitFor } from '@testing-library/react';

import Cart from '@/app/cart/page';
import Header from '..';
import Products from '@/app/products/[id]/page';
import { withAllContexts } from '@/test/utils';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe('Header', () => {
  const getUserCartList = jest.fn();

  afterEach(() => getUserCartList.mockReset());

  it('renders correctly', () => {
    getUserCartList.mockImplementation(() => fakeCart);

    render(withAllContexts(<Header />, fakeUser));

    const userNameElement = screen.getByText('juniahn');

    expect(screen.getByText('Shoppy')).toBeInTheDocument();
    expect(userNameElement).toBeInTheDocument();
  });

  it('navigates to products page on Products button click', async () => {
    getUserCartList.mockImplementation(() => fakeCart);

    render(
      withAllContexts(
        <>
          <Header />
          <Cart />
        </>,
        fakeUser,
      ),
    );

    // await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(fakeCart.length));
  });
});
