import { render, screen } from '@testing-library/react';

import ImageComponent from '..';

describe('Image', () => {
  it('renders correctly', () => {
    const src = 'https://image/';
    render(<ImageComponent src={src} />);
    const imageElement = screen.getByRole('img') as HTMLImageElement;

    expect(imageElement.src).toBe(src);
  });
});
