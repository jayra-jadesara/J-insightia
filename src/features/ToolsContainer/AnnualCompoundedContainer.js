import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AnnualCompound from '../../components/Tools/ActivismTools/AnnualCompounded';
import {
  getTokenDecode,
  handleResetLoading,
  getPerformanceCompoundedReq
} from './ToolsSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';
import { GetPageAccess } from '../../utils/tools-util';
import { ACTIVISM } from '../../constants/ProductConstants';

const AnnualCompoundedContainer = ({
  children,
  getTokenDecode,
  token,
  handleResetLoading,
  getPerformanceCompoundedReq,
  GetPerformanceCompounded,
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
      await getPerformanceCompoundedReq();
    }
    prepAccess();
    return function cleanup() {
      abortController.abort();
    };
  }, [getTokenDecode, getPerformanceCompoundedReq]);

  return (
    <ErrorBoundary>
      <AnnualCompound
        children={children}
        token={token.MemberShip}
        handleResetLoading={handleResetLoading}
        GetPerformanceCompounded={GetPerformanceCompounded}
        trialUserDisableDownload={trialUserDisableDownload}
      />
    </ErrorBoundary>
  );
};

AnnualCompoundedContainer.propTypes = {
  GetPerformanceCompounded: PropTypes.any,
  children: PropTypes.any,
  getPerformanceCompoundedReq: PropTypes.func,
  getTokenDecode: PropTypes.func,
  handleResetLoading: PropTypes.func,
  token: PropTypes.any
};

AnnualCompoundedContainer.defaultProps = {
  getPerformanceCompoundedReq: () => {},
  getTokenDecode: () => {},
  handleResetLoading: () => {},
  token: {}
};

const SelectDecodeToken = (state) => state.tools.getTokenDecode;
const SelectGetPerformanceCompounded = (state) =>
  state.tools.getPerformanceCompounded;
const SelectTrialUserDisableDownload = (state) => state.trial.trialUserDisableDownload;

const mapStateToProps = (state) => ({
  token: SelectDecodeToken(state),
  GetPerformanceCompounded: SelectGetPerformanceCompounded(state),
  trialUserDisableDownload: SelectTrialUserDisableDownload(state)
});

const mapDispatchToProps = {
  getTokenDecode,
  handleResetLoading,
  getPerformanceCompoundedReq
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnualCompoundedContainer);
