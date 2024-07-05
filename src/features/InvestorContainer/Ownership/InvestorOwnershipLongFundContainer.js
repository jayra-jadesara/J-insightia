import PropTypes, { array } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import InvestorOwnershipLongFund from '../../../components/Investor/InvestorOwnership/InvestorOwnershipLongFund';
import {
  getOwnershipLongFundDataReq,
  handleIsLoadingOwnership,
  handleResetAll
} from './InvestorOwnershipSlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { GETINVESTOR_OWNERSHIPLONGFUNDDATA_INSIGHTIA } from '../../../constants/ProcedureConstant';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorOwnershipLongFundContainer = ({
  location,
  children,
  getOwnershipLongFundDataReq,
  ownershipLongFund_Data,
  ownershipLongFund_Heading,
  ownershipLongFund_Footer,
  isLoadingOwnership,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  allowDownload,
  ownershipLongShort_TrialStatus,
  handleIsLoadingOwnership,
  ownershipLongFund_statusTop5,
  handleResetAll,
  invLongFund
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
          GETINVESTOR_OWNERSHIPLONGFUNDDATA_INSIGHTIA
        );
        await getOwnershipLongFundDataReq({
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
    getOwnershipLongFundDataReq,
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
        <InvestorOwnershipLongFund
          children={children}
          location={location}
          getOwnershipLongFundDataReq={getOwnershipLongFundDataReq}
          ownershipLongFund_Data={ownershipLongFund_Data}
          ownershipLongFund_Footer={ownershipLongFund_Footer}
          ownershipLongFund_Heading={ownershipLongFund_Heading}
          loadingData={isLoadingOwnership}
          procedureRunningEstimateTime={procedureRunningEstimateTime}
          allowDownload={allowDownload}
          TrialStatus={ownershipLongShort_TrialStatus}
          handleIsLoadingOwnership={handleIsLoadingOwnership}
          ownershipLongFund_statusTop5={ownershipLongFund_statusTop5}
          invLongFund={invLongFund}
        />
      </ErrorBoundary>
    );
  }
};

InvestorOwnershipLongFundContainer.propTypes = {
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  children: PropTypes.any,
  location: PropTypes.object,
  getOwnershipLongFundDataReq: PropTypes.func,
  isLoadingOwnership: PropTypes.bool,
  ownershipLongFund_Footer: PropTypes.array,
  ownershipLongFund_Data: PropTypes.array,
  ownershipLongFund_Heading: PropTypes.object,
  allowDownload: PropTypes.bool,
  ownershipLongShort_TrialStatus: PropTypes.bool,
  handleIsLoadingOwnership: PropTypes.func,
  procedureRunningEstimateTime: PropTypes.number,
  ownershipLongFund_statusTop5: PropTypes.bool
};

InvestorOwnershipLongFundContainer.defaultProps = {
  handleIsLoadingOwnership: () => {},
  getProcedureRunningEstimateTimeReq: () => {},
  getOwnershipLongFundDataReq: () => {},
  location: {},
  isLoadingOwnership: true,
  ownershipLongFund_Footer: [],
  ownershipLongFund_Data: [],
  ownershipLongFund_Heading: {},
  allowDownload: false,
  ownershipLongShort_TrialStatus: false,
  procedureRunningEstimateTime: undefined,
  children: undefined,
  ownershipLongFund_statusTop5: false
};

const selectOwnershipLongFund_Data = (state) =>
  state.investorOwnership.ownershipLongFund_Data;
const selectOwnershipLongFund_Heading = (state) =>
  state.investorOwnership.ownershipLongFund_Heading;
const selectOwnershipLongFund_Footer = (state) =>
  state.investorOwnership.ownershipLongFund_Footer;
const selectOwnershipLongFund_statusTop5 = (state) =>
  state.investorOwnership.ownershipLongFund_statusTop5;

const selectIsLoadingOwnership = (state) =>
  state.investorOwnership.isLoadingOwnership;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectownershipLongShort_TrialStatus = (state) =>
  state.investorOwnership.ownershipLongShort_TrialStatus;
const SelectAllowDownload = (state) => state.investorOwnership.allowDownload;
const SelectInvLongFund = (state) => state.investorOwnership.invLongFund;

const mapStateToProps = (state) => ({
  ownershipLongFund_Data: selectOwnershipLongFund_Data(state),
  ownershipLongFund_Heading: selectOwnershipLongFund_Heading(state),
  ownershipLongFund_Footer: selectOwnershipLongFund_Footer(state),
  ownershipLongFund_statusTop5: selectOwnershipLongFund_statusTop5(state),

  allowDownload: SelectAllowDownload(state),
  ownershipLongShort_TrialStatus: SelectownershipLongShort_TrialStatus(state),
  isLoadingOwnership: selectIsLoadingOwnership(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  invLongFund: SelectInvLongFund(state)
});

const mapDispatchToProps = {
  getOwnershipLongFundDataReq,
  getProcedureRunningEstimateTimeReq,
  handleIsLoadingOwnership,
  handleResetAll
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorOwnershipLongFundContainer)
);
