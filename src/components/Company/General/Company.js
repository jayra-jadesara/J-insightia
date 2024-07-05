import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Page from '../../Page';
import { history } from '../../../utils/navigation-util';
import IWidget from '../../GeneralForm/IWidget';
import bn from '../../../utils/bemnames';
import {
  ACTIVISM_OVERVIEW,
  ACTIVISTSHORTS_OVERVIEW,
  ACTIVIST_VULNERABILITY,
  COMPANY_OVERVIEW,
  GOVERNANCE_OVERVIEW,
  COMPANY_COMPENSATION_OVERVIEW,
  QUERY_MEETING,
  QUERY_PID,
  VOTING_OVERVIEW,
} from '../../../constants/PathsConstant';
import numConst from '../../../constants/NumberConstants';
import msgConst from '../../../constants/MessageConstans';
import QuickSearchOptions from '../../GeneralForm/QuickSearchOptions';

const bem = bn.create('companysearch');

const Company = ({
  location,
  handleCompanySearch,
  searchCompanyRecordset,
  handleResetCompanyTitle,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleVisitorLog,
  handleResethasCompanyTitle,
  handleResetSearch
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
      quicksearch: 0
    };
    handleResetSearch();
    setIsLoading(true);
    await handleCompanySearch(data);
    setIsLoading(false);
    setIsSearched(true);
    handleResethasCompanyTitle();
  };

  useEffect(() => {
    handleResetBreadcrumbs(location.pathname);
  }, [location.pathname, handleResetBreadcrumbs]);

  return (
    <Page key={1} className={bem.b('')}>
      <div className='mt-3'>
        <form
          className='cr-search-form form-inline col-lg-6 col-md-12 '
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
            minLength='1'
            maxLength='30'
            name='name_sarch'
            className='cr-search-form__input form-control'
            onChange={inputEvent}
            placeholder='Search...'
            autoComplete='off'
          />
        </form>
        <QuickSearchOptions
          getQuickSearchReq={handleCompanySearch}
          handleReset={handleResetSearch}
          setIsLoading={setIsLoading}
          InputName='name_sarch'
        />
      </div>

      {isLoading && msgConst.LOADING}

      {searchCompanyRecordset !== undefined &&
        searchCompanyRecordset.data.length !== 0 && (
          <div className='cr-advisorsearch'>
            <table className='table mt-3 searchtable'>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Country</th>
                  <th>Module</th>
                </tr>
              </thead>
              <tbody>
                {searchCompanyRecordset.data.map((listValue, index) => (
                  <tr
                    className='searchtableresults'
                    key={`Recordset${index + 1}`}
                  >
                    <td>
                      <span
                        className='btn btn-link'
                        aria-hidden='true'
                        onClick={(e) => {
                          e.preventDefault();
                          handleResetCompanyTitle();
                          handleResetBreadcrumbs(COMPANY_OVERVIEW);
                          handleResetCompanyPath(COMPANY_OVERVIEW);
                          handleVisitorLog(
                            COMPANY_OVERVIEW,
                            `${QUERY_PID}${listValue.PID}`
                          );
                          history.push(
                            `${COMPANY_OVERVIEW}${QUERY_PID}${listValue.PID}`
                          );
                        }}
                      >
                        {listValue.prev_names && (
                          <IWidget
                            tooltipOverrideString={listValue.prev_names}
                          />
                        )}
                        {listValue.Company_name}
                      </span>
                    </td>
                    <td>{listValue.Country_name}</td>

                    {/* new modules */}
                    <td>
                      {listValue.activism === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(ACTIVISM_OVERVIEW);
                            handleResetCompanyPath(ACTIVISM_OVERVIEW);
                            handleVisitorLog(
                              ACTIVISM_OVERVIEW,
                              `${QUERY_PID}${listValue.PID}`
                            );
                            history.push(
                              `${ACTIVISM_OVERVIEW}${QUERY_PID}${listValue.PID}`
                            );
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
                            handleResetBreadcrumbs(ACTIVISTSHORTS_OVERVIEW);
                            handleResetCompanyPath(ACTIVISTSHORTS_OVERVIEW);
                            handleVisitorLog(
                              ACTIVISTSHORTS_OVERVIEW,
                              `${QUERY_PID}${listValue.PID}`
                            );
                            history.push(
                              `${ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${listValue.PID}`
                            );
                          }}
                        >
                          Activist Shorts
                        </button>
                      )}

                      {listValue.governance === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(GOVERNANCE_OVERVIEW);
                            handleResetCompanyPath(GOVERNANCE_OVERVIEW);
                            handleVisitorLog(
                              GOVERNANCE_OVERVIEW,
                              `${QUERY_PID}${listValue.PID}`
                            );
                            history.push(
                              `${GOVERNANCE_OVERVIEW}${QUERY_PID}${listValue.PID}`
                            );
                          }}
                        >
                          Governance
                        </button>
                      )}

                      {listValue.vulnerability === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(ACTIVIST_VULNERABILITY);
                            handleResetCompanyPath(ACTIVIST_VULNERABILITY);
                            handleVisitorLog(
                              ACTIVIST_VULNERABILITY,
                              `${QUERY_PID}${listValue.PID}`
                            );
                            history.push(
                              `${ACTIVIST_VULNERABILITY}${QUERY_PID}${listValue.PID}`
                            );
                          }}
                        >
                          Vulnerability
                        </button>
                      )}

                      {listValue.voting === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(VOTING_OVERVIEW);
                            handleResetCompanyPath(VOTING_OVERVIEW);
                            handleVisitorLog(
                              VOTING_OVERVIEW,
                              `${QUERY_PID}${listValue.PID}`
                            );
                            history.push(
                              `${VOTING_OVERVIEW}${QUERY_MEETING}${listValue.meeting_id}`
                            );
                          }}
                        >
                          Voting
                        </button>
                      )}

                      {listValue.compensation === numConst.NUMBER_ONE && (
                        <button
                          type='button'
                          className='btn btn-primary m-1'
                          onClick={(e) => {
                            e.preventDefault();
                            handleResetCompanyTitle();
                            handleResetBreadcrumbs(COMPANY_COMPENSATION_OVERVIEW);
                            handleResetCompanyPath(COMPANY_COMPENSATION_OVERVIEW);
                            handleVisitorLog(
                              COMPANY_COMPENSATION_OVERVIEW,
                              `${QUERY_PID}${listValue.PID}`
                            );
                            history.push(
                              `${COMPANY_COMPENSATION_OVERVIEW}${QUERY_PID}${listValue.PID}`
                            );
                          }}
                        >
                          Compensation
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
        searchCompanyRecordset.data.length === numConst.EMPTY_TABLE_LENGTH &&
        msgConst.NORECORDS}
    </Page>
  );
};

Company.propTypes = {
  handleCompanySearch: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetCompanyTitle: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  location: PropTypes.object,
  searchCompanyRecordset: PropTypes.object,
};

Company.defaultProps = {
  handleCompanySearch: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetCompanyTitle: () => {},
  handleVisitorLog: () => {},
  location: {},
};

export default withRouter(React.memo(Company));
