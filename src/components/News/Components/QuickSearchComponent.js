import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import pathConstant, { QUERY_Q } from '../../../constants/PathsConstant';
import { history } from '../../../utils/navigation-util';

const QuickSearchComponent = () => {
  const [value, setValue] = useState('');

  return (
    <form
      className='cr-search-form form-inline mb-2'
      onSubmit={(e) => {
        e.preventDefault();
        history.push(`${pathConstant.NEWS_SEARCH}${QUERY_Q}${value}`);
      }}
    >
      <i
        className='bi bi-search cr-search-form__icon-search'
        onClick={(e) => {
          e.preventDefault();
          history.push(`${pathConstant.NEWS_SEARCH}${QUERY_Q}${value}`);
        }}
      />
      <input
        type='search'
        className='cr-search-form__input form-control'
        onChange={(e) => setValue(e.target.value)}
        placeholder='Quick search...'
        value={value}
      />
    </form>
  );
};

export default withRouter(React.memo(QuickSearchComponent));
