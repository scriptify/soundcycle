import React from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import { UI_STORE } from 'stores/constants';

import Title from 'components/title';

import closeIcon from 'icons/disable.svg';

const Menu = ({
  uiStore
}) => {

  return (
    <div className={'menu'}>
      <Title
        name={'Menu'}
        icon={ closeIcon }
        onAction={ () => {
          uiStore.hideExclusivePane();
        }}
      />
      <p>Thank you for using the ALPHA version of Soundcycle! In the ALPHA there are no menu point available yet.</p>
    </div>
  );

};

export default inject(UI_STORE)(observer(Menu));
