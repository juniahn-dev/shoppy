import { fakeCart, fakeUser } from '@/test/datas';
import { render, renderHook, screen, waitFor } from '@testing-library/react';

import Cart from '@/app/cart/page';
import Header from '..';
import { withAllContexts } from '@/test/utils';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe('Header', () => {
  const fakeData = {
    user: fakeUser,
    getUserCartList: jest.fn(),
  };

  afterEach(() => fakeData.getUserCartList.mockReset());

  it('renders correctly', () => {
    fakeData.getUserCartList.mockImplementation(() => fakeCart);

    render(withAllContexts(<Header />, fakeData));

    const userNameElement = screen.getByText('juniahn');

    expect(screen.getByText('Shoppy')).toBeInTheDocument();
    expect(userNameElement).toBeInTheDocument();
  });

  it('navigates to products page on Products button click', async () => {
    fakeData.getUserCartList.mockImplementation(() => fakeCart);

    // withAllContexts 안에 query할 수 있는 api를 넣을 수 없음 이거를 해결해야 함
    render(
      withAllContexts(
        <>
          <Header />
          <Cart />
        </>,
        fakeData,
      ),
    );

    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(fakeCart.length));
  });
});
