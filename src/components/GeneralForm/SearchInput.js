import React, { useState } from 'react';
import { history } from '../../utils/navigation-util';
import pathConst from '../../constants/PathsConstant';
import ErrorBoundary from './ErrorBoundary';

const SearchInput = (props) => {
  const [searchformVal, setSarchFormVal] = useState({
    name_sarch: ''
  });
  // const [isLoading, setIsLoading] = useState(false);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setSarchFormVal((preValue) => ({
      ...preValue,
      [name]: value
    }));
  };
  const formSubmit = async (events) => {
    events.preventDefault();
    if (searchformVal.search_name !== undefined && searchformVal.search_name.length >= 3) {
      await props.handleEvent(searchformVal.search_name);
      await props.univarsalCompanysearchFormReq(searchformVal.search_name);
      await props.univarsalInvestorsearchFormReq(searchformVal.search_name);
      await props.univarsalAdvisorsearchFormReq(searchformVal.search_name);
      await props.univarsalPeopleSearchFormReq_V2(searchformVal.search_name);
      await history.push(`${pathConst.UNIVERSAL_SEARCH}`);
    }
  };

  return (
    <ErrorBoundary>
    <form action={props.universalSearch} className='cr-search-form form-inline' onSubmit={formSubmit}>
      <input
        type='search'
        className='topSearchBar cr-search-form__input form-control shadow-none'
        placeholder='Search'
        name='search_name'
        minLength='3'
        onChange={inputEvent}
        autoComplete='off'
      />
      {/* <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search cr-search-form__icon-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
      <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
    </svg> */}
      <i className='bi bi-search cr-search-form__icon-search topSearchIcon' onClick={formSubmit} />
    </form>
    </ErrorBoundary>
  );
};

export default React.memo(SearchInput);
