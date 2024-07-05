import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Page from '../../Page';
import pathConst, { QUERY_DIRECTOR } from '../../../constants/PathsConstant';
import { NORECORDS, LOADING } from '../../../constants/MessageConstans';
import { history } from '../../../utils/navigation-util';
import '../../styles/components/_popupTrialUser.scss';
import numConst from '../../../constants/NumberConstants';
import QuickSearchOptions from '../../GeneralForm/QuickSearchOptions';

const PeopleSearch = ({
  location,
  handlePeopleSearch,
  lstPeopldata,
  handleResetCompanyTitle,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  handleVisitorLog,
  handleResetSearch,
}) => {
  const [searchformVal, setSarchFormVal] = useState({
    nameSearch: '',
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
    if (searchformVal.nameSearch.length < 3) {
      setIsLoading(false);
      return false;
    }
    const data = {
      name_search: searchformVal.nameSearch,
      quicksearch: 0,
    };
    handleResetSearch();
    setIsLoading(true);
    await handlePeopleSearch(data);
    setIsLoading(false);
    setIsSearched(true);
  };

  useEffect(() => {
    handleResetBreadcrumbs(location.pathname);
  }, [location.pathname, handleResetBreadcrumbs]);

  return (
    <Page key={1}>
      <div className='mt-3'>
        <form className='cr-search-form form-inline col-lg-6 col-md-12 ' onSubmit={formSubmit}>
          <i className='bi bi-search cr-search-form__icon-search' style={{ width: '1em', height: '1em' }} />
          <input
            type='search'
            minLength='3'
            maxLength='30'
            name='nameSearch'
            className='cr-search-form__input form-control'
            onChange={inputEvent}
            placeholder='Search...'
            autoComplete='off'
          />
        </form>
        <QuickSearchOptions
          InputName='nameSearch'
          getQuickSearchReq={handlePeopleSearch}
          handleReset={handleResetSearch}
          setIsLoading={setIsLoading}
        />
      </div>

      {isLoading && LOADING}

      {lstPeopldata !== undefined && lstPeopldata.length > 0 && (
        <div className='cr-advisorsearch'>
          <table className='table mt-3 searchtable'>
            <thead>
              <tr>
                <th>Person</th>
                <th>Module</th>
              </tr>
            </thead>
            <tbody>
              {lstPeopldata.map((listValue, index) => (
                <tr key={`listValue${index + 1}`}>
                  <td>
                    <span
                      className='btn btn-link'
                      aria-hidden='true'
                      onClick={(e) => {
                        e.preventDefault();
                        handleResetCompanyTitle();
                        handleResetBreadcrumbs(pathConst.PEOPLE_OVERVIEW);
                        handleResetCompanyPath(pathConst.PEOPLE_OVERVIEW);
                        handleVisitorLog(pathConst.PEOPLE_OVERVIEW, `${QUERY_DIRECTOR}${listValue.Director_id}`);
                        history.push(`${pathConst.PEOPLE_OVERVIEW}${QUERY_DIRECTOR}${listValue.Director_id}`);
                      }}
                    >
                      {listValue.name}
                    </span>
                  </td>
                  <td>
                    {listValue.governance === numConst.NUMBER_ONE && (
                      <button
                        type='button'
                        className='btn btn-primary m-1'
                        onClick={(e) => {
                          e.preventDefault();
                          handleResetCompanyTitle();
                          handleResetBreadcrumbs(pathConst.DIRECTORSHIP_AND_EXECUTIVE);
                          handleResetCompanyPath(pathConst.DIRECTORSHIP_AND_EXECUTIVE);
                          handleVisitorLog(
                            pathConst.DIRECTORSHIP_AND_EXECUTIVE,
                            `${QUERY_DIRECTOR}${listValue.Director_id}`
                          );
                          history.push(
                            `${pathConst.DIRECTORSHIP_AND_EXECUTIVE}${QUERY_DIRECTOR}${listValue.Director_id}`
                          );
                        }}
                      >
                        Governance
                      </button>
                    )}
                    {listValue.compensation === numConst.NUMBER_ONE && (
                      <button
                        type='button'
                        className='btn btn-primary m-1'
                        onClick={(e) => {
                          e.preventDefault();
                          handleResetCompanyTitle();
                          handleResetBreadcrumbs(pathConst.PEOPLE_COMPENSATION);
                          handleResetCompanyPath(pathConst.PEOPLE_COMPENSATION);
                          handleVisitorLog(pathConst.PEOPLE_COMPENSATION, `${QUERY_DIRECTOR}${listValue.Director_id}`);
                          history.push(`${pathConst.PEOPLE_COMPENSATION}${QUERY_DIRECTOR}${listValue.Director_id}`);
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
        (lstPeopldata === undefined ||
          lstPeopldata.length === numConst.EMPTY_TABLE_LENGTH) &&
        NORECORDS}
    </Page>
  );
};

PeopleSearch.propTypes = {
  handlePeopleSearch: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetCompanyTitle: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  location: PropTypes.object,
  lstPeopldata: PropTypes.object,
};

PeopleSearch.defaultProps = {
  handlePeopleSearch: () => {},
  handleResetBreadcrumbs: () => {},
  handleResetCompanyPath: () => {},
  handleResetCompanyTitle: () => {},
  handleVisitorLog: () => {},
  location: {},
  lstPeopldata: undefined
};

export default withRouter(React.memo(PeopleSearch));
