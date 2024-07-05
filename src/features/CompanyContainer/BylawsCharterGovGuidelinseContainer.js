import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import {
  getCompanyDirector503Req,
  getDataGetItem303MaterialReq,
  handleVisitorLog,
  getTokenDecode,
  GetTrialOrActualTop20ListReq,
  handleResetGovernanceBylaw,
  handledLoadingBylaw
} from './CompanySlice';
import { handleSetDDLComparision, getBoardAndDirectorsIndexDDLReq } from './Governance/GovernanceOverviewSlice';
import BylawsCharterGovGuidelinse from '../../components/Company/Governance/Bylawscharterguidelines';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import TypeConstants from '../../constants/TrialTypeConstants';
import pathConst from '../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../utils/general-util';

const BylawsCharterGovGuidelinseContainer = ({
  location,
  children,
  TokenDecode,
  TrialLog,
  allowDownload,
  getCompanyDirector503Req,
  getDataGetItem303MaterialReq,
  companyByLawDirector503,
  dataGetItem303,
  handleResetGovernanceBylaw,
  isLoadingData,
  distinctProfile,
  trialUserDisableDownload,
  trialUserBlur,
  ddlComparision,
  selection_ddlComparision,
  handleSetDDLComparision,
  getBoardAndDirectorsIndexDDLReq,
  handledLoadingBylaw
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    handleResetGovernanceBylaw();
    if (query.pid !== undefined) {
      if (distinctProfile) {
        getCompanyDirector503Req(TypeConstants.TRIAL_PID);
        // getDataGetItem303MaterialReq(TypeConstants.TRIAL_PID);
        getBoardAndDirectorsIndexDDLReq({ pid: TypeConstants.TRIAL_PID });
      } else {
        getCompanyDirector503Req(query.pid);
        // getDataGetItem303MaterialReq(query.pid);
        getBoardAndDirectorsIndexDDLReq({
          pid: query.pid !== undefined ? query.pid : null
        });
      }
    }
  }, [query.pid, getCompanyDirector503Req, handleResetGovernanceBylaw, distinctProfile]);

  useEffect(() => {
    if (query.pid !== undefined) {
      if (distinctProfile) {
        getDataGetItem303MaterialReq(TypeConstants.TRIAL_PID);
      } else {
        getDataGetItem303MaterialReq(query.pid);
      }
    }
  }, [getDataGetItem303MaterialReq, selection_ddlComparision, selection_ddlComparision.value]);

  return (
    <ErrorBoundary>
      <BylawsCharterGovGuidelinse
        children={children}
        location={location}
        TokenDecode={TokenDecode}
        TrialLog={TrialLog}
        allowDownload={allowDownload}
        companyByLawDirector503={companyByLawDirector503}
        dataGetItem303={dataGetItem303}
        isLoadingData={isLoadingData}
        TrialUserDisableDownload={trialUserDisableDownload}
        TrialUser={trialUserBlur}
        ddlComparision={ddlComparision}
        selection_ddlComparision={selection_ddlComparision}
        handleSetDDLComparision={handleSetDDLComparision}
        handledLoadingBylaw={handledLoadingBylaw}
      />
    </ErrorBoundary>
  );
};

BylawsCharterGovGuidelinseContainer.propTypes = {
  GetTrialOrActualTop20ListReq: PropTypes.func,
  HandleTrialLog: PropTypes.any,
  TokenDecode: PropTypes.any,
  TrialLog: PropTypes.any,
  allowDownload: PropTypes.bool,
  children: PropTypes.any,
  companyByLawDirector503: PropTypes.any,
  dataGetItem303: PropTypes.any,
  getCompanyDirector503Req: PropTypes.func,
  getDataGetItem303MaterialReq: PropTypes.func,
  getTokenDecode: PropTypes.func,
  handleResetGovernanceBylaw: PropTypes.func,
  handleVisitorLog: PropTypes.func,
  location: PropTypes.object,
  isLoadingData: PropTypes.any
};

BylawsCharterGovGuidelinseContainer.defaultProps = {
  GetTrialOrActualTop20ListReq: () => {},
  allowDownload: false,
  getCompanyDirector503Req: () => {},
  getDataGetItem303MaterialReq: () => {},
  getTokenDecode: () => {},
  handleResetGovernanceBylaw: () => {},
  handleVisitorLog: () => {},
  location: {},
  isLoadingData: undefined
};

const SelectDecodeToken = (state) => state.company.getTokenDecode;
const SelectTrialLog = (state) => state.company.TrialLog_governance;

const SelecCompanyByLawDirector503 = (state) =>
  state.company.companyByLawDirector503;
const SelectDataGetItem503 = (state) => state.company.dataGetItem303;
const SelectisLoadingData = (state) => state.company.isLoadingData;
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
  companyByLawDirector503: SelecCompanyByLawDirector503(state),
  dataGetItem303: SelectDataGetItem503(state),
  isLoadingData: SelectisLoadingData(state),
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
  getCompanyDirector503Req,
  getDataGetItem303MaterialReq,
  handleResetGovernanceBylaw,
  handleSetDDLComparision,
  getBoardAndDirectorsIndexDDLReq,
  handledLoadingBylaw
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BylawsCharterGovGuidelinseContainer)
);
