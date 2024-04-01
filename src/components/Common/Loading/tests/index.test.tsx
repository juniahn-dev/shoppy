import { render, screen } from '@testing-library/react';

import Loading from '..';

describe('Loading', () => {
  it('renders correctly', () => {
    render(<Loading />);
    const loadingElement = screen.getByText('Loading...');

    expect(loadingElement).toBeInTheDocument();
  });
});
