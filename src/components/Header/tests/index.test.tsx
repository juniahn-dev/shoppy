import { render, screen } from '@testing-library/react';

import Header from '..';
import { fakeCart } from '@/test/datas';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe('Header', () => {
  const getUserCartList = jest.fn();

  afterEach(() => {
    getUserCartList.mockReset();
  });

  it('renders correctly', () => {
    getUserCartList.mockImplementation(() => fakeCart);

    render(<Header />);

    expect(screen.getByText('Shoppy')).toBeInTheDocument();
  });
});
