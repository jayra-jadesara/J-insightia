import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { connect } from 'react-redux';
import UniversalSearch from '../../components/UniversalSearch/UniversalSearch';
import {
  univarsalCompanysearchFormReq,
  univarsalInvestorsearchFormReq,
  univarsalAdvisorsearchFormReq,
  univarsalPeopleSearchFormReq_V2
} from '../LayoutContainer/HeaderSlice';
import {
  handleResetCompanyTitle,
  handleResetBreadcrumbs,
  handleResetCompanyPath
} from '../General/TitleSlice';
import propTypes from '../../utils/propTypes';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const UniversalSearchContainer = ({
  handleResetCompanyTitle,
  handleVisitorLog,
  handleResetBreadcrumbs,
  handleResetCompanyPath,
  searchCompanyRecordset,
  searchInvestorDataRecordset,
  searchAdvisorDataRecordset,
  searchPeopleDataRecordset,
  searchedName,
  isLoading,
  univarsalCompanysearchFormReq,
  univarsalInvestorsearchFormReq,
  univarsalAdvisorsearchFormReq,
  univarsalPeopleSearchFormReq_V2,
  location
}) => {
  const userDetails = { userEmail: window.localStorage.getItem('userEmail') };
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    if (query.search) {
      univarsalCompanysearchFormReq(query.search);
      univarsalInvestorsearchFormReq(query.search);
      univarsalAdvisorsearchFormReq(query.search);
      univarsalPeopleSearchFormReq_V2(query.search);
    }
  }, [
    query.search,
    univarsalAdvisorsearchFormReq,
    univarsalCompanysearchFormReq,
    univarsalInvestorsearchFormReq,
    univarsalPeopleSearchFormReq_V2
  ]);

  return (
    <ErrorBoundary>
      <UniversalSearch
        userDetails={userDetails}
        searchCompanyRecordset={searchCompanyRecordset}
        searchInvestorDataRecordset={searchInvestorDataRecordset}
        searchAdvisorDataRecordset={searchAdvisorDataRecordset}
        searchPeopleDataRecordset={searchPeopleDataRecordset}
        searchedName={searchedName}
        isLoading={isLoading}
        handleVisitorLog={handleVisitorLog}
        handleResetBreadcrumbs={handleResetBreadcrumbs}
        handleResetCompanyPath={handleResetCompanyPath}
        handleResetCompanyTitle={handleResetCompanyTitle}
      />
    </ErrorBoundary>
  );
};

UniversalSearchContainer.propTypes = {
  handleResetBreadcrumbs: PropTypes.func,
  handleResetCompanyPath: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  handleResetCompanyTitle: propTypes.func
};

UniversalSearchContainer.defaultProps = {
  handleResetBreadcrumbs: () => {},
  handleVisitorLog: () => {},
  handleResetCompanyTitle: () => {}
};

const SelectSearchCompanyRecordset = (state) =>
  state.header.searchCompanyRecordset;
const SelectSearchInvestorDataRecordset = (state) =>
  state.header.searchInvestorDataRecordset;
const SelectSearchAdvisorDataRecordset = (state) =>
  state.header.searchAdvisorDataRecordset;
const SelectSearchPeopleDataRecordset = (state) =>
  state.header.searchPeopleDataRecordset;
const SelectIsLoading = (state) => state.header.isLoading;
const SelectSearchedName = (state) => state.header.searchedName;

const mapStateToProps = (state) => ({
  searchCompanyRecordset: SelectSearchCompanyRecordset(state),
  searchInvestorDataRecordset: SelectSearchInvestorDataRecordset(state),
  searchAdvisorDataRecordset: SelectSearchAdvisorDataRecordset(state),
  searchPeopleDataRecordset: SelectSearchPeopleDataRecordset(state),
  isLoading: SelectIsLoading(state),
  searchedName: SelectSearchedName(state)
});

const mapDispatchToProps = {
  univarsalCompanysearchFormReq,
  univarsalInvestorsearchFormReq,
  univarsalAdvisorsearchFormReq,
  univarsalPeopleSearchFormReq_V2,
  handleResetCompanyTitle,
  handleResetBreadcrumbs,
  handleResetCompanyPath
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UniversalSearchContainer);
