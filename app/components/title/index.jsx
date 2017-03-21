import React from 'react';

import './style.css';

const Title = ({ name, icon, onAction = () => {}, small }) => {

  let className = 'title';

  if(small)
    className += ' small';

  return (
    <div className={ className }>
      <div className={'content'}>
        <div className={'text'}>{ name }</div>
        { icon &&
          <div className={'icon'} onClick={ onAction }>
            <img src={ icon } />
          </div>
        }
      </div>
    </div>
  );

};

export default Title;
