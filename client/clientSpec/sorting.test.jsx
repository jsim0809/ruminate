import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Sorting from '../src/components/Sorting.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Sorting', () => {
  const tags = ['a', 'b'];
  const choosingSort = false;
  const options = ['x', 'y'];
  const handleSortClick = () => {};
  const handleSortOptionClick = () => {};

  it('renders the component', () => {
    const tree = renderer
      .create(
        <Sorting
          tags={tags}
          choosingSort={choosingSort}
          options={options}
          handleSortClick={handleSortClick}
          handleSortOptionClick={handleSortOptionClick}
        />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the header text', () => {
    const wrapper = shallow(
      <Sorting
        tags={tags}
        choosingSort={choosingSort}
        options={options}
        handleSortClick={handleSortClick}
        handleSortOptionClick={handleSortOptionClick}
      />
    );
    const list = wrapper.find('div h4').first();
    expect(list.text()).toBe('Sort by');
  });
});
