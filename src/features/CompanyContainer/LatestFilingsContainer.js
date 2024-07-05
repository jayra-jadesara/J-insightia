import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  handleVisitorLog,
  getTokenDecode,
  GetTrialOrActualTop20ListReq,
  getGovCompanyDirector503Req,
  getCompanyDirector502_v2Req,
  getCompanyDirector507_v2Req,
  getCompanyDirectorshort_v2Req,
  getCompanyDirector10k_v2Req,
  handleResetGovernanceLatestFiling
} from './CompanySlice';
import LatestFilings from '../../components/Company/Governance/LatestFilings';
// import qs from "qs";
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const LatestFilingsContainer = ({
  location,
  children,
  TokenDecode,
  TrialLog,
  allowDownload,
  getGovCompanyDirector503Req,
  getCompanyDirector502_v2Req,
  getCompanyDirector507_v2Req,
  getCompanyDirectorshort_v2Req,
  getCompanyDirector10k_v2Req,
  companyDirector503,
  companyDirector502,
  companyDirector507,
  proxyStatements,
  director10k,
  handleResetGovernanceLatestFiling,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    handleResetGovernanceLatestFiling();
    if (query.pid !== undefined) {
      if (distinctProfile) {
        getGovCompanyDirector503Req(TypeConstants.TRIAL_PID);
        getCompanyDirector502_v2Req(TypeConstants.TRIAL_PID);
        getCompanyDirector507_v2Req(TypeConstants.TRIAL_PID);
        getCompanyDirectorshort_v2Req(TypeConstants.TRIAL_PID);
        getCompanyDirector10k_v2Req(TypeConstants.TRIAL_PID);
      } else {
        getGovCompanyDirector503Req(query.pid);
        getCompanyDirector502_v2Req(query.pid);
        getCompanyDirector507_v2Req(query.pid);
        getCompanyDirectorshort_v2Req(query.pid);
        getCompanyDirector10k_v2Req(query.pid);
      }
    }
  }, [
    query.pid,
    getGovCompanyDirector503Req,
    getCompanyDirector502_v2Req,
    getCompanyDirector507_v2Req,
    getCompanyDirectorshort_v2Req,
    getCompanyDirector10k_v2Req,
    handleResetGovernanceLatestFiling,
    distinctProfile
  ]);

  return (
    <ErrorBoundary>
    <LatestFilings
      location={location}
      children={children}
      TokenDecode={TokenDecode}
      TrialLog={TrialLog}
      allowDownload={allowDownload}
      companyDirector503={companyDirector503}
      companyDirector502={companyDirector502}
      companyDirector507={companyDirector507}
      proxyStatements={proxyStatements}
      director10k={director10k}
      TrialUserDisableDownload={trialUserDisableDownload}
      TrialUser={trialUserBlur}
    />
    </ErrorBoundary>
  );
};

LatestFilingsContainer.propTypes = {
  GetTrialOrActualTop20ListReq: PropTypes.func,
  HandleTrialLog: PropTypes.func,
  TokenDecode: PropTypes.any,
  TrialLog: PropTypes.any,
  allowDownload: PropTypes.bool,
  children: PropTypes.any,
  companyDirector502: PropTypes.any,
  companyDirector503: PropTypes.any,
  companyDirector507: PropTypes.any,
  director10k: PropTypes.any,
  getCompanyDirector10k_v2Req: PropTypes.func,
  getCompanyDirector502_v2Req: PropTypes.func,
  getCompanyDirector507_v2Req: PropTypes.func,
  getCompanyDirectorshort_v2Req: PropTypes.func,
  getGovCompanyDirector503Req: PropTypes.func,
  getTokenDecode: PropTypes.any,
  handleResetGovernanceLatestFiling: PropTypes.func,
  handleVisitorLog: PropTypes.any,
  location: PropTypes.any,
  proxyStatements: PropTypes.any
};

LatestFilingsContainer.defaultProps = {
  GetTrialOrActualTop20ListReq: () => {},
  HandleTrialLog: () => {},
  allowDownload: false,
  getCompanyDirector10k_v2Req: () => {},
  getCompanyDirector502_v2Req: () => {},
  getCompanyDirector507_v2Req: () => {},
  getCompanyDirectorshort_v2Req: () => {},
  getGovCompanyDirector503Req: () => {},
  handleResetGovernanceLatestFiling: () => {}
};

const SelectDecodeToken = (state) => state.company.getTokenDecode;
const SelectTrialLog = (state) => state.company.TrialLog_activistShort;

const SelectCompanyDirector503 = (state) => state.company.companyDirector503;
const SelectCompanyDirector502 = (state) => state.company.companyDirector502;
const SelectCompanyDirector507 = (state) => state.company.companyDirector507;
const SelectProxyStatement = (state) => state.company.proxyStatements;
const SelectDirector10k = (state) => state.company.director10k;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  TokenDecode: SelectDecodeToken(state),
  GetTrialOrActualTop20ListReq: SelectTrialLog(state),
  companyDirector503: SelectCompanyDirector503(state),
  companyDirector502: SelectCompanyDirector502(state),
  companyDirector507: SelectCompanyDirector507(state),
  proxyStatements: SelectProxyStatement(state),
  director10k: SelectDirector10k(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

const mapDispatchToProps = {
  handleVisitorLog,
  GetTrialOrActualTop20ListReq,
  getTokenDecode,
  getGovCompanyDirector503Req,
  getCompanyDirector502_v2Req,
  getCompanyDirector507_v2Req,
  getCompanyDirectorshort_v2Req,
  getCompanyDirector10k_v2Req,
  handleResetGovernanceLatestFiling
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LatestFilingsContainer));
