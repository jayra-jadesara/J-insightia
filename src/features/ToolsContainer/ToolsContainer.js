// THIS COMMENTED CODE BRINGS THE PROPS ON TOOLS CONTAINER
// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import Tools from "../../components/Tools/tools";
// import { getTokenDecode } from "../../features/CompanyContainer/CompanySlice";
// import { handleResetLoading, getPerformanceOverviewV2Req } from "../ToolsContainer/ToolsSlice";

// const ToolsContainer = ({ getTokenDecode, token, handleResetLoading, getPerformanceOverviewV2Req, GetPerformanceOverviewV2 }) => {
//   useEffect(() => {
//     getTokenDecode();
//     getPerformanceOverviewV2Req();
//   }, [getTokenDecode, getPerformanceOverviewV2Req]);

//   return <Tools token={token.MemberShip} handleResetLoading={handleResetLoading} GetPerformanceOverviewV2={GetPerformanceOverviewV2}/>;
// };

// const SelectDecodeToken = (state) => state.company.getTokenDecode;
// const SelectGetPerformanceOverviewV2 = (state) => {
//   if (state.tools.rowData_getPerformanceOverviewV2 !== undefined)
//     return state.rowData_getPerformanceOverviewV2;
//   return [];
// };

// const mapStateToProps = (state) => ({
//   token: SelectDecodeToken(state),
//   GetPerformanceOverviewV2: SelectGetPerformanceOverviewV2(state),
// });

// const mapDispatchToProps = { getTokenDecode: getTokenDecode, handleResetLoading, getPerformanceOverviewV2Req };

// export default connect(mapStateToProps, mapDispatchToProps)(ToolsContainer);

//

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Tools from '../../components/Tools/tools';
import { handleResetLoading, handleButtonAccess, handleResolutionFilter, getTokenDecode } from './ToolsSlice';
import { handleResetLoader } from '../General/TitleSlice';
import { handleGlobleResetNotifiedShortPosition } from './ShortActivism/NotifiedShortPositionDataSlice';
import { handleResetShortCampaignDataAndAnalyticsTool } from './ShortActivism/ShortCampaignDataandAnalyticsToolSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { handleResetDataAdvanceVotingData, handleResetOnSearchClickAdvVoting } from './Voting/AdvancedVotingDataSearchSlice';
import { handleResetInvestorTrackerSearch } from './Voting/ToolsResolutionTrackerSlice';
import { handleResetNoActiontool } from './Voting/VotingToolSlice';
import { handleResetResult, handleResetDirectorDataAndAnalyticsTool } from './Governance/DirectorDataAndAnalyticsToolsSlice';
import { handleResetFilterAndData } from './Governance/DirectorSkillsAndAnalyticsToolsSlice';
import { handleResetOnSearchClick } from './Voting/ToolsDissidentVotingSummarySlice';

const ToolsContainer = ({
  getTokenDecode,
  token,
  handleResetLoading,
  handleButtonAccess,
  handleResetShortCampaignDataAndAnalyticsTool,
  handleGlobleResetNotifiedShortPosition,
  handleResetLoader,
  procedureRunningEstimateTime,
  isActivismButtonDisabled,
  isActivist_ShortsButtonDisabled,
  isVotingButtonDisabled,
  isGovernanceButtonDisabled,
  isVulnerabilityButtonDisabled,
  isAmalgamatedButtonDisabled,
  handleResetDataAdvanceVotingData,
  handleResetInvestorTrackerSearch,
  handleResolutionFilter,
  handleResetNoActiontool,
  handleResetResult,
  handleResetDirectorDataAndAnalyticsTool,
  handleResetFilterAndData,
  handleResetOnSearchClick,
  handleResetOnSearchClickAdvVoting
}) => {
  useEffect(() => {
    const abortController = new AbortController();
    getTokenDecode();
    handleButtonAccess(token.MemberShip);
    handleResetDataAdvanceVotingData();
    handleResetInvestorTrackerSearch();
    handleResolutionFilter();
    handleResetNoActiontool();
    handleResetResult();
    handleResetDirectorDataAndAnalyticsTool();
    handleResetFilterAndData();
    handleResetOnSearchClick();
    handleResetOnSearchClickAdvVoting();
    return function cleanup() {
      abortController.abort();
    };
  }, [getTokenDecode]);

  return (
    <ErrorBoundary>
      <Tools
        token={token.MemberShip}
        handleResetLoading={handleResetLoading}
        handleButtonAccess={handleButtonAccess}
        handleResetLoader={handleResetLoader}
        handleGlobleResetNotifiedShortPosition={
          handleGlobleResetNotifiedShortPosition
        }
        handleResetShortCampaignDataAndAnalyticsTool={
          handleResetShortCampaignDataAndAnalyticsTool
        }
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        isActivismButtonDisabled={isActivismButtonDisabled}
        isActivist_ShortsButtonDisabled={isActivist_ShortsButtonDisabled}
        isVotingButtonDisabled={isVotingButtonDisabled}
        isGovernanceButtonDisabled={isGovernanceButtonDisabled}
        isVulnerabilityButtonDisabled={isVulnerabilityButtonDisabled}
        isAmalgamatedButtonDisabled={isAmalgamatedButtonDisabled}
      />
    </ErrorBoundary>
  );
};

ToolsContainer.propTypes = {
  getTokenDecode: PropTypes.func.isRequired,
  handleResetShortCampaignDataAndAnalyticsTool: PropTypes.func,
  handleButtonAccess: PropTypes.func.isRequired,
  handleResetLoading: PropTypes.func.isRequired,
  handleGlobleResetNotifiedShortPosition: PropTypes.func,
  token: PropTypes.object.isRequired,
  handleResetLoader: PropTypes.object.isRequired
};
ToolsContainer.defaultProps = {
  handleGlobleResetNotifiedShortPosition: () => null
};

ToolsContainer.defaultProps = {
  handleResetShortCampaignDataAndAnalyticsTool: () => null
};

const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const selectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;
const selectIsActivismButtonDisabled = (state) => state.tools.isActivismButtonDisabled;
const selectIsActivist_ShortsButtonDisabled = (state) => state.tools.isActivist_ShortsButtonDisabled;
const selectIsVotingButtonDisabled = (state) => state.tools.isVotingButtonDisabled;
const selectIsGovernanceButtonDisabled = (state) => state.tools.isGovernanceButtonDisabled;
const selectIsVulnerabilityButtonDisabled = (state) => state.tools.isVulnerabilityButtonDisabled;
const selectIsAmalgamatedButtonDisabled = (state) => state.tools.isAmalgamatedButtonDisabled;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  procedureRunningEstimateTime: selectProcedureRunningEstimateTime(state),
  isActivismButtonDisabled: selectIsActivismButtonDisabled(state),
  isActivist_ShortsButtonDisabled: selectIsActivist_ShortsButtonDisabled(state),
  isVotingButtonDisabled: selectIsVotingButtonDisabled(state),
  isGovernanceButtonDisabled: selectIsGovernanceButtonDisabled(state),
  isVulnerabilityButtonDisabled: selectIsVulnerabilityButtonDisabled(state),
  isAmalgamatedButtonDisabled: selectIsAmalgamatedButtonDisabled(state),

});

const mapDispatchToProps = {
  getTokenDecode,
  handleResetLoading,
  handleGlobleResetNotifiedShortPosition,
  handleResetShortCampaignDataAndAnalyticsTool,
  handleResetLoader,
  handleButtonAccess,
  handleResetDataAdvanceVotingData,
  handleResetInvestorTrackerSearch,
  handleResolutionFilter,
  handleResetNoActiontool,
  handleResetResult,
  handleResetDirectorDataAndAnalyticsTool,
  handleResetFilterAndData,
  handleResetOnSearchClick,
  handleResetOnSearchClickAdvVoting
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsContainer);
