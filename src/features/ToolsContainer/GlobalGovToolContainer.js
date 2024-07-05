import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GlobalGovernanceDataTool from '../../components/Tools/GovernanceTools/GlobalGovernanceDataTool';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import {
  getGlobalGovProvisionListReq,
  handleSetCountyGovDDL,
  getCountryGovListReq,
  getStateGovDetailsListReq,
  handleSetStateGovList,
  getStateGovListReq,
  handleSetStateGovDDL,
  getTokenDecode,
  handleGlobalGovnResetStates
} from './ToolsSlice';
import { GetPageAccess } from '../../utils/tools-util';
import { GOVERNANCE } from '../../constants/ProductConstants';
import { TokenDecodeForProductStatus } from '../../utils/general-util';
// import { getProcedureRunningEstimateTimeReq } from '../General/TitleSlice';

const GlobalGovToolContainer = ({
  token,
  getStateGovListReq,
  stateGovList,
  stateGovernanceList,
  setStateGovernanceDDL,
  handleSetStateGovDDL,
  stateGovdescDetails,
  stateGovboardDetails,
  stateGovshareholderDetails,
  stateGovvotingDetails,
  stateGovmnDetails,
  getStateGovDetailsListReq,
  handleSetStateGovList,

  handleSetCountyGovDDL,
  selectedCountyGov,
  getGlobalGovProvisionListReq,
  getCountryGovListReq,
  summaryData,
  countryData,
  globalGovTrialStatus,
  isLoading,
  allowDownload,
  //
  countryProfileDetails,
  overviewDetails,
  documentsDetails,
  boardDetails,
  votingDetails,
  generalGovDetails,
  shareholderActDetails,
  govTakeoverDetails,
  provisionDetails,
  //
  procedureRunningEstimateTime,
  //
  trialUserDisableDownload,
  handleGlobalGovnResetStates
}) => {
  const [status, setStatus] = useState(0);
  useEffect(() => {
    handleGlobalGovnResetStates();
  }, []);
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const abortController = new AbortController();
    async function getAll() {
      setStatus(await TokenDecodeForProductStatus(GOVERNANCE));
      await getGlobalGovProvisionListReq();
    }
    async function getAccess() {
      await getTokenDecode();
      pageAccess = await GetPageAccess(token.MemberShip, GOVERNANCE);
    }
    async function prepAccess() {
      await getAccess();
      validation = true;
      await getAll();
    }
    prepAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [getGlobalGovProvisionListReq]);

  return (
    <ErrorBoundary>
      <GlobalGovernanceDataTool
        summaryData={summaryData}
        countryData={countryData}
        TrialStatus={globalGovTrialStatus}
        isLoading={isLoading}
        allowDownload={allowDownload}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        handleSetCountyGovDDL={handleSetCountyGovDDL}
        selectedCountyGov={selectedCountyGov}
        getCountryGovListReq={getCountryGovListReq}
        countryProfileDetails={countryProfileDetails}
        overviewDetails={overviewDetails}
        documentsDetails={documentsDetails}
        boardDetails={boardDetails}
        votingDetails={votingDetails}
        generalGovDetails={generalGovDetails}
        shareholderActDetails={shareholderActDetails}
        govTakeoverDetails={govTakeoverDetails}
        provisionDetails={provisionDetails}
        getStateGovListReq={getStateGovListReq}
        stateGovList={stateGovList}
        stateGovernanceList={stateGovernanceList}
        setStateGovernanceDDL={setStateGovernanceDDL}
        handleSetStateGovDDL={handleSetStateGovDDL}
        stateGovdescDetails={stateGovdescDetails}
        stateGovboardDetails={stateGovboardDetails}
        stateGovshareholderDetails={stateGovshareholderDetails}
        stateGovvotingDetails={stateGovvotingDetails}
        stateGovmnDetails={stateGovmnDetails}
        getStateGovDetailsListReq={getStateGovDetailsListReq}
        handleSetStateGovList={handleSetStateGovList}
        status={status}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

GlobalGovToolContainer.propTypes = {
  allowDownload: PropTypes.any.isRequired,
  boardDetails: PropTypes.any.isRequired,
  countryData: PropTypes.any.isRequired,
  countryProfileDetails: PropTypes.any.isRequired,
  documentsDetails: PropTypes.any.isRequired,
  generalGovDetails: PropTypes.any.isRequired,
  getCountryGovListReq: PropTypes.func.isRequired,
  getGlobalGovProvisionListReq: PropTypes.func.isRequired,
  getStateGovDetailsListReq: PropTypes.func.isRequired,
  getStateGovListReq: PropTypes.func.isRequired,
  globalGovTrialStatus: PropTypes.any.isRequired,
  govTakeoverDetails: PropTypes.any.isRequired,
  handleSetCountyGovDDL: PropTypes.func.isRequired,
  handleSetStateGovDDL: PropTypes.func.isRequired,
  handleSetStateGovList: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  overviewDetails: PropTypes.any.isRequired,
  procedureRunningEstimateTime: PropTypes.any,
  provisionDetails: PropTypes.any.isRequired,
  selectedCountyGov: PropTypes.any.isRequired,
  setStateGovernanceDDL: PropTypes.any.isRequired,
  shareholderActDetails: PropTypes.any.isRequired,
  stateGovList: PropTypes.any.isRequired,
  stateGovboardDetails: PropTypes.any.isRequired,
  stateGovdescDetails: PropTypes.any.isRequired,
  stateGovernanceList: PropTypes.any.isRequired,
  stateGovmnDetails: PropTypes.any.isRequired,
  stateGovshareholderDetails: PropTypes.any.isRequired,
  stateGovvotingDetails: PropTypes.any.isRequired,
  summaryData: PropTypes.any.isRequired,
  votingDetails: PropTypes.any.isRequired
};
GlobalGovToolContainer.defaultProps = {
  procedureRunningEstimateTime: undefined
};
const SelectSetStateGovernanceDDL = (state) =>
  state.tools.setStateGovernanceDDL;
const SelectStateGovList = (state) => state.tools.stateGovList;
const SelectStateGovernanceListDDL = (state) => state.tools.stateGovernanceList;

const SelectStateGovdescDetails = (state) => state.tools.stateGovdescDetails;
const SelectStateGovboardDetailsL = (state) => state.tools.stateGovboardDetails;
const SelectStateGovshareholderDetails = (state) =>
  state.tools.stateGovshareholderDetails;
const SelectStateGovvotingDetails = (state) =>
  state.tools.stateGovvotingDetails;
const SelectStateGovmnDetails = (state) => state.tools.stateGovmnDetails;

const SelectCountryProfileDetails = (state) =>
  state.tools.countryProfileDetails;
const SelectOverviewDetails = (state) => state.tools.overviewDetails;
const SelectDocumentsDetails = (state) => state.tools.documentsDetails;
const SelectBoardDetails = (state) => state.tools.boardDetails;
const SelectVotingDetails = (state) => state.tools.votingDetails;
const SelectGeneralGovDetails = (state) => state.tools.generalGovDetails;
const SelectShareholderActDetails = (state) =>
  state.tools.shareholderActDetails;
const SelectGovTakeoverDetails = (state) => state.tools.govTakeoverDetails;
const SelectProvisionDetails = (state) => state.tools.provisionDetails;
const SelectGlobalGovTrialStatus = (state) => state.tools.globalGovTrialStatus;

const SelectSelectedCountyGov = (state) => state.tools.selectedCountyGov;
const SelectSummaryData = (state) => state.tools.summaryData;
const SelectCountryData = (state) => state.tools.countryData;
const SelecIsLoading = (state) => state.tools.isLoading;
const selectAllowDownload = (state) => state.tools.allowDownload;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  stateGovdescDetails: SelectStateGovdescDetails(state),
  stateGovboardDetails: SelectStateGovboardDetailsL(state),
  stateGovshareholderDetails: SelectStateGovshareholderDetails(state),
  stateGovvotingDetails: SelectStateGovvotingDetails(state),
  stateGovmnDetails: SelectStateGovmnDetails(state),

  setStateGovernanceDDL: SelectSetStateGovernanceDDL(state),
  stateGovList: SelectStateGovList(state),
  stateGovernanceList: SelectStateGovernanceListDDL(state),

  countryProfileDetails: SelectCountryProfileDetails(state),
  overviewDetails: SelectOverviewDetails(state),
  documentsDetails: SelectDocumentsDetails(state),
  boardDetails: SelectBoardDetails(state),
  votingDetails: SelectVotingDetails(state),
  generalGovDetails: SelectGeneralGovDetails(state),
  shareholderActDetails: SelectShareholderActDetails(state),
  govTakeoverDetails: SelectGovTakeoverDetails(state),
  provisionDetails: SelectProvisionDetails(state),
  globalGovTrialStatus: SelectGlobalGovTrialStatus(state),

  selectedCountyGov: SelectSelectedCountyGov(state),
  summaryData: SelectSummaryData(state),
  countryData: SelectCountryData(state),
  isLoading: SelecIsLoading(state),
  allowDownload: selectAllowDownload(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getGlobalGovProvisionListReq,
  getCountryGovListReq,
  handleSetCountyGovDDL,
  getStateGovListReq,
  handleSetStateGovDDL,
  getStateGovDetailsListReq,
  handleSetStateGovList,
  handleGlobalGovnResetStates
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalGovToolContainer);
