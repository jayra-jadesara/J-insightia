import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  handleVisitorLog,
  getTokenDecode,
  GetTrialOrActualTop20ListReq,
  getCompFillingTypeReq,
  getCompStatementReq,
  getComplianceComparisonIndexesReq,
  handleResetGovernanceCompliance,
  getComplianceVotinDissentReq
} from './CompanySlice';
import Compliance from '../../components/Company/Governance/Compliance';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';
import { handleSetDDLComparision, getBoardAndDirectorsIndexDDLReq } from './Governance/GovernanceOverviewSlice';

const ComplianceContainer = ({
  location,
  children,
  TokenDecode,
  TrialLog,
  allowDownload,
  getCompFillingTypeReq,
  getCompStatementReq,
  getComplianceComparisonIndexesReq,
  complianceFillingType,
  complianceStatement,
  complianceComparisonIndexes,
  handleResetGovernanceCompliance,
  getComplianceVotinDissentReq,
  complianceDissent,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur,
  ddlComparision,
  selection_ddlComparision,
  handleSetDDLComparision,
  getBoardAndDirectorsIndexDDLReq
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [received, setReceived] = useState(false);

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function getData() {
      handleResetGovernanceCompliance();
      if (query.pid !== undefined) {
        if (distinctProfile) {
          await getComplianceVotinDissentReq(TypeConstants.TRIAL_COMPLIANCE_PID);
          await getCompFillingTypeReq(TypeConstants.TRIAL_COMPLIANCE_PID);
          await getCompStatementReq(TypeConstants.TRIAL_COMPLIANCE_PID);
          await getComplianceComparisonIndexesReq(TypeConstants.TRIAL_COMPLIANCE_PID);
          await getBoardAndDirectorsIndexDDLReq({ pid: TypeConstants.TRIAL_COMPLIANCE_PID });
          await setReceived(true);
        } else {
          await getComplianceVotinDissentReq(query.pid);
          await getCompFillingTypeReq(query.pid);
          await getCompStatementReq(query.pid);
          await getComplianceComparisonIndexesReq(query.pid);
          await getBoardAndDirectorsIndexDDLReq({ pid: query.pid });
          await setReceived(true);
        }
      }
    }
    getData();
    return function cleanup() {
      abortController.abort();
    };
  }, [
    query.pid,
    getCompFillingTypeReq,
    getCompStatementReq,
    getComplianceComparisonIndexesReq,
    getComplianceVotinDissentReq,
    handleResetGovernanceCompliance,
    setReceived,
    distinctProfile
  ]);

  return (
    <ErrorBoundary>
    <Compliance
      children={children}
      location={location}
      TokenDecode={TokenDecode}
      TrialLog={TrialLog}
      allowDownload={allowDownload}
      complianceFillingType={complianceFillingType}
      complianceStatement={complianceStatement}
      complianceComparisonIndexes={complianceComparisonIndexes}
      complianceDissent={complianceDissent}
      received={received}
      TrialUserDisableDownload={trialUserDisableDownload}
      TrialUser={trialUserBlur}
      ddlComparision={ddlComparision}
      selection_ddlComparision={selection_ddlComparision}
      handleSetDDLComparision={handleSetDDLComparision}
    />
    </ErrorBoundary>
  );
};

ComplianceContainer.propTypes = {
  GetTrialOrActualTop20ListReq: PropTypes.func,
  HandleTrialLog: PropTypes.any,
  TokenDecode: PropTypes.any,
  TrialLog: PropTypes.any,
  allowDownload: PropTypes.bool,
  children: PropTypes.any,
  complianceComparisonIndexes: PropTypes.any,
  complianceDissent: PropTypes.any,
  complianceFillingType: PropTypes.any,
  complianceStatement: PropTypes.any,
  getCompFillingTypeReq: PropTypes.func,
  getCompStatementReq: PropTypes.func,
  getComplianceComparisonIndexesReq: PropTypes.func,
  getComplianceVotinDissentReq: PropTypes.func,
  getTokenDecode: PropTypes.func,
  handleResetGovernanceCompliance: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  location: PropTypes.any
};

ComplianceContainer.defaultProps = {
  GetTrialOrActualTop20ListReq: () => {},
  allowDownload: false,
  getCompFillingTypeReq: () => {},
  getCompStatementReq: () => {},
  getComplianceComparisonIndexesReq: () => {},
  getComplianceVotinDissentReq: () => {},
  getTokenDecode: () => {},
  handleResetGovernanceCompliance: () => {},
  handleVisitorLog: () => {}
};

const SelectDecodeToken = (state) => state.company.getTokenDecode;
const SelectTrialLog = (state) => state.company.TrialLog_governance;

const SelectComplianceFillingType = (state) => state.company.complianceFillingType;
const SelectComplianceStatement = (state) => state.company.complianceStatement;
const SelectComplianceComparisonIndexes = (state) => state.company.complianceComparisonIndexes;
const SelectComplianceDissent = (state) => state.company.complianceDissent;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const Select_selection_ddlComparision = (state) =>
  state.companyGovernanceOverview.selection_ddlComparision;
const Select_ddlComparision = (state) =>
  state.companyGovernanceOverview.ddlComparision;

const mapStateToProps = (state) => ({
  TokenDecode: SelectDecodeToken(state),
  GetTrialOrActualTop20ListReq: SelectTrialLog(state),
  complianceFillingType: SelectComplianceFillingType(state),
  complianceStatement: SelectComplianceStatement(state),
  complianceComparisonIndexes: SelectComplianceComparisonIndexes(state),
  complianceDissent: SelectComplianceDissent(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
  selection_ddlComparision: Select_selection_ddlComparision(state),
  ddlComparision: Select_ddlComparision(state),
});

const mapDispatchToProps = {
  handleVisitorLog,
  GetTrialOrActualTop20ListReq,
  getTokenDecode,
  getCompFillingTypeReq,
  getCompStatementReq,
  getComplianceComparisonIndexesReq,
  handleResetGovernanceCompliance,
  getComplianceVotinDissentReq,
  handleSetDDLComparision,
  getBoardAndDirectorsIndexDDLReq
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComplianceContainer));
