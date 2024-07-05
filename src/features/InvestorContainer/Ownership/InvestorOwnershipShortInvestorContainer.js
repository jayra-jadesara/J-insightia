import PropTypes, { array } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import InvestorOwnershipShortInvestor from '../../../components/Investor/InvestorOwnership/InvestorOwnershipShortInvestor';
import {
  getOwnershipShortInvestorDataReq,
  handleIsLoadingOwnership,
  handleResetAll
} from './InvestorOwnershipSlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { GETINVESTOR_OWNERSHIPSHORTINVESTORDATA_INSIGHTIA } from '../../../constants/ProcedureConstant';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorOwnershipShortInvestorContainer = ({
  location,
  children,
  getOwnershipShortInvestorDataReq,
  ownershipShortInvestor_Data,
  ownershipShortInvestor_Heading,
  ownershipShortInvestor_Footer,
  ownershipShortInvestor_statusTop5,
  isLoadingOwnership,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  allowDownload,
  ownershipLongShort_TrialStatus,
  handleIsLoadingOwnership,
  handleResetAll,
  invShortFund,
  invShortAccess
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
          GETINVESTOR_OWNERSHIPSHORTINVESTORDATA_INSIGHTIA
        );
        await getOwnershipShortInvestorDataReq({
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
    getOwnershipShortInvestorDataReq,
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
        <InvestorOwnershipShortInvestor
          children={children}
          location={location}
          getOwnershipShortInvestorDataReq={getOwnershipShortInvestorDataReq}
          ownershipShortInvestor_Data={ownershipShortInvestor_Data}
          ownershipShortInvestor_Footer={ownershipShortInvestor_Footer}
          ownershipShortInvestor_Heading={ownershipShortInvestor_Heading}
          ownershipShortInvestor_statusTop5={ownershipShortInvestor_statusTop5}
          loadingData={isLoadingOwnership}
          procedureRunningEstimateTime={procedureRunningEstimateTime}
          allowDownload={allowDownload}
          TrialStatus={ownershipLongShort_TrialStatus}
          handleIsLoadingOwnership={handleIsLoadingOwnership}
          invShortFund={invShortFund}
          invShortAccess={invShortAccess}
        />
      </ErrorBoundary>
    );
  }
};

InvestorOwnershipShortInvestorContainer.propTypes = {
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  children: PropTypes.any,
  location: PropTypes.object,
  getOwnershipShortInvestorDataReq: PropTypes.func,
  isLoadingOwnership: PropTypes.bool,
  ownershipShortInvestor_Footer: PropTypes.array,
  ownershipShortInvestor_Data: PropTypes.array,
  ownershipShortInvestor_Heading: PropTypes.object,
  allowDownload: PropTypes.bool,
  ownershipLongShort_TrialStatus: PropTypes.bool,
  handleIsLoadingOwnership: PropTypes.func,
  procedureRunningEstimateTime: PropTypes.number,
  ownershipShortInvestor_statusTop5: PropTypes.bool
};

InvestorOwnershipShortInvestorContainer.defaultProps = {
  handleIsLoadingOwnership: () => {},
  getProcedureRunningEstimateTimeReq: () => {},
  getOwnershipShortInvestorDataReq: () => {},
  location: {},
  isLoadingOwnership: true,
  ownershipShortInvestor_Footer: [],
  ownershipShortInvestor_Data: [],
  ownershipShortInvestor_Heading: {},
  allowDownload: false,
  ownershipLongShort_TrialStatus: false,
  procedureRunningEstimateTime: undefined,
  children: undefined,
  ownershipShortInvestor_statusTop5: false
};

const selectOwnershipShortInvestor_Data = (state) =>
  state.investorOwnership.ownershipShortInvestor_Data;
const selectOwnershipShortInvestor_Heading = (state) =>
  state.investorOwnership.ownershipShortInvestor_Heading;
const selectOwnershipShortInvestor_Footer = (state) =>
  state.investorOwnership.ownershipShortInvestor_Footer;
const selectOwnershipShortInvestor_statusTop5 = (state) =>
  state.investorOwnership.ownershipShortInvestor_statusTop5;

const selectIsLoadingOwnership = (state) =>
  state.investorOwnership.isLoadingOwnership;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectownershipLongShort_TrialStatus = (state) =>
  state.investorOwnership.ownershipLongShort_TrialStatus;
const SelectAllowDownload = (state) => state.investorOwnership.allowDownload;
const SelectInvShortFund = (state) => state.investorOwnership.invShortFund;
const SelectInvShortAccess = (state) => state.investorOwnership.invShortAccess;

const mapStateToProps = (state) => ({
  ownershipShortInvestor_Data: selectOwnershipShortInvestor_Data(state),
  ownershipShortInvestor_Heading: selectOwnershipShortInvestor_Heading(state),
  ownershipShortInvestor_Footer: selectOwnershipShortInvestor_Footer(state),
  ownershipShortInvestor_statusTop5:
    selectOwnershipShortInvestor_statusTop5(state),

  allowDownload: SelectAllowDownload(state),
  ownershipLongShort_TrialStatus: SelectownershipLongShort_TrialStatus(state),
  isLoadingOwnership: selectIsLoadingOwnership(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  invShortFund: SelectInvShortFund(state),
  invShortAccess: SelectInvShortAccess(state)
});

const mapDispatchToProps = {
  getOwnershipShortInvestorDataReq,
  getProcedureRunningEstimateTimeReq,
  handleIsLoadingOwnership,
  handleResetAll
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InvestorOwnershipShortInvestorContainer)
);
