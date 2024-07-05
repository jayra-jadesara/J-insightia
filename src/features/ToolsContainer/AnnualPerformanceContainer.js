import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AnnualPerformanceTool from '../../components/Tools/ActivismTools/AnnualPerformance';
import {
  getTokenDecode,
  handleResetLoading,
  getPerformanceOverviewV2Req
} from './ToolsSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { GetPageAccess } from '../../utils/tools-util';
import { ACTIVISM } from '../../constants/ProductConstants';

const AnnualPerformanceContainer = ({
  children,
  getTokenDecode,
  token,
  handleResetLoading,
  getPerformanceOverviewV2Req,
  GetPerformanceOverviewV2,
  trialUserDisableDownload
}) => {
  useEffect(() => {
    let validation = false;
    let pageAccess = false;
    const abortController = new AbortController();
    async function getAccess() {
      await getTokenDecode();
      pageAccess = await GetPageAccess(token.MemberShip, ACTIVISM);
    }
    async function prepAccess() {
      await getAccess();
      validation = true;
      await getPerformanceOverviewV2Req();
    }
    prepAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [getTokenDecode, getPerformanceOverviewV2Req]);

  return (
    <ErrorBoundary>
      <AnnualPerformanceTool
        children={children}
        token={token.MemberShip}
        handleResetLoading={handleResetLoading}
        GetPerformanceOverviewV2={GetPerformanceOverviewV2}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

AnnualPerformanceContainer.propTypes = {
  GetPerformanceOverviewV2: PropTypes.any,
  children: PropTypes.any,
  getPerformanceOverviewV2Req: PropTypes.func,
  getTokenDecode: PropTypes.func,
  handleResetLoading: PropTypes.func,
  token: PropTypes.object
};

AnnualPerformanceContainer.defaultProps = {
  getPerformanceOverviewV2Req: () => {},
  getTokenDecode: () => {},
  handleResetLoading: () => {},
  token: {}
};

const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectGetPerformanceOverviewV2 = (state) =>
  state.tools.getPerformanceOverviewV2;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  GetPerformanceOverviewV2: SelectGetPerformanceOverviewV2(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getTokenDecode,
  handleResetLoading,
  getPerformanceOverviewV2Req
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnualPerformanceContainer);
