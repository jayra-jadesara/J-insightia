import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Page from '../../Page';
import { history } from '../../../utils/navigation-util';
import pathConst, { QUERY_INVESTOR } from '../../../constants/PathsConstant';
import numConst from '../../../constants/NumberConstants';
import msgConst from '../../../constants/MessageConstans';
import QuickSearchOptions from '../../GeneralForm/QuickSearchOptions';

const Investor = ({
  location,
  handleInvestorSearch,
  searchInvestorRecordset,
  handleResetCompanyTitle,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleVisitorLog,
  handleResetSearch
}) => {
  const [searchformVal, setSearchFormVal] = useState({
    name_search: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setSearchFormVal((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const formSubmit = async (events) => {
    events.preventDefault();
    if (
      searchformVal.name_search !== undefined &&
      searchformVal.name_search.length < 2
    ) {
      setIsLoading(false);
      return false;
    }
    handleResetSearch();
    setIsLoading(true);
    await handleInvestorSearch({
      name_search: searchformVal.name_search,
      quicksearch: 0
    });
    setIsLoading(false);
    setIsSearched(true);
  };

  useEffect(() => {
    handleResetBreadcrumbs(location.pathname);
  }, [location.pathname, handleResetBreadcrumbs]);

  return (
    <Page key={1}>
      <div className='mt-3'>
        <form
          className='cr-search-form form-inline col-lg-6 col-md-12 searchForm'
          onSubmit={formSubmit}
        >
          <svg
            width='1em'
            height='1em'
            viewBox='0 0 16 16'
            className='bi bi-search cr-search-form__icon-search'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            onClick={formSubmit}
          >
            <path
              fillRule='evenodd'
              d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'
            />
            <path
              fillRule='evenodd'
              d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'
            />
          </svg>
          <input
            type='search'
            minLength='2'
            maxLength='30'
            name='name_search'
            className='cr-search-form__input form-control'
            onChange={inputEvent}
            placeholder='Search...'
            autoComplete='off'
          />
        </form>
        <QuickSearchOptions InputName='name_search' getQuickSearchReq={handleInvestorSearch} handleReset={handleResetSearch} setIsLoading={setIsLoading} />
      </div>

      {isLoading && (
        <span className='ps-1 pt-2 d-block'>{msgConst.LOADING}</span>
      )}

      {searchInvestorRecordset !== undefined &&
        searchInvestorRecordset.data !== undefined &&
        searchInvestorRecordset.data.length !== numConst.EMPTY_TABLE_LENGTH && (
          <div className='cr-advisorsearch'>
            <table className='table mt-3 searchtable'>
              <thead>
                <tr>
                  <th>Investors</th>
                  <th>Module</th>
                </tr>
              </thead>
              <tbody>
                {searchInvestorRecordset.data.map((listValue, index) => (
                  <tr key={`key${index + 1}`}>
                    <td>
                      <span
                        className='btn btn-link'
                        onClick={(e) => {
                          e.preventDefault();
                          handleResetCompanyTitle();
                          handleResetBreadcrumbs(pathConst.INVESTOR_OVERVIEW);
                          handleResetCompanyPath(pathConst.INVESTOR_OVERVIEW);
                          handleVisitorLog(
                            pathConst.INVESTOR_OVERVIEW,
                            `${QUERY_INVESTOR}${listValue.investor_id}`
                          );
                          history.push(
                            `${pathConst.INVESTOR_OVERVIEW}${QUERY_INVESTOR}${listValue.investor_id}`
                          );
                        }}
                      >
                        {listValue.investor_name}
                      </span>
                    </td>
                    <td>
                      {listValue.activism === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1 investor_search_btn w-10'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(
                              pathConst.INVESTOR_ACTIVISM_OVERVIEW
                            );
                            handleResetCompanyPath(
                              pathConst.INVESTOR_ACTIVISM_OVERVIEW
                            );
                            handleVisitorLog(
                              pathConst.INVESTOR_ACTIVISM_OVERVIEW,
                              `${QUERY_INVESTOR}${listValue.investor_id}`
                            );
                            history.push(
                              `${pathConst.INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${listValue.investor_id}`
                            );
                          }}
                        >
                          Activism
                        </button>
                      )}

                      {listValue.activist_shorts === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1 investor_search_btn w-10'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(
                              pathConst.INVESTOR_ACTIVIST_SHORT_OVERVIEW
                            );
                            handleResetCompanyPath(
                              pathConst.INVESTOR_ACTIVIST_SHORT_OVERVIEW
                            );
                            handleVisitorLog(
                              pathConst.INVESTOR_ACTIVIST_SHORT_OVERVIEW,
                              `${QUERY_INVESTOR}${listValue.investor_id}`
                            );
                            history.push(
                              `${pathConst.INVESTOR_ACTIVIST_SHORT_OVERVIEW}${QUERY_INVESTOR}${listValue.investor_id}`
                            );
                          }}
                        >
                          Activist Shorts
                        </button>
                      )}

                      {listValue.voting === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1 investor_search_btn w-10'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(
                              pathConst.INVESTOR_VOTING_OVERVIEW
                            );
                            handleResetCompanyPath(
                              pathConst.INVESTOR_VOTING_OVERVIEW
                            );
                            handleVisitorLog(
                              pathConst.INVESTOR_VOTING_OVERVIEW,
                              `${QUERY_INVESTOR}${listValue.investor_id}`
                            );
                            history.push(
                              `${pathConst.INVESTOR_VOTING_OVERVIEW}${QUERY_INVESTOR}${listValue.investor_id}`
                            );
                          }}
                        >
                          Voting
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {!isLoading &&
        isSearched &&
        searchInvestorRecordset !== undefined &&
        searchInvestorRecordset.data !== undefined &&
        searchInvestorRecordset.data.length === numConst.EMPTY_TABLE_LENGTH && (
          <span className='ps-1 pt-2 d-block'>{msgConst.NORECORDS}</span>
        )}
    </Page>
  );
};

Investor.propTypes = {
  handleInvestorSearch: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetCompanyTitle: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  location: PropTypes.object,
  searchInvestorRecordset: PropTypes.any,
};

Investor.defaultProps = {
  handleInvestorSearch: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetCompanyTitle: () => {},
  handleVisitorLog: () => {},
  location: {},
};

export default withRouter(Investor);
