import React from 'react';
import Enzyme, { render } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Review from '../src/components/Review.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Single Review', () => {
  const review = {
    id: 3,
    restaurant: 2,
    diner: 7,
    text: 'Tenetur enim ullam hic quaerat molestiae voluptatum libero et. Id vero qui. Aspernatur eos impedit maiores iure eius hic officia. Est aut eius. Eveniet maxime et distinctio cumque atque.',
    date: '2019-05-20T07:00:00.000Z',
    overall: 3,
    food: 2,
    service: 5,
    ambience: 3,
    wouldrecommend: false,
    tags: 'pumpkin pie',
    firstname: 'Jaclyn',
    lastname: 'Mcdermott',
    city: 'New York City',
    totalReviews: 12
  };

  it('should contain a user with username text', () => {
    const wrapper = render(<Review review={review} />);
    expect(wrapper.find('.name').text()).to.equal('Jaclyn');
  });

  it('should contain review text from the prop passed in', () => {
    const wrapper = render(<Review review={review} />);
    expect(wrapper.find('.text').text()).to.equal('Tenetur enim ullam hic quaerat molestiae voluptatum libero et. Id vero qui. Aspernatur eos impedit maiores iure eius hic officia. Est aut eius. Eveniet maxime et distinctio cumque atque.');
  });
});
