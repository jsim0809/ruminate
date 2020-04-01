import React from 'react';
import renderer from 'react-test-renderer';
import Reviews from '../src/components/ReviewsComponent.jsx';

describe('Reviews Component', () => {
  it('renders the reviews component and its children', () => {
    const tree = renderer
      .create(<Reviews restaurantId={1} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
