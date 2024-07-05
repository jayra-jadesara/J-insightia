import PropTypes, { array } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { Redirect, withRouter } from 'react-router-dom';
import InvestorOwnershipLong from '../../../components/Investor/InvestorOwnership/InvestorOwnershipLongInvestor';
import { INVESTOR_SEARCH } from '../../../constants/PathsConstant';
import {
  getLatestOwnershipDateListReq,
  handleSetValueLatestOwnershipDate,
  handleSetValueChangeComparisionMonth,
  getOwnershipLongInvestorDataReq,
  handleIsLoadingOwnership,
  handleResetAll,
} from './InvestorOwnershipSlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { GETINVESTOR_OWNERSHIPLONGINVESTORDATA_INSIGHTIA } from '../../../constants/ProcedureConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const InvestorOwnershipLongInvestorContainer = ({
  location,
  children,
  getLatestOwnershipDateListReq,
  latestOwnershipDateList,
  setValue_latestOwnershipDate,
  changeComparisionMonthList,
  setValue_changeComparisionMonth,
  handleSetValueLatestOwnershipDate,
  handleSetValueChangeComparisionMonth,
  getOwnershipLongInvestorDataReq,
  ownershipLongInvestor_Data,
  ownershipLongInvestor_Heading,
  ownershipLongInvestor_Footer,
  isLoadingOwnership,
  getProcedureRunningEstimateTimeReq,
  procedureRunningEstimateTime,
  allowDownload,
  ownershipLongShort_TrialStatus,
  handleIsLoadingOwnership,
  ownershipLongInvestor_statusTop5,
  handleResetAll,
  invLongFund,
  invLongAccess,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.investor)) {
    return <Redirect to={INVESTOR_SEARCH} />;
  }

  useEffect(() => {
    handleResetAll();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function getAll() {
      if (query.investor !== undefined && query.investor !== 'undefined') {
        handleIsLoadingOwnership();
        await getProcedureRunningEstimateTimeReq(GETINVESTOR_OWNERSHIPLONGINVESTORDATA_INSIGHTIA);
        await getLatestOwnershipDateListReq();
        await getOwnershipLongInvestorDataReq({
          investor_id: query.investor,
          period_of_report: setValue_latestOwnershipDate.value,
          change_comparison: setValue_changeComparisionMonth.value,
          filterRecords: true,
        });
      }
    }
    getAll();
    return function cleanup() {
      abortController.abort();
    };
  }, [
    query.pid,
    getLatestOwnershipDateListReq,
    setValue_changeComparisionMonth.value,
    setValue_latestOwnershipDate.value,
    getOwnershipLongInvestorDataReq,
    getProcedureRunningEstimateTimeReq,
    handleIsLoadingOwnership,
    query.investor,
  ]);

  if (location !== undefined) {
    if (
      !query.investor ||
      query.investor === 'undefined' ||
      query.investor === undefined ||
      query.investor === 'null'
    ) {
      return <Redirect to={INVESTOR_SEARCH} />;
    }
    return (
      <ErrorBoundary>
        <InvestorOwnershipLong
          children={children}
          location={location}
          latestOwnershipDateList={latestOwnershipDateList}
          setValue_latestOwnershipDate={setValue_latestOwnershipDate}
          changeComparisionMonthList={changeComparisionMonthList}
          setValue_changeComparisionMonth={setValue_changeComparisionMonth}
          handleSetValueLatestOwnershipDate={handleSetValueLatestOwnershipDate}
          handleSetValueChangeComparisionMonth={handleSetValueChangeComparisionMonth}
          getOwnershipLongInvestorDataReq={getOwnershipLongInvestorDataReq}
          ownershipLongInvestor_Data={ownershipLongInvestor_Data}
          ownershipLongInvestor_Footer={ownershipLongInvestor_Footer}
          ownershipLongInvestor_Heading={ownershipLongInvestor_Heading}
          loadingData={isLoadingOwnership}
          procedureRunningEstimateTime={procedureRunningEstimateTime}
          allowDownload={allowDownload}
          TrialStatus={ownershipLongShort_TrialStatus}
          handleIsLoadingOwnership={handleIsLoadingOwnership}
          ownershipLongInvestor_statusTop5={ownershipLongInvestor_statusTop5}
          invLongFund={invLongFund}
          invLongAccess={invLongAccess}
        />
      </ErrorBoundary>
    );
  }
};

const selectLatestOwnershipDateList = (state) => state.investorOwnership.latestOwnershipDateList;
const selectSetValue_latestOwnershipDate = (state) => state.investorOwnership.setValue_latestOwnershipDate;
const selectChangeComparisionMonthList = (state) => state.investorOwnership.changeComparisionMonthList;
const selectSetValue_changeComparisionMonths = (state) => state.investorOwnership.setValue_changeComparisionMonth;
const selectownershipLongInvestor_Data = (state) => state.investorOwnership.ownershipLongInvestor_Data;
const selectownershipLongInvestor_Heading = (state) => state.investorOwnership.ownershipLongInvestor_Heading;
const selectownershipLongInvestor_Footer = (state) => state.investorOwnership.ownershipLongInvestor_Footer;
const selectownershipLongInvestor_statusTop5 = (state) => state.investorOwnership.ownershipLongInvestor_statusTop5;

const selectIsLoadingOwnership = (state) => state.investorOwnership.isLoadingOwnership;
const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;
const SelectownershipLongShort_TrialStatus = (state) => state.investorOwnership.ownershipLongShort_TrialStatus;
const SelectAllowDownload = (state) => state.investorOwnership.allowDownload;
const SelectInvLongFund = (state) => state.investorOwnership.invLongFund;
const SelectInvLongAccess = (state) => state.investorOwnership.invLongAccess;

const mapStateToProps = (state) => ({
  latestOwnershipDateList: selectLatestOwnershipDateList(state),
  setValue_latestOwnershipDate: selectSetValue_latestOwnershipDate(state),
  changeComparisionMonthList: selectChangeComparisionMonthList(state),
  setValue_changeComparisionMonth: selectSetValue_changeComparisionMonths(state),
  ownershipLongInvestor_Data: selectownershipLongInvestor_Data(state),
  ownershipLongInvestor_Heading: selectownershipLongInvestor_Heading(state),
  ownershipLongInvestor_Footer: selectownershipLongInvestor_Footer(state),
  ownershipLongInvestor_statusTop5: selectownershipLongInvestor_statusTop5(state),

  allowDownload: SelectAllowDownload(state),
  ownershipLongShort_TrialStatus: SelectownershipLongShort_TrialStatus(state),
  isLoadingOwnership: selectIsLoadingOwnership(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  invLongFund: SelectInvLongFund(state),
  invLongAccess: SelectInvLongAccess(state),
});

const mapDispatchToProps = {
  getLatestOwnershipDateListReq,
  handleSetValueLatestOwnershipDate,
  handleSetValueChangeComparisionMonth,
  getOwnershipLongInvestorDataReq,
  getProcedureRunningEstimateTimeReq,
  handleIsLoadingOwnership,
  handleResetAll,
};

InvestorOwnershipLongInvestorContainer.propTypes = {
  getProcedureRunningEstimateTimeReq: PropTypes.func,
  children: PropTypes.any,
  location: PropTypes.object,
  getLatestOwnershipDateListReq: PropTypes.func,
  getOwnershipLongInvestorDataReq: PropTypes.func,
  handleSetValueLatestOwnershipDate: PropTypes.func,
  handleSetValueChangeComparisionMonth: PropTypes.func,
  latestOwnershipDateList: PropTypes.array,
  setValue_latestOwnershipDate: PropTypes.object,
  changeComparisionMonthList: PropTypes.array,
  setValue_changeComparisionMonth: PropTypes.object,
  isLoadingOwnership: PropTypes.bool,
  ownershipLongInvestor_Footer: PropTypes.array,
  ownershipLongInvestor_Data: PropTypes.array,
  ownershipLongInvestor_Heading: PropTypes.object,
  allowDownload: PropTypes.bool,
  ownershipLongShort_TrialStatus: PropTypes.bool,
  handleIsLoadingOwnership: PropTypes.func,
  procedureRunningEstimateTime: PropTypes.number,
  ownershipLongInvestor_statusTop5: PropTypes.bool,
};

InvestorOwnershipLongInvestorContainer.defaultProps = {
  handleIsLoadingOwnership: () => {},
  getProcedureRunningEstimateTimeReq: () => {},
  getLatestOwnershipDateListReq: () => {},
  handleSetValueLatestOwnershipDate: () => {},
  handleSetValueChangeComparisionMonth: () => {},
  getOwnershipLongInvestorDataReq: () => {},
  latestOwnershipDateList: [],
  setValue_latestOwnershipDate: true,
  changeComparisionMonthList: [],
  setValue_changeComparisionMonth: true,
  location: {},
  isLoadingOwnership: true,
  ownershipLongInvestor_Footer: [],
  ownershipLongInvestor_Data: [],
  ownershipLongInvestor_Heading: {},
  allowDownload: false,
  ownershipLongShort_TrialStatus: false,
  procedureRunningEstimateTime: undefined,
  children: undefined,
  ownershipLongInvestor_statusTop5: false,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorOwnershipLongInvestorContainer));
