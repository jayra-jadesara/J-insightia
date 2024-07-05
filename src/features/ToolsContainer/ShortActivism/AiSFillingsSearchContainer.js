import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import AiSFillingsSearch from '../../../components/Tools/ShortActivismTools/AiSFillingsSearch';
import { getActivistShortsFillingsDataReq } from './AiSFillingsSearchSlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { getTokenDecode } from '../ToolsSlice';
import { GetPageAccess } from '../../../utils/tools-util';
import { ACTIVIST_SHORTS } from '../../../constants/ProductConstants';

const AiSFillingsSearchContainer = ({
  getActivistShortsFillingsDataReq,
  getProcedureRunningEstimateTimeReq,
  token,
  ...props
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;

    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    async function getAll() {
      await getProcedureRunningEstimateTimeReq(ProcedureConstant.AISFILLIGSSEARCH);
      await getActivistShortsFillingsDataReq({ cancelToken: source.token });
    }
    async function getAccess() {
      await getTokenDecode();
      pageAccess = await GetPageAccess(token.MemberShip, ACTIVIST_SHORTS);
    }
    async function prepAccess() {
      await getAccess();
      validation = true;
      await getAll();
    }
    prepAccess();
    return function cleanup() {
      abortController.abort();
      source.cancel();
    };
  }, [getActivistShortsFillingsDataReq, getProcedureRunningEstimateTimeReq]);

  return (
    <ErrorBoundary>
      <AiSFillingsSearch {...props} />
    </ErrorBoundary>
  );
};

AiSFillingsSearchContainer.propTypes = {};

AiSFillingsSearchContainer.defaultProps = {};

const SelectLstFillingSearchData = (state) =>
  state.aisfillingssearch.lstFillingSearchData;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectIsLoadingFillingData = (state) =>
  state.aisfillingssearch.isLoadingFillingData;
const SelectDecodeToken = (state) => state.tools.getTokenDecode;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  lstFillingSearchData: SelectLstFillingSearchData(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  isLoadingFillingData: SelectIsLoadingFillingData(state),
});

const mapDispatchToProps = {
  getActivistShortsFillingsDataReq,
  getProcedureRunningEstimateTimeReq
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AiSFillingsSearchContainer)
);
