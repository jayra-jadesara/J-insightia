import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  getGovDirectorInfoReq,
  handleVisitorLog,
  getTokenDecode,
  GetTrialOrActualTop20ListReq,
  get_Gov_Independent_Graph_DataReq,
  get_Gov_Tenure_Graph_DataReq,
  get_Gov_Gender_Graph_DataReq,
  getComDirProfReq,
  getComDirProfPastReq,
  getBoardNewsHeadlinesReq,
  get_interlocking_directors_JSON_v2Req,
  handleResetGovernanceDirectors,
  getComDirUpcomingReq,
} from './CompanySlice';
import Directors from '../../components/Company/Governance/Directors';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const DirectorContainer = ({
  location,
  children,
  getGovDirectorInfoReq,
  directorInfo,
  get_Gov_Independent_Graph_DataReq,
  get_Gov_Tenure_Graph_DataReq,
  get_Gov_Gender_Graph_DataReq,
  independentGraphData,
  tenureGraphData,
  genderGraphData,
  getComDirProfReq,
  getComDirProfPastReq,
  getBoardNewsHeadlinesReq,
  get_interlocking_directors_JSON_v2Req,
  currDirectorsProf,
  pastDirectorsProf,
  boardNewsHeadlines,
  interlockingDirectors,
  interlockingDirectors_NodesArr,
  interlockingDirectors_LinksArr,
  committeeHeaders,
  currDirectors_visibleEthnicityColumn,
  currDirectors_EthnicityChartData,
  handleResetGovernanceDirectors,
  isLoadingGovDirectorData,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur,
  getComDirUpcomingReq,
  getCompDirUpcomData,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    handleResetGovernanceDirectors();
  }, [handleResetGovernanceDirectors]);

  async function getAll(queryPId) {
    let pid = queryPId;
    if (distinctProfile) {
      pid = TypeConstants.TRIAL_PID;
    }
    await getGovDirectorInfoReq(pid);
    await get_Gov_Independent_Graph_DataReq(pid);
    await get_Gov_Tenure_Graph_DataReq(pid);
    await get_Gov_Gender_Graph_DataReq(pid);
    await getComDirProfReq(pid);
    await getComDirProfPastReq(pid);
    await getBoardNewsHeadlinesReq(pid);
    await getComDirUpcomingReq(pid);
    setTimeout(() => {
    get_interlocking_directors_JSON_v2Req(pid);
    }, 1200);
  }
  useEffect(() => {
    if (query.pid !== undefined) {
      getAll(query.pid);
    }
  }, [query.pid]);

  return (
    <ErrorBoundary>
      <Directors
        children={children}
        directorInfo={directorInfo}
        independentGraphData={independentGraphData}
        tenureGraphData={tenureGraphData}
        genderGraphData={genderGraphData}
        currDirectorsProf={currDirectorsProf}
        pastDirectorsProf={pastDirectorsProf}
        boardNewsHeadlines={boardNewsHeadlines}
        interlockingDirectors={interlockingDirectors}
        interlockingDirectors_NodesArr={interlockingDirectors_NodesArr}
        interlockingDirectors_LinksArr={interlockingDirectors_LinksArr}
        committeeHeaders={committeeHeaders}
        visibleEthnicityColumn={currDirectors_visibleEthnicityColumn}
        EthnicityChartData={currDirectors_EthnicityChartData}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
        getCompDirUpcomData={getCompDirUpcomData}
        isLoadingData={isLoadingGovDirectorData}
      />
    </ErrorBoundary>
  );
};

DirectorContainer.propTypes = {
  boardNewsHeadlines: PropTypes.any,
  children: PropTypes.any,
  committeeHeaders: PropTypes.any,
  currDirectors_visibleEthnicityColumn: PropTypes.any,
  currDirectors_EthnicityChartData: PropTypes.any,
  currDirectorsProf: PropTypes.any,
  directorInfo: PropTypes.any,
  genderGraphData: PropTypes.any,
  getBoardNewsHeadlinesReq: PropTypes.func,
  getComDirProfPastReq: PropTypes.func,
  getComDirProfReq: PropTypes.func,
  getGovDirectorInfoReq: PropTypes.func,
  get_Gov_Gender_Graph_DataReq: PropTypes.func,
  get_Gov_Independent_Graph_DataReq: PropTypes.func,
  get_Gov_Tenure_Graph_DataReq: PropTypes.func,
  get_interlocking_directors_JSON_v2Req: PropTypes.func,
  handleResetGovernanceDirectors: PropTypes.func,
  independentGraphData: PropTypes.any,
  interlockingDirectors: PropTypes.any,
  location: PropTypes.any,
  pastDirectorsProf: PropTypes.any,
  tenureGraphData: PropTypes.any,
  isLoadingGovDirectorData: PropTypes.any,
};

DirectorContainer.defaultProps = {
  getBoardNewsHeadlinesReq: () => {},
  getComDirProfPastReq: () => {},
  getComDirProfReq: () => {},
  getGovDirectorInfoReq: () => {},
  get_Gov_Gender_Graph_DataReq: () => {},
  get_Gov_Independent_Graph_DataReq: () => {},
  get_Gov_Tenure_Graph_DataReq: () => {},
  get_interlocking_directors_JSON_v2Req: () => {},
  handleResetGovernanceDirectors: () => {},
  isLoadingGovDirectorData: undefined,
  interlockingDirectors: undefined,
};

const SelectDecodeToken = (state) => state.company.getTokenDecode;
const SelectTrialLog = (state) => state.company.TrialLog_activistShort;

const selectDirectorInfo = (state) => state.company.directorInfo;
const selectIndependentGraphData = (state) =>
  state.company.independentGraphData;
const selectTenureGraphData = (state) => state.company.tenureGraphData;
const selectGenderGraphData = (state) => state.company.genderGraphData;

const selectCurrDirectorsProf = (state) => state.company.currDirectorsProf;
const selectPastDirectorsProf = (state) => state.company.pastDirectorsProf;
const selectBoardNewsHeadlines = (state) => state.company.boardNewsHeadlines;

const selectInterlockingDirectors = (state) =>
  state.company.interlockingDirectors;
const selectinterlockingDirectors_NodesArr = (state) =>
  state.company.interlockingDirectors_NodesArr;
const selectinterlockingDirectors_LinksArr = (state) =>
  state.company.interlockingDirectors_LinksArr;

const selectInterCommitteeHeaders = (state) => state.company.committeeHeaders;
const selectcurrDirectors_visibleEthnicityColumn = (state) =>
  state.company.currDirectors_visibleEthnicityColumn;
const selectcurrDirectors_EthnicityChartData = (state) =>
  state.company.currDirectors_EthnicityChartData;

const selectisLoadingData = (state) => state.company.isLoadingGovDirectorData;

//Company Trial
const selectDistinctProfile = (state) => state.trial.distinctProfile;
const selectTrialUserDisableDownload = (state) =>
  state.trial.trialUserDisableDownload;
const selectTrialUserBlur = (state) => state.trial.trialUserBlur;
const selectGetCompDirUpcomData = (state) => state.company.getCompDirUpcomData;

const mapStateToProps = (state) => ({
  TokenDecode: SelectDecodeToken(state),
  GetTrialOrActualTop20ListReq: SelectTrialLog(state),
  directorInfo: selectDirectorInfo(state),
  independentGraphData: selectIndependentGraphData(state),
  tenureGraphData: selectTenureGraphData(state),
  genderGraphData: selectGenderGraphData(state),
  currDirectorsProf: selectCurrDirectorsProf(state),
  pastDirectorsProf: selectPastDirectorsProf(state),
  boardNewsHeadlines: selectBoardNewsHeadlines(state),
  interlockingDirectors: selectInterlockingDirectors(state),
  interlockingDirectors_NodesArr: selectinterlockingDirectors_NodesArr(state),
  interlockingDirectors_LinksArr: selectinterlockingDirectors_LinksArr(state),
  committeeHeaders: selectInterCommitteeHeaders(state),
  currDirectors_visibleEthnicityColumn:
    selectcurrDirectors_visibleEthnicityColumn(state),
  currDirectors_EthnicityChartData:
    selectcurrDirectors_EthnicityChartData(state),
  isLoadingGovDirectorData: selectisLoadingData(state),
  //company Trial
  distinctProfile: selectDistinctProfile(state),
  trialUserDisableDownload: selectTrialUserDisableDownload(state),
  trialUserBlur: selectTrialUserBlur(state),
  getCompDirUpcomData: selectGetCompDirUpcomData(state),
});

const mapDispatchToProps = {
  handleVisitorLog,
  GetTrialOrActualTop20ListReq,
  getTokenDecode,
  getGovDirectorInfoReq,
  get_Gov_Independent_Graph_DataReq,
  get_Gov_Tenure_Graph_DataReq,
  get_Gov_Gender_Graph_DataReq,
  getComDirProfReq,
  getComDirProfPastReq,
  getBoardNewsHeadlinesReq,
  get_interlocking_directors_JSON_v2Req,
  handleResetGovernanceDirectors,
  getComDirUpcomingReq,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DirectorContainer)
);
