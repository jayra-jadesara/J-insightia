import PropTypes from 'prop-types';
import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import { getNoActionTrackInfoReq, handleResetAll } from './CompanyVotingSlice';
import VotingNoActionLetter from '../../components/Company/Voting/VotingNoActionLetter';
import { isIdNotNullOrUndefined, GetToolTip } from '../../utils/general-util';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import ProcedureConstant from '../../constants/ProcedureConstant';
import { getProcedureRunningEstimateTimeReq } from '../General/TitleSlice';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';

const VotingNoActionLetterContainer = ({
  location,
  children,
  getNoActionTrackInfoReq,
  noActionLettersList,
  loadingData,
  TrialStatus_VotingNoActionLetters,
  allowDownload,
  issuerCompanyProfile,
  procedureRunningEstimateTime,
  handleResetAll,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.meetingid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  const [toolTip, setToolTip] = useState(undefined);

  const callToolTip = useCallback(async () => {
    setToolTip(await GetToolTip(556));
  }, [setToolTip]);

  const getAll = async () => {
    if (query.meetingid) {
      callToolTip();
      await getProcedureRunningEstimateTimeReq(ProcedureConstant.NO_ACTION_LETTER_DATA);
      if (distinctProfile) {
        await getNoActionTrackInfoReq({
          index_id: '',
          start_date: null,
          end_date: null,
          proposal_type_top: '',
          proposal_type_sub: '',
          proposal_type: '',
          industry_id: '',
          proponent: '',
          Resolutions_Filter: null,
          meeting_id: TypeConstants.TRIAL_MEETINGID
        });
      } else {
        await getNoActionTrackInfoReq({
          index_id: '',
          start_date: null,
          end_date: null,
          proposal_type_top: '',
          proposal_type_sub: '',
          proposal_type: '',
          industry_id: '',
          proponent: '',
          Resolutions_Filter: null,
          meeting_id: query.meetingid
        });
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    handleResetAll();
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [query.meetingid, location.pathname, location.search, getNoActionTrackInfoReq, callToolTip, handleResetAll, distinctProfile]);

  return (
    <ErrorBoundary>
      <VotingNoActionLetter
        children={children}
        noActionLettersList={noActionLettersList}
        loadingData={loadingData}
        TrialStatus={TrialStatus_VotingNoActionLetters}
        allowDownload={allowDownload}
        issuerCompanyProfile={issuerCompanyProfile}
        toolTip={toolTip}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
      />
    </ErrorBoundary>
  );
};

VotingNoActionLetterContainer.propTypes = {
  TrialStatus_VotingNoActionLetters: PropTypes.any.isRequired,
  allowDownload: PropTypes.bool.isRequired,
  issuerCompanyProfile: PropTypes.any.isRequired,
  getNoActionTrackInfoReq: PropTypes.func.isRequired,
  loadingData: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  noActionLettersList: PropTypes.any.isRequired,
  children: PropTypes.any
};

VotingNoActionLetterContainer.defaultProps = {
  children: undefined
};
const selectIssuerCompanyProfile = (state) => state.companyVoting.issuerCompanyProfile;
const selectNoActionLettersList = (state) => state.companyVoting.noActionLettersList;
const selectLoadingData = (state) => state.companyVoting.loadingData;
const selectTrialStatus = (state) => state.companyVoting.TrialStatus_VotingNoActionLetters;
const selectAllowDownload = (state) => state.companyVoting.allowDownload;
const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  noActionLettersList: selectNoActionLettersList(state),
  loadingData: selectLoadingData(state),
  TrialStatus_VotingNoActionLetters: selectTrialStatus(state),
  allowDownload: selectAllowDownload(state),
  issuerCompanyProfile: selectIssuerCompanyProfile(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

const mapDispatchToProps = {
  getNoActionTrackInfoReq,
  handleResetAll
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VotingNoActionLetterContainer));
