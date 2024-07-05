import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  getAIG_ShareholderProposals_v2Req,
  handleVisitorLog,
  getTokenDecode,
  GetTrialOrActualTop20ListReq,
  handleResetGovernanceShareholders
} from './CompanySlice';
import ShareholderProposal from '../../components/Company/Governance/ShareholderProposal';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const ShareholderProposalContainer = ({
  location,
  children,
  getAIG_ShareholderProposals_v2Req,
  shareholderProposal,
  TokenDecode,
  TrialLog,
  allowDownload,
  handleResetGovernanceShareholders,
  isLoadingData,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    handleResetGovernanceShareholders();
    if (query.pid !== undefined) {
      if (distinctProfile) {
        getAIG_ShareholderProposals_v2Req(TypeConstants.TRIAL_PID);
      } else {
        getAIG_ShareholderProposals_v2Req(query.pid);
      }
    }
  }, [query.pid, getAIG_ShareholderProposals_v2Req, handleResetGovernanceShareholders, distinctProfile]);

  return (
    <ErrorBoundary>
      <ShareholderProposal
        location={location}
        children={children}
        shareholderProposalData={shareholderProposal}
        TokenDecode={TokenDecode}
        TrialLog={TrialLog}
        allowDownload={allowDownload}
        isLoadingData={isLoadingData}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
      />
    </ErrorBoundary>
  );
};

ShareholderProposalContainer.propTypes = {
  GetTrialOrActualTop20ListReq: PropTypes.func,
  HandleTrialLog: PropTypes.func,
  TokenDecode: PropTypes.any,
  TrialLog: PropTypes.any,
  allowDownload: PropTypes.bool,
  children: PropTypes.any,
  getAIG_ShareholderProposals_v2Req: PropTypes.func,
  getTokenDecode: PropTypes.func,
  handleResetGovernanceShareholders: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  location: PropTypes.any,
  shareholderProposal: PropTypes.array,
  isLoadingData: PropTypes.any
};

ShareholderProposalContainer.defaultProps = {
  GetTrialOrActualTop20ListReq: () => {},
  HandleTrialLog: () => {},
  allowDownload: false,
  getAIG_ShareholderProposals_v2Req: () => {},
  getTokenDecode: () => {},
  handleResetGovernanceShareholders: () => {},
  handleVisitorLog: () => {},
  shareholderProposal: [],
  isLoadingData: undefined
};

const SelectDecodeToken = (state) => state.company.getTokenDecode;
const SelectTrialLog = (state) => state.company.TrialLog_activistShort;

const selectShareholderProposals = (state) => state.company.shareholderProposal;
const selectisLoadingData = (state) => state.company.isLoadingData;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  TokenDecode: SelectDecodeToken(state),
  GetTrialOrActualTop20ListReq: SelectTrialLog(state),
  shareholderProposal: selectShareholderProposals(state),
  isLoadingData: selectisLoadingData(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});

const mapDispatchToProps = {
  handleVisitorLog,
  GetTrialOrActualTop20ListReq,
  getTokenDecode,
  getAIG_ShareholderProposals_v2Req,
  handleResetGovernanceShareholders
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShareholderProposalContainer));
