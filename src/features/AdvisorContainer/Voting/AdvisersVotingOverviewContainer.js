import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import qs from 'qs';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import AdvisersVotingOverview from '../../../components/Advisers/Voting/AdvisersVotingOverview';
import { getIntermediaryDataReq } from '../AdvisersSlice';
import {
  getAdvisorVotingDetailInfoReq,
  getAdvisorVotingWindandInstrByYearReq,
  getLawFirmProposalTypesReq,
  clearDataNoaction,
  handleResetAll
} from './VotingNoActionSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const AdvisersVotingOverviewContainer = ({
  location,
  children,
  getIntermediaryDataReq,
  getAdvisorVotingDetailInfoReq,
  lstAdvisorVotingDetailInfo,
  getAdvisorVotingWindandInstrByYearReq,
  lstAdvisorVotingWindandInstrByYear,
  lstAdvisorVotingDetailInfoProponentTable,
  instructions,
  exclusionsApproved,
  proponentWithdrew,
  lstLawfrmYearData,
  lstLawYearsContacts,
  lstlawFirmProposalTypes,
  getLawFirmProposalTypesReq,
  isLoadingVotingNoAction,
  clearDataNoaction,
  handleResetAll,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.company_id)) {
    return <Redirect to={pathConst.ADVISOR_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetAll]);

  useEffect(() => {
    const abortController = new AbortController();
    if (query.company_id !== undefined && query.company_id !== 'undefined' && distinctProfile !== null) {
      let cmpId = query.company_id;
      if (distinctProfile) {
        cmpId = typeConst.TRIAL_ADVISERS_COMPANYID;
      }
      clearDataNoaction();
      getAdvisorVotingWindandInstrByYearReq(cmpId);
      getIntermediaryDataReq(cmpId).then((e) => {
        if (e.payload.length > 0) {
          const data = {
            intermediaryId: e.payload[0].intermediary_id,
            companyid: cmpId
          };
          getAdvisorVotingDetailInfoReq(data);
        }
      });
      // prepare pie chart date
      getLawFirmProposalTypesReq(cmpId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [
    distinctProfile,
    getLawFirmProposalTypesReq,
    query.company_id,
    getIntermediaryDataReq,
    getAdvisorVotingDetailInfoReq,
    getAdvisorVotingWindandInstrByYearReq
  ]);

  return (
    <ErrorBoundary>
      <AdvisersVotingOverview
        children={children}
        instructions={instructions}
        exclusionsApproved={exclusionsApproved}
        proponentWithdrew={proponentWithdrew}
        lstLawfrmYearData={lstLawfrmYearData}
        lstLawYearsContacts={lstLawYearsContacts}
        lstAdvisorVotingDetailInfoProponentTable={
          lstAdvisorVotingDetailInfoProponentTable
        }
        lstlawFirmProposalTypes={lstlawFirmProposalTypes}
        isLoadingVotingNoAction={isLoadingVotingNoAction}
        lstAdvisorVotingDetailInfo_Table_1={lstAdvisorVotingDetailInfo[1]}
        lstAdvisorVotingDetailInfo_LawyerInfo={lstAdvisorVotingDetailInfo[2]}
        lstAdvisorVotingWindandInstrByYear={lstAdvisorVotingWindandInstrByYear}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

AdvisersVotingOverviewContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  instructions: PropTypes.number,
  exclusionsApproved: PropTypes.any,
  proponentWithdrew: PropTypes.any,
  lstAdvisorVotingWindandInstrByYear: PropTypes.array,
  lstLawfrmYearData: PropTypes.array,
  lstLawYearsContacts: PropTypes.array,
  lstAdvisorVotingDetailInfoProponentTable: PropTypes.array
};

AdvisersVotingOverviewContainer.defaultProps = {
  location: {},
  instructions: 0,
  exclusionsApproved: 0,
  proponentWithdrew: 0,
  lstAdvisorVotingWindandInstrByYear: [],
  lstLawfrmYearData: [],
  lstLawYearsContacts: [],
  lstAdvisorVotingDetailInfoProponentTable: []
};

// voting no action slice
const selectInstructions = (state) => state.advisorVotingNoAction.instructions;
const selectExclusionsApproved = (state) =>
  state.advisorVotingNoAction.exclusionsApproved;
const selectProponentWithdrew = (state) =>
  state.advisorVotingNoAction.proponentWithdrew;
const selectLstAdvisorVotingWindandInstrByYear = (state) =>
  state.advisorVotingNoAction.lstAdvisorVotingWindandInstrByYear;
const selectLstLawfrmYearData = (state) =>
  state.advisorVotingNoAction.lstLawfrmYearData;
const selectLstLawYearsContacts = (state) =>
  state.advisorVotingNoAction.lstLawYearsContacts;
const selectLstAdvisorVotingDetailInfo_ProponentTable = (state) =>
  state.advisorVotingNoAction.lstAdvisorVotingDetailInfoProponentTable;
const selectLstlawFirmProposalTypes = (state) =>
  state.advisorVotingNoAction.lstlawFirmProposalTypes;
const selectIsLoadingVotingNoAction = (state) =>
  state.advisorVotingNoAction.isLoadingVotingNoAction;

const selectLstAdvisorVotingDetailInfo = (state) =>
  state.advisers.lstAdvisorVotingDetailInfo;
const selectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  // voting no action slice
  instructions: selectInstructions(state),
  exclusionsApproved: selectExclusionsApproved(state),
  proponentWithdrew: selectProponentWithdrew(state),
  lstAdvisorVotingWindandInstrByYear:
    selectLstAdvisorVotingWindandInstrByYear(state),
  lstLawfrmYearData: selectLstLawfrmYearData(state),
  lstLawYearsContacts: selectLstLawYearsContacts(state),
  lstAdvisorVotingDetailInfoProponentTable:
    selectLstAdvisorVotingDetailInfo_ProponentTable(state),
  lstlawFirmProposalTypes: selectLstlawFirmProposalTypes(state),
  isLoadingVotingNoAction: selectIsLoadingVotingNoAction(state),

  lstAdvisorVotingDetailInfo: selectLstAdvisorVotingDetailInfo(state),
  procedureRunningEstimateTime: selectProcedureRunningEstimateTime(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state)
});
const mapDispatchToProps = {
  getIntermediaryDataReq,
  getAdvisorVotingDetailInfoReq,
  getAdvisorVotingWindandInstrByYearReq,
  getLawFirmProposalTypesReq,
  clearDataNoaction,
  handleResetAll
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvisersVotingOverviewContainer)
);
