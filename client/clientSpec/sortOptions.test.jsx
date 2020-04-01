import React from 'react';
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import SortOptions from '../src/components/SortOptions.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Sorting Options Menu', () => {
  const options = ['a', 'b', 'c'];
  const handleSortOptionClick = () => {};

  it('lists the options passed as props', () => {
    const wrapper = render(
      <SortOptions
        options={options}
        handleSortOptionClick={handleSortOptionClick}
      />
    );
    expect(wrapper.find('.option')).to.have.lengthOf(3);
  });
});
