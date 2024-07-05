import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import PoisonPill from '../../components/Company/Governance/PoisonPill';
import {
  getDetPoisonPillReq,
  getItem303MaterialReq,
  getDetPoisonPillTopHdrReq,
  handleVisitorLog,
  getTokenDecode,
  GetTrialOrActualTop20ListReq,
  handleResetPoisonPill
} from './CompanySlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const PoisonPillContainer = ({
  location,
  children,
  getDetPoisonPillReq,
  getItem303MaterialReq,
  TokenDecode,
  poisonPill,
  item303,
  poisonPillHeader,
  TrialLog,
  allowDownload,
  getDetPoisonPillTopHdrReq,
  handleResetPoisonPill,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    handleResetPoisonPill();
    if (query.pid !== undefined) {
      if (distinctProfile) {
        getDetPoisonPillReq(TypeConstants.TRIAL_PID);
        getDetPoisonPillTopHdrReq(TypeConstants.TRIAL_PID);
        getItem303MaterialReq(TypeConstants.TRIAL_PID);
      } else {
        getDetPoisonPillReq(query.pid);
        getDetPoisonPillTopHdrReq(query.pid);
        getItem303MaterialReq(query.pid);
      }
    }
  }, [query.pid, getDetPoisonPillReq, getItem303MaterialReq, getDetPoisonPillTopHdrReq, handleResetPoisonPill, distinctProfile]);

  return (
    <ErrorBoundary>
      <PoisonPill
        location={location}
        children={children}
        TokenDecode={TokenDecode}
        TrialLog={TrialLog}
        allowDownload={allowDownload}
        poisonPill={poisonPill}
        poisonPillHeader={poisonPillHeader}
        item303={item303}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
      />
    </ErrorBoundary>
  );
};

PoisonPillContainer.propTypes = {
  GetTrialOrActualTop20ListReq: PropTypes.any,
  HandleTrialLog: PropTypes.any,
  TokenDecode: PropTypes.any,
  TrialLog: PropTypes.any,
  allowDownload: PropTypes.bool,
  children: PropTypes.any,
  getDetPoisonPillReq: PropTypes.func,
  getDetPoisonPillTopHdrReq: PropTypes.func,
  getItem303MaterialReq: PropTypes.func,
  getTokenDecode: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  item303: PropTypes.any,
  location: PropTypes.any,
  poisonPill: PropTypes.any,
  poisonPillHeader: PropTypes.any
};

PoisonPillContainer.defaultProps = {
  allowDownload: false,
  getDetPoisonPillReq: () => {},
  getDetPoisonPillTopHdrReq: () => {},
  getItem303MaterialReq: () => {},
  getTokenDecode: () => {},
  handleVisitorLog: () => {}
};
const SelectDecodeToken = (state) => state.company.getTokenDecode;
const SelectTrialLog = (state) => state.company.TrialLog_governance;

const selectPoisonPill = (state) => state.company.poisonPill;
const selectPoisonPillHeader = (state) => state.company.poisonPillHeader;

const selectItem303 = (state) => state.company.item303;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  TokenDecode: SelectDecodeToken(state),
  GetTrialOrActualTop20ListReq: SelectTrialLog(state),
  poisonPill: selectPoisonPill(state),
  poisonPillHeader: selectPoisonPillHeader(state),
  item303: selectItem303(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

const mapDispatchToProps = {
  handleVisitorLog,
  GetTrialOrActualTop20ListReq,
  getTokenDecode,
  getDetPoisonPillReq,
  getItem303MaterialReq,
  getDetPoisonPillTopHdrReq,
  handleResetPoisonPill
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PoisonPillContainer)
);
