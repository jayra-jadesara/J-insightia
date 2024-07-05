import PropTypes, { array } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import InvestorOwnershipShort from '../../../components/Investor/InvestorOwnership/InvestorOwnershipShortFund';
import {
  getOwnershipShortFundDataReq,
  handleIsLoadingOwnership,
  handleResetAll
} from './InvestorOwnershipSlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { GETINVESTOR_OWNERSHIPSHORTFUNDDATA_INSIGHTIA } from '../../../constants/ProcedureConstant';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorOwnershipShortFundContainer = ({
  location,
  children,
  getOwnershipShortFundDataReq,
  ownershipShortFund_Data,
  ownershipShortFund_Heading,
  ownershipShortFund_Footer,
  ownershipShortFund_statusTop5,
  isLoadingOwnership,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  allowDownload,
  ownershipLongShort_TrialStatus,
  handleIsLoadingOwnership,
  handleResetAll,
  invShortFund
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetAll();
    async function getAll() {
      if (query.investor !== undefined && query.investor !== 'undefined') {
        handleIsLoadingOwnership();
        await getProcedureRunningEstimateTimeReq(
          GETINVESTOR_OWNERSHIPSHORTFUNDDATA_INSIGHTIA
        );
        await getOwnershipShortFundDataReq({
          investor_id: query.investor,
          filterRecords: true
        });
      }
    }
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [
    query.investor,
    getOwnershipShortFundDataReq,
    getProcedureRunningEstimateTimeReq,
    handleIsLoadingOwnership,
    handleResetAll
  ]);

  if (location !== undefined) {
    if (!query.investor || query.investor === 'undefined' || query.investor === undefined || query.investor === 'null') {
      return <Redirect to={INVESTOR_SEARCH} />;
    }
    return (
      <ErrorBoundary>
        <InvestorOwnershipShort
          children={children}
          location={location}
          getOwnershipShortFundDataReq={getOwnershipShortFundDataReq}
          ownershipShortFund_Data={ownershipShortFund_Data}
          ownershipShortFund_Footer={ownershipShortFund_Footer}
          ownershipShortFund_Heading={ownershipShortFund_Heading}
          ownershipShortFund_statusTop5={ownershipShortFund_statusTop5}
          loadingData={isLoadingOwnership}
          procedureRunningEstimateTime={procedureRunningEstimateTime}
          allowDownload={allowDownload}
          TrialStatus={ownershipLongShort_TrialStatus}
          handleIsLoadingOwnership={handleIsLoadingOwnership}
          invShortFund={invShortFund}
        />
      </ErrorBoundary>
    );
  }
};

InvestorOwnershipShortFundContainer.propTypes = {
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  children: PropTypes.any,
  location: PropTypes.object,
  getOwnershipShortFundDataReq: PropTypes.func,
  isLoadingOwnership: PropTypes.bool,
  ownershipShortFund_Footer: PropTypes.array,
  ownershipShortFund_Data: PropTypes.array,
  ownershipShortFund_Heading: PropTypes.object,
  allowDownload: PropTypes.bool,
  ownershipLongShort_TrialStatus: PropTypes.bool,
  handleIsLoadingOwnership: PropTypes.func,
  procedureRunningEstimateTime: PropTypes.number,
  ownershipShortFund_statusTop5: PropTypes.bool
};

InvestorOwnershipShortFundContainer.defaultProps = {
  handleIsLoadingOwnership: () => {},
  getProcedureRunningEstimateTimeReq: () => {},
  getOwnershipShortFundDataReq: () => {},
  location: {},
  isLoadingOwnership: true,
  ownershipShortFund_Footer: [],
  ownershipShortFund_Data: [],
  ownershipShortFund_Heading: {},
  allowDownload: false,
  ownershipLongShort_TrialStatus: false,
  procedureRunningEstimateTime: undefined,
  children: undefined,
  ownershipShortFund_statusTop5: false
};

const selectownershipShortFund_Data = (state) =>
  state.investorOwnership.ownershipShortFund_Data;
const selectownershipShortFund_Heading = (state) =>
  state.investorOwnership.ownershipShortFund_Heading;
const selectownershipShortFund_Footer = (state) =>
  state.investorOwnership.ownershipShortFund_Footer;
const selectownershipShortFund_statusTop5 = (state) =>
  state.investorOwnership.ownershipShortFund_statusTop5;

const selectIsLoadingOwnership = (state) =>
  state.investorOwnership.isLoadingOwnership;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectownershipLongShort_TrialStatus = (state) =>
  state.investorOwnership.ownershipLongShort_TrialStatus;
const SelectAllowDownload = (state) => state.investorOwnership.allowDownload;
const SelectInvShortFund = (state) => state.investorOwnership.invShortFund;

const mapStateToProps = (state) => ({
  ownershipShortFund_Data: selectownershipShortFund_Data(state),
  ownershipShortFund_Heading: selectownershipShortFund_Heading(state),
  ownershipShortFund_Footer: selectownershipShortFund_Footer(state),
  ownershipShortFund_statusTop5: selectownershipShortFund_statusTop5(state),

  allowDownload: SelectAllowDownload(state),
  ownershipLongShort_TrialStatus: SelectownershipLongShort_TrialStatus(state),
  isLoadingOwnership: selectIsLoadingOwnership(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  invShortFund: SelectInvShortFund(state),
});

const mapDispatchToProps = {
  getOwnershipShortFundDataReq,
  getProcedureRunningEstimateTimeReq,
  handleIsLoadingOwnership,
  handleResetAll
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorOwnershipShortFundContainer)
);
