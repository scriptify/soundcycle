import React from 'react';

import './style.css';

import Masonry from 'react-masonry-component';
import Track from '../track';

const Lane = props => {
  return (
    <div className={'lane-container'}>
      <div className={'lane-title'}>
        <div className={'content'}>
          Lane 1
        </div>
      </div>

      <div className={'lane-tracks'}>
        <Masonry options={{ gutter: 20, fitWidth: true }} className={'lane-masonry'}>
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
        </Masonry>
      </div>
    </div>
  );
};

export default Lane;
