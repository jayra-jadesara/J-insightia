import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Page from '../../Page';
import { history } from '../../../utils/navigation-util';
import { IS_ENABLE, IS_DISABLE } from '../../../constants/GeneralConstant';
import {
  ADVISOR_ACTIVISM,
  ADVISOR_ACTIVISTSHORT,
  ADVISOR_OVERVIEW,
  ADVISOR_VOTING_OVERVIEW,
  QUERY_COMPANY_ID,
} from '../../../constants/PathsConstant';
import numConst from '../../../constants/NumberConstants';
import msgConst from '../../../constants/MessageConstans';
import QuickSearchOptions from '../../GeneralForm/QuickSearchOptions';

const Advisor = ({
  location,
  handleAdvisorSearch,
  lstAdvisorSearchData,
  handleResetCompanyTitle,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleVisitorLog,
  handleResetSearch,
}) => {
  const [searchformVal, setSarchFormVal] = useState({
    name_sarch: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setSarchFormVal((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };
  const formSubmit = async (events) => {
    events.preventDefault();
    if (searchformVal.name_sarch.length < 3) {
      setIsLoading(false);
      return false;
    }
    const data = {
      name_search: searchformVal.name_sarch,
      quicksearch: 0,
    };
    handleResetSearch();
    setIsLoading(true);
    await handleAdvisorSearch(data);
    setIsLoading(false);
    setIsSearched(true);
  };

  useEffect(() => {
    handleResetBreadcrumbs(location.pathname);
  }, [location.pathname, handleResetBreadcrumbs]);

  React.useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [isLoading]);

  return (
    <Page key={1}>
      <div className='mt-3'>
        <form className='cr-search-form form-inline col-lg-6 col-md-12 ' onSubmit={formSubmit}>
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
            minLength='3'
            maxLength='30'
            name='name_sarch'
            className='cr-search-form__input form-control'
            onChange={inputEvent}
            placeholder='Search...'
            autoComplete='off'
          />
        </form>
        <QuickSearchOptions
          InputName='name_sarch'
          getQuickSearchReq={handleAdvisorSearch}
          handleReset={handleResetSearch}
          setIsLoading={setIsLoading}
        />
      </div>

      {isLoading && msgConst.LOADING}

      {lstAdvisorSearchData !== undefined && lstAdvisorSearchData.length !== 0 && (
        <div className='cr-advisorsearch' id='loadItem'>
          <table className='table mt-3 searchtable'>
            <thead>
              <tr>
                <th>Adviser</th>
                <th>Type</th>
                <th>Module</th>
              </tr>
            </thead>
            <tbody>
              {lstAdvisorSearchData.length > 0 &&
                lstAdvisorSearchData.map((listValue, index) => (
                  <tr key={`lstAdvisorSearchData_${index + 1}`}>
                    <td>
                      <span
                        className='btn btn-link'
                        aria-hidden='true'
                        onClick={(e) => {
                          e.preventDefault();
                          handleResetCompanyTitle();
                          handleResetBreadcrumbs(ADVISOR_OVERVIEW);
                          handleResetCompanyPath(ADVISOR_OVERVIEW);

                          if (
                            listValue.activism === IS_ENABLE &&
                            listValue.activist_shorts === IS_ENABLE &&
                            listValue.voting === IS_ENABLE
                          ) {
                            handleVisitorLog(ADVISOR_ACTIVISM, `${QUERY_COMPANY_ID}${listValue.company_id}`);
                            history.push(`${ADVISOR_ACTIVISM}${QUERY_COMPANY_ID}${listValue.company_id}`);
                          } else {
                            if (
                              listValue.activism === IS_DISABLE &&
                              listValue.activist_shorts === IS_ENABLE &&
                              listValue.voting === IS_ENABLE
                            ) {
                              handleVisitorLog(ADVISOR_ACTIVISTSHORT, `${QUERY_COMPANY_ID}${listValue.company_id}`);
                              history.push(`${ADVISOR_ACTIVISTSHORT}${QUERY_COMPANY_ID}${listValue.company_id}`);
                            } else {
                              if (
                                listValue.activism === IS_ENABLE &&
                                listValue.activist_shorts === IS_ENABLE &&
                                listValue.voting === IS_DISABLE
                              ) {
                                handleVisitorLog(ADVISOR_ACTIVISM, `${QUERY_COMPANY_ID}${listValue.company_id}`);
                                history.push(`${ADVISOR_ACTIVISM}${QUERY_COMPANY_ID}${listValue.company_id}`);
                              } else {
                                if (
                                  listValue.activism === IS_ENABLE &&
                                  listValue.activist_shorts === IS_DISABLE &&
                                  listValue.voting === IS_ENABLE
                                ) {
                                  handleVisitorLog(ADVISOR_ACTIVISM, `${QUERY_COMPANY_ID}${listValue.company_id}`);
                                  history.push(`${ADVISOR_ACTIVISM}${QUERY_COMPANY_ID}${listValue.company_id}`);
                                } else {
                                  if (
                                    listValue.activism === IS_ENABLE &&
                                    listValue.activist_shorts === IS_DISABLE &&
                                    listValue.voting === IS_DISABLE
                                  ) {
                                    handleVisitorLog(ADVISOR_ACTIVISM, `${QUERY_COMPANY_ID}${listValue.company_id}`);
                                    history.push(`${ADVISOR_ACTIVISM}${QUERY_COMPANY_ID}${listValue.company_id}`);
                                  }
                                }
                              }
                            }
                          }

                          if (
                            listValue.activism === IS_DISABLE &&
                            listValue.activist_shorts === IS_ENABLE &&
                            listValue.voting === IS_DISABLE
                          ) {
                            handleVisitorLog(ADVISOR_ACTIVISTSHORT, `${QUERY_COMPANY_ID}${listValue.company_id}`);
                            history.push(`${ADVISOR_ACTIVISTSHORT}${QUERY_COMPANY_ID}${listValue.company_id}`);
                          }

                          if (
                            listValue.activism === IS_DISABLE &&
                            listValue.activist_shorts === IS_DISABLE &&
                            listValue.voting === IS_ENABLE
                          ) {
                            handleVisitorLog(ADVISOR_VOTING_OVERVIEW, `${QUERY_COMPANY_ID}${listValue.company_id}`);
                            history.push(`${ADVISOR_VOTING_OVERVIEW}${QUERY_COMPANY_ID}${listValue.company_id}`);
                          }
                        }}
                      >
                        {listValue.name}
                      </span>
                    </td>
                    <td>{listValue.type}</td>
                    <td>
                      {listValue.activism === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(ADVISOR_ACTIVISM);
                            handleResetCompanyPath(ADVISOR_ACTIVISM);
                            handleVisitorLog(ADVISOR_ACTIVISM, `${QUERY_COMPANY_ID}${listValue.company_id}`);
                            history.push(`${ADVISOR_ACTIVISM}${QUERY_COMPANY_ID}${listValue.company_id}`);
                          }}
                        >
                          Activism
                        </button>
                      )}

                      {listValue.activist_shorts === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(ADVISOR_ACTIVISTSHORT);
                            handleResetCompanyPath(ADVISOR_ACTIVISTSHORT);
                            handleVisitorLog(ADVISOR_ACTIVISTSHORT, `${QUERY_COMPANY_ID}${listValue.company_id}`);
                            history.push(`${ADVISOR_ACTIVISTSHORT}${QUERY_COMPANY_ID}${listValue.company_id}`);
                          }}
                        >
                          Activist Shorts
                        </button>
                      )}

                      {listValue.voting === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(ADVISOR_VOTING_OVERVIEW);
                            handleResetCompanyPath(ADVISOR_VOTING_OVERVIEW);
                            handleVisitorLog(ADVISOR_VOTING_OVERVIEW, `${QUERY_COMPANY_ID}${listValue.company_id}`);
                            history.push(`${ADVISOR_VOTING_OVERVIEW}${QUERY_COMPANY_ID}${listValue.company_id}`);
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

      {!isLoading && isSearched && lstAdvisorSearchData.length === numConst.EMPTY_TABLE_LENGTH && msgConst.NORECORDS}
    </Page>
  );
};

Advisor.propTypes = {
  handleAdvisorSearch: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetCompanyTitle: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  location: PropTypes.object,
  lstAdvisorSearchData: PropTypes.array,
};

Advisor.defaultProps = {
  handleAdvisorSearch: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetCompanyTitle: () => {},
  handleVisitorLog: () => {},
  location: {},
  lstAdvisorSearchData: [],
};

export default withRouter(React.memo(Advisor));
