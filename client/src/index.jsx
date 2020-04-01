import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './components/reviewsComponent.jsx';

ReactDOM.render(
  <Reviews restaurantId={window.location.href.split('/')[3]} />, 
  document.getElementById('reviews')
);
