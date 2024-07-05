import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Page from '../Page';
import { history } from '../../utils/navigation-util';
import pathConst, {
  QUERY_COMPANY_ID,
  QUERY_DIRECTOR,
  QUERY_INVESTOR,
  QUERY_MEETING,
  QUERY_PID,
} from '../../constants/PathsConstant';
import { LOADING, NORECORDS } from '../../constants/MessageConstans';
import bn from '../../utils/bemnames';
import IWidget from '../GeneralForm/IWidget';
import { SECTION_COMPANY, SECTION_INVESTOR, SECTION_ADVISOR, SECTION_PEOPLE } from '../../constants/SectionConstant';
import { IS_ENABLE, IS_DISABLE } from '../../constants/GeneralConstant';
import numConst from '../../constants/NumberConstants';
import ErrorBoundary from '../GeneralForm/ErrorBoundary';

const bem = bn.create('universalsearch');

const UniversalSearch = ({
  location,
  searchCompanyRecordset,
  searchInvestorDataRecordset,
  searchAdvisorDataRecordset,
  searchPeopleDataRecordset,
  isLoading,
  searchedName,
  handleResetCompanyTitle,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
}) => {
  const [isAvailable] = useState(1);

  const searchResult = (titleName, subHead, recordset, type) => (
    <table className='table mt-3 searchtable'>
      {recordset !== undefined && recordset.length > 0 && (
        <thead className='title'>
          <tr>
            <th>{titleName}</th>
            <th>{subHead}</th>
            <th>Module</th>
          </tr>
        </thead>
      )}
      {recordset !== undefined && recordset.length > 0 && (
        <tbody>
          {recordset.map((listValue, index) => (
            <tr key={`key${index + 1}`}>
              {/* Name Head */}
              <td>
                <span
                  className='btn btn-link text-start'
                  aria-hidden='true'
                  onClick={(e) => {
                    e.preventDefault();
                    handleResetCompanyTitle();
                    handleResetBreadcrumbs(pathConst.Universal_OVERVIEW);
                    handleResetCompanyPath(pathConst.Universal_OVERVIEW);
                    /* Company */
                    if (type === SECTION_COMPANY) {
                      history.push(`${pathConst.COMPANY_OVERVIEW}${QUERY_PID}${listValue.PID}`);
                    }
                    /* Investor */
                    if (type === SECTION_INVESTOR) {
                      history.push(`${pathConst.INVESTOR_OVERVIEW}${QUERY_INVESTOR}${listValue.investor_id}`);
                    }
                    /* Advisor */
                    if (type === SECTION_ADVISOR) {
                      listValue.activism === IS_ENABLE &&
                      listValue.activist_shorts === IS_ENABLE &&
                      listValue.voting === IS_ENABLE
                        ? history.push(`${pathConst.ADVISOR_ACTIVISM}${QUERY_COMPANY_ID}${listValue.company_id}`)
                        : listValue.activism === IS_DISABLE &&
                          listValue.activist_shorts === IS_ENABLE &&
                          listValue.voting === IS_ENABLE
                        ? history.push(`${pathConst.ADVISOR_ACTIVISTSHORT}${QUERY_COMPANY_ID}${listValue.company_id}`)
                        : listValue.activism === IS_ENABLE &&
                          listValue.activist_shorts === IS_ENABLE &&
                          listValue.voting === IS_DISABLE
                        ? history.push(`${pathConst.ADVISOR_ACTIVISM}${QUERY_COMPANY_ID}${listValue.company_id}`)
                        : listValue.activism === IS_ENABLE &&
                          listValue.activist_shorts === IS_DISABLE &&
                          listValue.voting === IS_ENABLE
                        ? history.push(`${pathConst.ADVISOR_ACTIVISM}${QUERY_COMPANY_ID}${listValue.company_id}`)
                        : listValue.activism === IS_ENABLE &&
                          listValue.activist_shorts === IS_DISABLE &&
                          listValue.voting === IS_DISABLE &&
                          history.push(`${pathConst.ADVISOR_ACTIVISM}${QUERY_COMPANY_ID}${listValue.company_id}`);

                      listValue.activism === IS_DISABLE &&
                        listValue.activist_shorts === IS_ENABLE &&
                        listValue.voting === IS_DISABLE &&
                        history.push(`${pathConst.ADVISOR_ACTIVISTSHORT}${QUERY_COMPANY_ID}${listValue.company_id}`);

                      listValue.activism === IS_DISABLE &&
                        listValue.activist_shorts === IS_DISABLE &&
                        listValue.voting === IS_ENABLE &&
                        history.push(`${pathConst.ADVISOR_VOTING_OVERVIEW}${QUERY_COMPANY_ID}${listValue.company_id}`);
                    }
                    if (type === SECTION_PEOPLE) {
                      history.push(`${pathConst.PEOPLE_OVERVIEW}${QUERY_DIRECTOR}${listValue.Director_id}`);
                    }
                  }}
                >
                  {type === SECTION_COMPANY && listValue.prev_names && (
                    <IWidget tooltipOverrideString={listValue.prev_names} />
                  )}{' '}
                  {type === SECTION_COMPANY && listValue.Company_name}
                  {type === SECTION_INVESTOR && listValue.investor_name}
                  {type === SECTION_ADVISOR && listValue.name}
                  {type === SECTION_PEOPLE && listValue.name}
                </span>
              </td>
              {/* Sub Head */}
              <td>
                {type === SECTION_COMPANY && listValue.Country_name}
                {type === SECTION_ADVISOR && listValue.type}
              </td>
              {/* Modules */}
              <td>
                {listValue.activism === isAvailable && (
                  <button
                    type='button'
                    className='btn btn-primary m-1'
                    onClick={(e) => {
                      e.preventDefault();
                      handleResetCompanyTitle();
                      /* company activism button */
                      if (type === SECTION_COMPANY) {
                        history.push(`${pathConst.ACTIVISM_OVERVIEW}${QUERY_PID}${listValue.PID}`);
                      }
                      /* Investor activism button */
                      if (type === SECTION_INVESTOR) {
                        history.push(
                          `${pathConst.INVESTOR_ACTIVISM_OVERVIEW}${QUERY_INVESTOR}${listValue.investor_id}`
                        );
                      }
                      /* advisor activism button */
                      if (type === SECTION_ADVISOR) {
                        history.push(
                          `${pathConst.ADVISOR_ACTIVISM_OVERVIEW}${QUERY_COMPANY_ID}${listValue.company_id}`
                        );
                      }
                    }}
                  >
                    Activism
                  </button>
                )}
                {listValue.activist_shorts === isAvailable && (
                  <button
                    type='button'
                    className='btn btn-primary m-1'
                    onClick={(e) => {
                      e.preventDefault();
                      handleResetCompanyTitle();
                      /* company activist Short button */
                      if (type === SECTION_COMPANY) {
                        history.push(`${pathConst.ACTIVISTSHORTS_OVERVIEW}${QUERY_PID}${listValue.PID}`);
                      }
                      /* investor activist Short button */
                      if (type === SECTION_INVESTOR) {
                        history.push(
                          `${pathConst.INVESTOR_ACTIVIST_SHORT_OVERVIEW}${QUERY_INVESTOR}${listValue.investor_id}`
                        );
                      }
                      /* advisor activist Short button */
                      if (type === SECTION_ADVISOR) {
                        history.push(`${pathConst.ADVISOR_ACTIVISTSHORT}${QUERY_COMPANY_ID}${listValue.company_id}`);
                      }
                    }}
                  >
                    Activist Shorts
                  </button>
                )}
                {listValue.voting === isAvailable && (
                  <button
                    type='button'
                    className='btn btn-primary m-1'
                    onClick={(e) => {
                      e.preventDefault();
                      handleResetCompanyTitle();
                      /* company Voting button */
                      if (type === SECTION_COMPANY) {
                        history.push(`${pathConst.VOTING_OVERVIEW}${QUERY_MEETING}${listValue.meeting_id}`);
                      }
                      /* investor Voting button */
                      if (type === SECTION_INVESTOR) {
                        history.push(`${pathConst.INVESTOR_VOTING_OVERVIEW}${QUERY_INVESTOR}${listValue.investor_id}`);
                      }
                      /* advisor Voting button */
                      if (type === SECTION_ADVISOR) {
                        history.push(`${pathConst.ADVISOR_VOTING_OVERVIEW}${QUERY_COMPANY_ID}${listValue.company_id}`);
                      }
                    }}
                  >
                    Voting
                  </button>
                )}
                {listValue.governance === isAvailable && (
                  <button
                    type='button'
                    className='btn btn-primary m-1'
                    onClick={(e) => {
                      e.preventDefault();
                      handleResetCompanyTitle();
                      /* company Governance button */
                      if (type === SECTION_COMPANY) {
                        history.push(`${pathConst.GOVERNANCE_OVERVIEW}${QUERY_PID}${listValue.PID}`);
                      }
                      /* people Governance button */
                      if (type === SECTION_PEOPLE) {
                        history.push(
                          `${pathConst.DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${listValue.Director_id}`
                        );
                      }
                    }}
                  >
                    Governance
                  </button>
                )}
                {listValue.vulnerability === isAvailable && (
                  <button
                    type='button'
                    className='btn btn-primary m-1'
                    onClick={(e) => {
                      e.preventDefault();
                      handleResetCompanyTitle();
                      history.push(`${pathConst.ACTIVIST_VULNERABILITY}${QUERY_PID}${listValue.PID}`);
                    }}
                  >
                    Vulnerability
                  </button>
                )}
                 {listValue.compensation === isAvailable && (
                      <button
                        type='button'
                        className='btn btn-primary m-1'
                        onClick={(e) => {
                          e.preventDefault();
                          handleResetCompanyTitle();
                          /* company Compensation button */
                        if (type === SECTION_COMPANY) {
                          history.push(`${pathConst.COMPANY_COMPENSATION_OVERVIEW}${QUERY_PID}${listValue.PID}`);
                        }
                        /* people Compensation button */
                        if (type === SECTION_PEOPLE) {
                          history.push(
                            `${pathConst.PEOPLE_COMPENSATION}${QUERY_DIRECTOR}${listValue.Director_id}`
                          );
                        }
                        }}
                      >
                        Compensation
                      </button>
                    )}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );

  useEffect(() => {
    handleResetBreadcrumbs(location.pathname);
  }, [location.pathname, handleResetBreadcrumbs]);

  return (
    <Page className={bem.b('')}>
      <ErrorBoundary>
        {isLoading ? (
          LOADING
        ) : (
          <>
            {searchCompanyRecordset !== undefined &&
            searchCompanyRecordset.length === numConst.EMPTY_TABLE_LENGTH &&
            searchInvestorDataRecordset !== undefined &&
            searchInvestorDataRecordset.length === numConst.EMPTY_TABLE_LENGTH &&
            searchAdvisorDataRecordset !== undefined &&
            searchAdvisorDataRecordset.length === numConst.EMPTY_TABLE_LENGTH &&
            searchPeopleDataRecordset !== undefined &&
            searchPeopleDataRecordset.length === numConst.EMPTY_TABLE_LENGTH &&
            searchedName !== undefined &&
            searchedName.length > 0 ? (
              NORECORDS
            ) : (
              <div className='cr-advisorsearch cr-universalsearch'>
                {/* Company */}
                {searchCompanyRecordset !== undefined &&
                  searchCompanyRecordset.length > 0 &&
                  searchResult('Company', 'Company HQ', searchCompanyRecordset, SECTION_COMPANY)}

                {/* Investor */}
                {searchInvestorDataRecordset !== undefined &&
                  searchInvestorDataRecordset.length > 0 &&
                  searchResult('Investor', '', searchInvestorDataRecordset, SECTION_INVESTOR)}

                {/* Advisor */}
                {searchAdvisorDataRecordset !== undefined &&
                  searchAdvisorDataRecordset.length > 0 &&
                  searchResult('Adviser', 'Type', searchAdvisorDataRecordset, SECTION_ADVISOR)}

                {/* People */}
                {searchPeopleDataRecordset !== undefined &&
                  searchPeopleDataRecordset.length > 0 &&
                  searchResult('People', '', searchPeopleDataRecordset, SECTION_PEOPLE)}
              </div>
            )}
          </>
        )}
      </ErrorBoundary>
    </Page>
  );
};

UniversalSearch.propTypes = {
  handleUniversalSearch: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetCompanyTitle: PropTypes.func,
  location: PropTypes.object,
  lstUniversalSearchData: PropTypes.array,
};

UniversalSearch.defaultProps = {
  handleUniversalSearch: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetCompanyTitle: () => {},
  location: {},
};

export default withRouter(React.memo(UniversalSearch));
