import React from 'react';

import './style.css';

import Title from '../title';

import closeIcon from '../../icons/disable.svg';

const Menu = props => {

  return (
    <div className={'menu'}>
      <Title name={'Menu'} icon={ closeIcon }/>
      <p>Soundcycle ALPHA. Thanks for using!</p>
    </div>
  );

};

export default Menu;
