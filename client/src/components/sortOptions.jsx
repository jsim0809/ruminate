import React from 'react';
import PropTypes from 'prop-types';
import { sortRadio, sortRadioFilled } from '../styles/svgs/svgs.jsx';
import styles from '../styles/styles.module.css';

const SortOptions = (props) => {
  const { options } = props;
  const { sortBy } = props;
  const { handleSortOptionClick } = props;
  return (
    <div className={styles.sortOptions}>
      {options.map(option => (
        <div className={styles.option} key={option} onClick={handleSortOptionClick} data-option={option}>
          {sortBy === option
            ? sortRadioFilled
            : sortRadio}
          <span className={styles.optionName}>{option}</span>
        </div>
      ))}
    </div>
  );
};

SortOptions.propTypes = {
  sortBy: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleSortOptionClick: PropTypes.func.isRequired
};

export default SortOptions;
