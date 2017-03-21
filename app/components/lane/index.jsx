import React from 'react';

import './style.css';

import Masonry from 'react-masonry-component';
import Track from 'components/track';
import Title from 'components/title';

import deleteIcon from 'icons/delete.svg';

const Lane = props => {
  return (
    <div className={'lane-container'}>
      <Title name={'Lane 1'} icon={ deleteIcon } />

      <div className={'lane-tracks'}>
        <Masonry options={{ gutter: 20, fitWidth: true }} className={'lane-masonry'}>
          <Track hideDelete={ true } />
          <Track editMode={ true }/>
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
