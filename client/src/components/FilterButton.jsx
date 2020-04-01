import React from 'react';
import PropTypes from 'prop-types';
import { filterBox, filterBoxChecked } from '../styles/svgs/svgs.jsx';
import styles from '../styles/styles.module.css';

const FilterButton = (props) => {
  const { tag } = props;
  const { classString } = props;
  const { handleFilterClick } = props;
  const { checked } = props;
  const { count } = props;

  return (
    <div className={classString} key={tag} data-tag={tag} onClick={handleFilterClick}>
      {checked
        ? filterBoxChecked
        : filterBox}
      <span className={styles.filterName}>{tag} ({count})</span>
    </div>
  );
};

FilterButton.propTypes = {
  classString: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  count: PropTypes.number
};

FilterButton.defaultProps = {
  checked: false,
  count: 0
};

export default FilterButton;
