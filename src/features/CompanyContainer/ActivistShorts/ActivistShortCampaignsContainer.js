import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import qs from 'qs';
import PropTypes from 'prop-types';
import ActivistShortCampaigns from '../../../components/Company/ActivistShorts/ActivistShortCampaigns';
import {
  handleVisitorLog,
  adm_Check_PIDReq,
  listActivistInvestorsForCompanyAiSReq,
  getActivismSummary_AiSReq,
  handleClearSelection,
  handleResetActivistShortCampaigns,
} from '../CompanySlice';
import { handleShortSellerCampaign } from '../../DashboardContainer/DashboardSlice';
import { GETCOMPANYGROUPEDJOINTDEMANDSPAGEDATA } from '../../../constants/ProcedureConstant';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import {
  getActivistCampaignsDataListReq,
  handleResetCampaign,
  getActivistShortCampaignAdvisersDataReq,
  getInvestorIdFromCampaignIdDataReq,
  handleIsLoading
} from '../ActivistShorts/ActivistShortCampaignsSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../../constants/TrialTypeConstants';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';
import propTypes from '../../../utils/propTypes';

const ActivistShortCampaignsContainer = ({
  location,
  children,
  TrialLog,
  listActivistInvestorsForCompanyAiSReq,
  aiSInvestorForCompanyrowData,
  getActivismSummary_AiSReq,
  aiSActivismSummaryrowData,
  handleClearSelection,
  allowDownload,
  ddlForCampaingData,
  ddlShortSellerCampaignData,
  handleShortSellerCampaign,
  ddlShortSellertSelectedVal,
  getActivistCampaignsDataListReq,
  DDLValues,
  chkCampaign,
  SetDDLCampaign,
  table_Advisors,
  handleResetCampaign,
  isLoading,
  // Trial
  distinctProfile,
  getActivistShortCampaignAdvisersDataReq,
  tbl_avdviser_activist_short,
  getInvestorIdFromCampaignIdDataReq,
  investor_data,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  const getAll = useCallback(
    async (pId) => {
      const abortController = new AbortController();
      const companyID = await adm_Check_PIDReq(pId);
      if (companyID.company_id) {
        await listActivistInvestorsForCompanyAiSReq(companyID.company_id);
        await getActivismSummary_AiSReq(companyID.company_id);
      }
    },
    [
      query.pid,
      distinctProfile,
    ]
  );

  useEffect(() => {
    async function getData() {
      if (ddlShortSellerCampaignData.length > 0 && ddlShortSellerCampaignData[0] !== undefined) {
        if (ddlShortSellertSelectedVal !== undefined) {
          await getActivistShortCampaignAdvisersDataReq(
            ddlShortSellertSelectedVal.value
          );
          await getInvestorIdFromCampaignIdDataReq(
            ddlShortSellertSelectedVal.value
          );
        } else {
          await getActivistShortCampaignAdvisersDataReq(
            ddlShortSellerCampaignData[0].value
          );
          await getInvestorIdFromCampaignIdDataReq(
            ddlShortSellerCampaignData[0].value
          );
        }
      }
    }
    getData();
  }, [
    ddlShortSellertSelectedVal,
    ddlShortSellerCampaignData,
    getInvestorIdFromCampaignIdDataReq,
    getActivistShortCampaignAdvisersDataReq,
  ]);

  const getAlldata = useCallback(
    async (pId) => {
      const abortController = new AbortController();
      await getActivistCampaignsDataListReq({
        indiv_campaigns: DDLValues,
        pid: pId,
        show_other_campaigns: chkCampaign,
        SetDDLCampaign,
      });
      return function cleanup() {
        abortController.abort();
      };
    },
    [DDLValues, SetDDLCampaign, chkCampaign]
  );

  useEffect(() => {
    const abortController = new AbortController();
    handleResetCampaign();
    handleResetActivistShortCampaigns();
    handleClearSelection();
    return function cleanup() {
      abortController.abort();
    };
  }, [
    handleResetActivistShortCampaigns,
    handleResetCampaign,
    handleClearSelection,
  ]);

  useEffect(() => {
    const abortController = new AbortController();
    if (query.pid !== undefined && distinctProfile !== null) {
      let pId = query.pid;
      if (distinctProfile) {
        pId = TypeConstants.TRIAL_PID;
      }
      getAlldata(pId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [getAlldata, distinctProfile]);

  useEffect(() => {
    const abortController = new AbortController();
    if (query.pid !== undefined && distinctProfile !== null) {
      let pId = query.pid;
      if (distinctProfile) {
        pId = TypeConstants.TRIAL_PID;
      }
      getAll(pId);
    }
    return function cleanup() {
      abortController.abort();
    };
  }, [getAll, distinctProfile]);

  return (
    <ErrorBoundary>
      <ActivistShortCampaigns
        children={children}
        TrialLog={TrialLog}
        aiSInvestorForCompanyrowData={aiSInvestorForCompanyrowData}
        aiSActivismSummaryrowData={aiSActivismSummaryrowData}
        allowDownload={allowDownload}
        ddlForCampaingData={ddlForCampaingData}
        ddlShortSellerCampaignData={ddlShortSellerCampaignData}
        handleShortSellerCampaign={handleShortSellerCampaign}
        ddlShortSellertSelectedVal={ddlShortSellertSelectedVal}
        table_Advisors={table_Advisors}
        isLoading={isLoading}
        handleIsLoading={handleIsLoading}
        // Trial
        tbl_avdviser_activist_short={tbl_avdviser_activist_short}
        investor_data={investor_data}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

const selectDdlForCampaingData = (state) => state.company.ddlForCampaingData;
const selectDdlShortSellerCampaignData = (state) =>
  state.company.ddlShortSellerCampaignData;
const selectDdlShortSellertSelectedVal = (state) =>
  state.dashboard.ddlShortSellertSelectedVal;

const SelectAiSInvestorForCompanyrowData = (state) => {
  if (state.company.rowData_AiSInvestorForCompany !== undefined) {
    return state.company.rowData_AiSInvestorForCompany;
  }
  return [];
};

const SelectisLoading = (state) => state.activistShortCampaigns.isLoading;
const Select_DDLValues = (state) => state.activistShortCampaigns.DDLValues;
const Select_chkCampaign = (state) => state.activistShortCampaigns.chkCampaign;
const Select_SetDDLCampaign = (state) =>
  state.activistShortCampaigns.SetDDLCampaign;
const Select_table_Advisors = (state) =>
  state.activistShortCampaigns.table_Advisors;

const select_tbl_avdviser_activist_short = (state) =>
  state.activistShortCampaigns.tbl_avdviser_activist_short;
const select_investor_data = (state) =>
  state.activistShortCampaigns.investor_data;

const SelectAiSActivismSummaryrowData = (state) =>
  state.company.rowData_AiSActivismSummary !== undefined
    ? state.company.rowData_AiSActivismSummary
    : [];
const selectAllowDownload = (state) => state.company.allowDownload;
//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

// let query = qs.parse(location.search, { ignoreQueryPrefix: true });
const mapStateToProps = (state) => ({
  isLoading: SelectisLoading(state),
  aiSInvestorForCompanyrowData: SelectAiSInvestorForCompanyrowData(state),
  aiSActivismSummaryrowData: SelectAiSActivismSummaryrowData(state),
  allowDownload: selectAllowDownload(state),
  ddlForCampaingData: selectDdlForCampaingData(state),
  ddlShortSellerCampaignData: selectDdlShortSellerCampaignData(state),
  ddlShortSellertSelectedVal: selectDdlShortSellertSelectedVal(state),
  DDLValues: Select_DDLValues(state),
  chkCampaign: Select_chkCampaign(state),
  SetDDLCampaign: Select_SetDDLCampaign(state),
  table_Advisors: Select_table_Advisors(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  investor_data: select_investor_data(state),
  tbl_avdviser_activist_short: select_tbl_avdviser_activist_short(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

const mapDispatchToProps = {
  handleVisitorLog,
  listActivistInvestorsForCompanyAiSReq,
  getActivismSummary_AiSReq,
  handleClearSelection,
  handleShortSellerCampaign,
  getActivistCampaignsDataListReq,
  handleResetCampaign,
  getActivistShortCampaignAdvisersDataReq,
  getInvestorIdFromCampaignIdDataReq,
  handleIsLoading
};

ActivistShortCampaignsContainer.propTypes = {
  HandleTrialLog: PropTypes.any,
  TrialLog: PropTypes.bool,
  aiSActivismSummaryrowData: PropTypes.array.isRequired,
  aiSInvestorForCompanyrowData: PropTypes.array.isRequired,
  children: PropTypes.object,
  getActivismSummary_AiSReq: PropTypes.func.isRequired,
  handleClearSelection: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  listActivistInvestorsForCompanyAiSReq: PropTypes.func.isRequired,
  location: PropTypes.object,
  search: PropTypes.string,
  ddlForCampaingData: PropTypes.array.isRequired,
  investor_data: PropTypes.array,
  getTokenDecode: PropTypes.func,
  TokenDecode: PropTypes.any,
};

ActivistShortCampaignsContainer.defaultProps = {
  location: { search: '&id=' },
  children: {},
  search: '',
  handleClearSelection: () => {},
  handleVisitorLog: () => null,
  getTokenDecode: () => null,
  TokenDecode: undefined,
  TrialLog: false,
  investor_data: [],
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ActivistShortCampaignsContainer)
);
