import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GovernanceScoreDataTools from '../../../components/Tools/GovernanceTools/GovernanceScoreDataTools';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { getGovernanceScoresReq } from './GovernanceScoreToolsSlice';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { getTokenDecode } from '../ToolsSlice';
import { GetPageAccess } from '../../../utils/tools-util';
import { GOVERNANCE } from '../../../constants/ProductConstants';

const GovernanceScoreToolContainer = ({
  token,
  getGovernanceScoresReq,
  getProcedureRunningEstimateTimeReq,
  ...props
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const abortController = new AbortController();
    async function getAll() {
      await getProcedureRunningEstimateTimeReq(ProcedureConstant.AIGSCORES);
      await getGovernanceScoresReq();
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
  }, []);

  return (
    <ErrorBoundary>
      <GovernanceScoreDataTools {...props} />
    </ErrorBoundary>
  );
};

GovernanceScoreToolContainer.propTypes = {};

GovernanceScoreToolContainer.defaultProps = {};

const SelectLstGovernanceScores = (state) => state.governancescoretool.lstGovernanceScores;
const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;
const SelectIsLoadingGovernanceScores = (state) => state.governancescoretool.isLoadingGovernanceScores;
const SelectHeaderTooltips = (state) => state.governancescoretool.headerTooltips;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  lstGovernanceScores: SelectLstGovernanceScores(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  isLoadingGovernanceScores: SelectIsLoadingGovernanceScores(state),
  headerTooltips: SelectHeaderTooltips(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state),
});

const mapDispatchToProps = {
  getGovernanceScoresReq,
  getProcedureRunningEstimateTimeReq,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GovernanceScoreToolContainer));
