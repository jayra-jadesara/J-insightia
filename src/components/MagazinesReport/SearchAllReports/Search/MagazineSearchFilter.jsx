import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import CollapseComponent from '../../../GeneralForm/CollapseComponent';

const MagazineSearchFilter = ({ location, handleSearchResults, handleMagazineIsLoading }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const history = useHistory();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function getData() {
      if (query.q) {
        history.push(location.pathname);
      }
    }
    getData();
  }, [history, location.pathname, query.q]);

  return (
    <div className='pb-2'>
      <CollapseComponent isOpen Heading='Search Publications'>
        <div className='row'>
          <div className='row'>
            <div className='col-sm col-md-6 col-12'>
              <div className='row align-items-center'>
                <label htmlFor='freetextsearch' className='col-sm-3 col-md-3 col-4 col-form-label font-weight-bold'>
                  Text Search
                </label>
                <div className='col-sm-7 col-md-7 col-8 text-secondary labelNewsCompanyFilter'>
                  <input
                    type='text'
                    className='form-control'
                    aria-describedby='textsearch'
                    placeholder='Enter text to search...'
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  />
                </div>
                <div className='col-md-2 col-12'>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => {
                      handleMagazineIsLoading();
                      handleSearchResults(searchText);
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapseComponent>
    </div>
  );
};

export default React.memo(MagazineSearchFilter);
