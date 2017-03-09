import React from 'react';

import './style.css';

import Masonry from 'react-masonry-component';
import Lane from '../lane';

const Lanes = props => {
  return (
    <div className={'lanes-container'}>
      <Lane />
    </div>
  );
};

export default Lanes;
