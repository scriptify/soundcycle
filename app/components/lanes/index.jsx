import React from 'react';
import { observer, inject } from 'mobx-react';

import './style.css';

import { UI_STORE, DATA_STORE } from 'stores/constants';

import Masonry from 'react-masonry-component';
import Lane from 'components/lane';

const Lanes = ({
  uiStore,
  dataStore
}) => {
  return (
    <div className={'lanes-container'}>
    {
      dataStore.lanes.map(lane => {

        return (
          <Lane
            key={ lane.id }
            id={ lane.id }
          />
        );
      })
    }
    </div>
  );
};

export default inject(UI_STORE, DATA_STORE)(observer(Lanes));
