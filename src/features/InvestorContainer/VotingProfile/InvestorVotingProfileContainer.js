import PropTypes, { array } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import InvestorVotingProfile from '../../../components/Investor/InvestorVoting/VotingProfile/InvestorVotingProfile';
import {
  getVotingProfileTopSectionReq,
  getInvestorDDLListReq,
  handleSetInvestor,
  handleSetSection,
  getVotingProfileBottomSectionReq,
  handleResetVotingProfile,
} from './InvestorVotingProfileSlice';
import { INVESTOR_SEARCH, INVESTOR_VOTING_PROFILE } from '../../../constants/PathsConstant';
import { history } from '../../../utils/navigation-util';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import typeConst from '../../../constants/TrialTypeConstants';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorVotingProfileContainer = ({
  location,
  children,
  getVotingProfileTopSectionReq,
  getVotingProfileBottomSectionReq,
  getInvestorDDLListReq,
  ddlAllInvestor,
  ddlSetInvestor,
  votingProfile,
  tableKeyDocument,
  tableProxyVotingSummary,
  tableVotingPolicyChanges,
  tableContacts,
  tableBoards,
  tableCommittes,
  tableRemuneration,
  tableStructure,
  tableGeneral,
  tableESG,
  tableVotingPolicy,
  tableNews,
  isLoadingVotingProfile,
  procedureRunningEstimateTime,
  allowDownload,
  TrialStatus,
  handleResetVotingProfile,
  handleSetSection,
  handleSetInvestor,
  setSection,
  InvestorTitle,
  // Trial
  distinctProfile,
  trialProductStatus,
  trialUserDisableDownload,
  trialUserBlur,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    const getInvestorDDLListReqAsync = async (investorId) => {
      const investorDDLList = await getInvestorDDLListReq({ investor_id: investorId });
      if (query.invpfid && query.invpfid !== 'undefined') {
        const objDdlSelection = investorDDLList.payload.ddlAllInvestor.filter((c) => c.value === Number(query.invpfid));
        if (objDdlSelection.length > 0) {
          handleSetInvestor(objDdlSelection[0]);
          history.push(
            `${INVESTOR_VOTING_PROFILE}?investor=${query.investor}&invpfid=${query.invpfid}${
              query.print ? '&print=1' : ''
            }`
          );
        } else {
          if (
            investorDDLList.payload.ddlInitialInvestor === null ||
            investorDDLList.payload.ddlInitialInvestor === undefined
          ) {
            history.push(INVESTOR_SEARCH);
          } else {
            handleSetInvestor(investorDDLList.payload.ddlInitialInvestor);
            history.push(
              `${INVESTOR_VOTING_PROFILE}?investor=${query.investor}&invpfid=${
                investorDDLList.payload.ddlInitialInvestor.value
              }${query.print ? '&print=1' : ''}`
            );
          }
        }
      } else {
        if (
          investorDDLList.payload.ddlInitialInvestor === null ||
          investorDDLList.payload.ddlInitialInvestor === undefined
        ) {
          history.push(INVESTOR_SEARCH);
        } else {
          handleSetInvestor(investorDDLList.payload.ddlInitialInvestor);
          history.push(
            `${INVESTOR_VOTING_PROFILE}?investor=${query.investor}&invpfid=${
              investorDDLList.payload.ddlInitialInvestor.value
            }${query.print ? '&print=1' : ''}`
          );
        }
      }
    };
    if (query.investor !== undefined && query.investor !== 'undefined' && distinctProfile !== null) {
      let investorId = query.investor;
      if (distinctProfile) {
        investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
      }
      getInvestorDDLListReqAsync(investorId);
    }
  }, [distinctProfile, getInvestorDDLListReq, query.investor, query.invpfid, handleSetInvestor, query.print]);

  useEffect(() => {
    async function getAll() {
      if (ddlSetInvestor.value !== undefined && query.investor !== undefined && distinctProfile !== null) {
        let investorId = query.investor;
        if (distinctProfile) {
          investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
        }
        await getVotingProfileTopSectionReq({
          investor_id: ddlSetInvestor.value,
        });
      }
    }
    getAll();
  }, [distinctProfile, ddlSetInvestor, query.investor, getVotingProfileTopSectionReq]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getAll() {
      if (ddlSetInvestor.value !== undefined && query.investor !== undefined && distinctProfile !== null) {
        let investorId = query.investor;
        if (distinctProfile) {
          investorId = typeConst.TRIAL_INVESTORID_VOTING_AND_ACTIVISM;
        }
        handleResetVotingProfile();
        await getVotingProfileBottomSectionReq({
          investor_id: ddlSetInvestor.value,
        });
      }
    }
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [distinctProfile, ddlSetInvestor, query.investor, getVotingProfileBottomSectionReq, handleResetVotingProfile]);

  //
  useEffect(() => {
    const abortController = new AbortController();
    async function getAll() {
      // if (ddlSetInvestor.value !== undefined) {

      //   history.push(`${INVESTOR_VOTING_PROFILE}${QUERY_INVESTOR}${query.investor}${QUERY_INVESTOR_PF}${ddlSetInvestor.value}`);
      // }
      if (query.invpfid && query.invpfid !== 'undefined') {
        if (ddlAllInvestor.length > 0) {
          const objDdlSelection = ddlAllInvestor.filter((c) => c.value === Number(query.invpfid));
          if (objDdlSelection.length > 0) {
            handleSetInvestor(objDdlSelection[0]);
          }
        }
      }
    }
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [query.invpfid, ddlAllInvestor, handleSetInvestor]);

  if (!query.investor && location !== undefined) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  return (
    <ErrorBoundary>
      <InvestorVotingProfile
        children={children}
        location={location}
        //
        getVotingProfileTopSectionReq={getVotingProfileTopSectionReq}
        getVotingProfileBottomSectionReq={getVotingProfileBottomSectionReq}
        getInvestorDDLListReq={getInvestorDDLListReq}
        handleSetInvestor={handleSetInvestor}
        ddlSetInvestor={ddlSetInvestor}
        ddlAllInvestor={ddlAllInvestor}
        votingProfile={votingProfile}
        tableKeyDocument={tableKeyDocument}
        tableProxyVotingSummary={tableProxyVotingSummary}
        tableVotingPolicyChanges={tableVotingPolicyChanges}
        tableContacts={tableContacts}
        tableBoards={tableBoards}
        tableCommittes={tableCommittes}
        tableRemuneration={tableRemuneration}
        tableStructure={tableStructure}
        tableGeneral={tableGeneral}
        tableESG={tableESG}
        tableVotingPolicy={tableVotingPolicy}
        tableNews={tableNews}
        //
        loadingData={isLoadingVotingProfile}
        procedureRunningEstimateTime={procedureRunningEstimateTime}
        allowDownload={allowDownload}
        // TrialStatus={TrialStatus}
        handleResetVotingProfile={handleResetVotingProfile}
        handleSetSection={handleSetSection}
        setSection={setSection}
        InvestorTitle={InvestorTitle}
        // Trial
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialStatus={trialUserBlur}
        TrialProductStatus={trialProductStatus}
      />
    </ErrorBoundary>
  );
};

InvestorVotingProfileContainer.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  getVotingProfileTopSectionReq: PropTypes.func,
  getVotingProfileBottomSectionReq: PropTypes.func,
  getInvestorDDLListReq: PropTypes.func,
  handleSetInvestor: PropTypes.func,
  isLoadingVotingProfile: PropTypes.bool,
  ddlAllInvestor: PropTypes.array,
  ddlSetInvestor: PropTypes.object,
  votingProfile: PropTypes.object,
  allowDownload: PropTypes.bool,
  TrialStatus: PropTypes.bool,
  handleResetVotingProfile: PropTypes.func,
  handleSetSection: PropTypes.func,
  procedureRunningEstimateTime: PropTypes.number,
  tableKeyDocument: PropTypes.array,
  tableVotingPolicyChanges: PropTypes.array,
  tableContacts: PropTypes.array,
  tableBoards: PropTypes.object,
  tableCommittes: PropTypes.object,
  tableRemuneration: PropTypes.object,
  tableStructure: PropTypes.object,
  tableGeneral: PropTypes.object,
  tableESG: PropTypes.object,
  tableVotingPolicy: PropTypes.object,
  tableNews: PropTypes.array,
  tableProxyVotingSummary: PropTypes.array,
  setSection: PropTypes.object,
};

InvestorVotingProfileContainer.defaultProps = {
  handleResetVotingProfile: () => {},
  handleSetSection: () => {},
  getVotingProfileTopSectionReq: () => {},
  getVotingProfileBottomSectionReq: () => {},
  getInvestorDDLListReq: () => {},
  handleSetInvestor: () => {},
  location: {},
  isLoadingVotingProfile: true,
  ddlAllInvestor: [],
  ddlSetInvestor: {},
  votingProfile: {},
  allowDownload: false,
  TrialStatus: false,
  procedureRunningEstimateTime: undefined,
  children: undefined,
  tableKeyDocument: [],
  tableVotingPolicyChanges: [],
  tableContacts: [],
  tableBoards: {},
  tableCommittes: {},
  tableRemuneration: {},
  tableStructure: {},
  tableGeneral: {},
  tableESG: {},
  tableVotingPolicy: {},
  tableNews: [],
  tableProxyVotingSummary: [],
  setSection: {},
};

const selectddlAllInvestor = (state) => state.investorVotingProfile.ddlAllInvestor;
const selectddlSetInvestor = (state) => state.investorVotingProfile.ddlSetInvestor;
const selectvotingProfile = (state) => state.investorVotingProfile.votingProfile;
const selecttableKeyDocument = (state) => state.investorVotingProfile.tableKeyDocument;
const selecttableProxyVotingSummary = (state) => state.investorVotingProfile.tableProxyVotingSummary;
const selecttableVotingPolicyChanges = (state) => state.investorVotingProfile.tableVotingPolicyChanges;
const selecttableContacts = (state) => state.investorVotingProfile.tableContacts;
const selecttableBoards = (state) => state.investorVotingProfile.tableBoards;
const selecttableCommittes = (state) => state.investorVotingProfile.tableCommittes;
const selecttableRemuneration = (state) => state.investorVotingProfile.tableRemuneration;
const selecttableStructure = (state) => state.investorVotingProfile.tableStructure;
const selecttableGeneral = (state) => state.investorVotingProfile.tableGeneral;
const selecttableESG = (state) => state.investorVotingProfile.tableESG;
const selecttableVotingPolicy = (state) => state.investorVotingProfile.tableVotingPolicy;
const selecttableNews = (state) => state.investorVotingProfile.tableNews;

const selectisLoadingVotingProfile = (state) => state.investorVotingProfile.isLoadingVotingProfile;
const SelectTrialStatus = (state) => state.investorVotingProfile.TrialStatus;
const SelectAllowDownload = (state) => state.investorVotingProfile.allowDownload;
const SelectSetSection = (state) => state.investorVotingProfile.setSection;

const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;

const selectInvestorCompanyProfile = (state) => state.headerTitle.title;
// Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialProductStatus = (state) => state.trial.trialProductStatus;
const selectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;

const mapStateToProps = (state) => ({
  ddlSetInvestor: selectddlSetInvestor(state),
  votingProfile: selectvotingProfile(state),
  ddlAllInvestor: selectddlAllInvestor(state),
  tableKeyDocument: selecttableKeyDocument(state),
  tableProxyVotingSummary: selecttableProxyVotingSummary(state),
  tableVotingPolicyChanges: selecttableVotingPolicyChanges(state),
  tableContacts: selecttableContacts(state),
  tableBoards: selecttableBoards(state),
  tableCommittes: selecttableCommittes(state),
  tableRemuneration: selecttableRemuneration(state),
  tableStructure: selecttableStructure(state),
  tableGeneral: selecttableGeneral(state),
  tableESG: selecttableESG(state),
  tableVotingPolicy: selecttableVotingPolicy(state),
  tableNews: selecttableNews(state),
  allowDownload: SelectAllowDownload(state),
  TrialStatus: SelectTrialStatus(state),
  isLoadingVotingProfile: selectisLoadingVotingProfile(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  setSection: SelectSetSection(state),

  InvestorTitle: selectInvestorCompanyProfile(state),
  // Trial
  distinctProfile: selectDistinctProfile(state),
  trialProductStatus: selectTrialProductStatus(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
});

const mapDispatchToProps = {
  getInvestorDDLListReq,
  getVotingProfileTopSectionReq,
  getVotingProfileBottomSectionReq,
  handleSetInvestor,
  handleSetSection,
  handleResetVotingProfile,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorVotingProfileContainer));
