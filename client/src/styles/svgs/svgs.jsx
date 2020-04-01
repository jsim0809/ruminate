import React from 'react';
import styles from '../styles.module.css';

//  still broken
const helpful = (
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="16px" width="16px" viewBox="0 0 500 500">
    <g>
      <path d="M497,0H15C6.716,0,0,6.716,0,15v482c0,8.284,6.716,15,15,15h482c8.284,0,15-6.716,15-15V15C512,6.716,505.284,0,497,0z M482,482H30V30h452V482z" />
    </g>
    <g>
      <path d="M328.94,178.205l-62.331-62.331c-5.709-5.711-15.25-5.969-21.217,0l-62.332,62.331c-5.858,5.857-5.858,15.355,0,21.212 c5.857,5.857,15.355,5.857,21.212,0L241,162.689V303.71c0,8.284,6.716,14.999,15,14.999s15-6.716,15-14.999V162.689l36.728,36.728 c5.858,5.858,15.355,5.857,21.212,0C334.798,193.56,334.798,184.062,328.94,178.205z" />
    </g>
    <g>
      <path d="M287.961,370.523h-63.922c-8.284,0-15,6.716-15,14.999c0,8.283,6.716,14.999,15,14.999h63.922c8.284,0,15-6.716,15-14.999 C302.961,377.239,296.245,370.523,287.961,370.523z" />
    </g>
  </svg>
);

const filterBox = (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ background: '#fff' }}>
    <title>icon/ic_checkbox</title>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <rect x="1" y="1" width="16" height="16" rx="2" transform="translate(3 3)" stroke="#333" strokeWidth="2" />
    </g>
  </svg>
);

const filterBoxFill = (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ background: '#fff' }}>
    <title>icon/ic_checkbox_filled</title>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <rect fill="#DA3743" x="3" y="3" width="16" height="16" rx="2" />
      <g transform="rotate(45 -1.066 19.62)" />
    </g>
  </svg>
);

const filterBoxCheckmark = (
  <svg mlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="10px" height="10px" viewBox="0 0 500 500" style={{ enableBackground: '0 0 10 10' }}>
    <g>
      <path
        stroke="white"
        fill="white"
        d="M434.539,98.499l-38.828-38.828c-5.324-5.328-11.799-7.993-19.41-7.993c-7.618,0-14.093,2.665-19.417,7.993L169.59,247.248
        l-83.939-84.225c-5.33-5.33-11.801-7.992-19.412-7.992c-7.616,0-14.087,2.662-19.417,7.992L7.994,201.852
        C2.664,207.181,0,213.654,0,221.269c0,7.609,2.664,14.088,7.994,19.416l103.351,103.349l38.831,38.828
        c5.327,5.332,11.8,7.994,19.414,7.994c7.611,0,14.084-2.669,19.414-7.994l38.83-38.828L434.539,137.33
        c5.325-5.33,7.994-11.802,7.994-19.417C442.537,110.302,439.864,103.829,434.539,98.499z"
      />
    </g>
  </svg>
);

const sortRadio = (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>icon/ic_radio_default</title>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <rect x="1" y="1" width="18" height="18" rx="9" fill="#fff" transform="translate(2 2)" stroke="#333" strokeWidth="2" />
    </g>
  </svg>
);

const sortRadioFilled = (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>icon/ic_radio_filled</title>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <rect stroke="#DA3743" strokeWidth="7" x="5.5" y="5.5" width="13" height="13" rx="6.5" fill="#fff" />
    </g>
  </svg>
);

const sortCaretDown = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="9px" viewBox="0 0 300 300" style={{ enableBackground: '0 0 24 24' }}>
    <g>
      <path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
        L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
        c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
        c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"
      />
    </g>
  </svg>
);

const sortCaretUp = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="8px" viewBox="0 0 300 300">
    <g>
      <path d="M302.445,205.788L164.63,67.959c-6.136-6.13-16.074-6.13-22.203,0L4.597,205.788c-6.129,6.132-6.129,16.069,0,22.201
      l11.101,11.101c6.129,6.136,16.076,6.136,22.209,0l115.62-115.626L269.151,239.09c6.128,6.136,16.07,6.136,22.201,0
      l11.101-11.101C308.589,221.85,308.589,211.92,302.445,205.788z"
      />
    </g>
  </svg>
);

const filterBoxChecked = (
  <div className={styles.filterChecked}>
    {filterBoxFill}
    <div className={styles.checkmark}>
      {filterBoxCheckmark}
    </div>
  </div>
);

export {
  helpful,
  filterBox,
  filterBoxChecked,
  sortRadio,
  sortRadioFilled,
  sortCaretDown,
  sortCaretUp
};
