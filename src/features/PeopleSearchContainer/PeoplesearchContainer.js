import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PeopleSearch from '../../components/PeopleSearch/General/PeopleSearch';
import { peopleSearchFormReq, getPeopleProfileReq, handleResetSearch } from './PeoplesearchSlice';
import { handleResetBreadcrumbs, handleResetCompanyPath, handleResetCompanyTitle } from '../General/TitleSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const PeoplesearchContainer = ({ lstPeopldata, handlePeopleSearch, handleResetSearch, handleResetCompanyTitle, handleResetCompanyPath, handleResetBreadcrumbs }) => {
  useEffect(() => {
    handleResetSearch();
  }, [handleResetSearch]);

  return (
    <ErrorBoundary>
    <PeopleSearch
      handlePeopleSearch={handlePeopleSearch}
      lstPeopldata={lstPeopldata}
      handleResetCompanyPath={handleResetCompanyPath}
      handleResetBreadcrumbs={handleResetBreadcrumbs}
      handleResetCompanyTitle={handleResetCompanyTitle}
      handleResetSearch={handleResetSearch}
    />
    </ErrorBoundary>

  );
};

PeoplesearchContainer.propTypes = {
  lstPeopldata: PropTypes.any,
  handlePeopleSearch: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleResetBreadcrumbs: PropTypes.func
};

PeoplesearchContainer.defaultProps = {
  handlePeopleSearch: () => {},
  handleResetCompanyPath: () => {},
  handleResetBreadcrumbs: () => {},
  lstPeopldata: undefined
};

const selectLstPropledata = (state) => state.Peoplesearch.lstPeopldata;

const mapStateToProps = (state) => ({
  lstPeopldata: selectLstPropledata(state)
});
const mapDispatchToProps = {
  handlePeopleSearch: peopleSearchFormReq,
  handlePeopleProfile: getPeopleProfileReq,
  handleResetCompanyPath,
  handleResetBreadcrumbs,
  handleResetSearch,
  handleResetCompanyTitle
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PeoplesearchContainer));
