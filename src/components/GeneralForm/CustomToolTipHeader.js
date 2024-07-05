import React, { useCallback, useEffect, useRef, useState } from 'react';
import { INFO_DOT } from '../../constants/PathsConstant';
import bn from '../../utils/bemnames';
import { ASC, DESC, DEFAULT, RESET } from '../../constants/SortConstants';

const bem = bn.create('customHeader');
let count = RESET;

const CustomToolTipHeader = (props) => {
  const [ascSort, setAscSort] = useState('inactive');
  const [descSort, setDescSort] = useState('inactive');
  const [noSort, setNoSort] = useState('inactive');
  const refButton = useRef(null);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current);
  };

  const onSortChanged = useCallback(() => {
    setAscSort(props.column.isSortAscending() ? 'active' : 'inactive');
    setDescSort(props.column.isSortDescending() ? 'active' : 'inactive');
    setNoSort(!props.column.isSortAscending() && !props.column.isSortDescending() ? 'active' : 'inactive');
  }, [props.column]);

  let sort = null;

  const onSortRequested = (event) => {
    if (count === DEFAULT) {
      count = RESET;
    }
    count++;
    if (count === ASC) {
      props.setSort('asc', event.shiftKey);
    }
    if (count === DESC) {
      props.setSort('desc', event.shiftKey);
    }
    if (count === DEFAULT) {
      props.setSort('', event.shiftKey);
    }
  };

  let menu = null;
  if (props.enableMenu) {
    menu = (
      <div ref={refButton} className='customHeaderMenuButton' onClick={() => onMenuClicked()}>
        <i className={`fa ${props.menuIcon}`} />
      </div>
    );
  }

  if (props.enableSorting) {
    if (count === ASC) {
      sort = (
        <div>
          <span
            style={{ 'margin-left': '2px', position: 'relative', top: '3px', color: '#181d1f' }}
            className={`customSortDownLabel ${ascSort}`}
          >
            <i className='bi bi-arrow-up-short' />
          </span>
        </div>
      );
    }
    if (count === DESC) {
      sort = (
        <div>
          <span
            style={{ 'margin-left': '2px', position: 'relative', top: '3px', color: '#181d1f' }}
            className={`customSortDownLabel ${descSort}`}
          >
            <i className='bi bi-arrow-down-short' />
          </span>
        </div>
      );
    }
  }
  useEffect(() => {
    props.column.addEventListener('sortChanged', onSortChanged);
    onSortChanged();
    count = RESET;
  }, [onSortChanged, props.column]);

  return (
    <div onClick={(event) => onSortRequested(event)} style={{ fontSize: '12px' }} className='ws-normal-d-block-lh'>
      {menu}
      <div className={bem.b('customHeaderLabel d-flex')}>
        <div className='pt-1 pb-1'> {props.displayName}</div>
        {props.text_tooltip && (
          <img className='info' src={`${window.location.origin}${INFO_DOT}`} title={props.text_tooltip} alt='info' />
        )}
        {sort}
      </div>
    </div>
  );
};

export default React.memo(CustomToolTipHeader);
