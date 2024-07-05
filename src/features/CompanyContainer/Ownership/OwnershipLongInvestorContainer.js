import PropTypes, { array } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import OwnershipLongInvestor from '../../../components/Company/Ownership/OwnershipLongInvestor';
import {
  getLatestOwnershipDateListReq,
  handleSetValueLatestOwnershipDate,
  handleSetValueChangeComparisionMonth,
  getOwnershipLongInvestorDataReq,
  handleIsLoadingOwnership,
  handleResetOwenerShip
} from '../CompanySlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { GETOWNERSHIPLONGINVESTORDATA_INSIGHTIA } from '../../../constants/ProcedureConstant';
import pathConst from '../../../constants/PathsConstant';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

const OwnershipLongInvestorContainer = ({
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
  handleResetOwenerShip,
  LongFund,
  longAccess
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });

  if (!isIdNotNullOrUndefined(query.pid)) {
    return <Redirect to={pathConst.COMPANY_SEARCH} />;
  }

  useEffect(() => {
    const abortController = new AbortController();
    handleResetOwenerShip();
    async function getAll() {
      if (query.pid !== undefined) {
        handleIsLoadingOwnership();
        await getProcedureRunningEstimateTimeReq(GETOWNERSHIPLONGINVESTORDATA_INSIGHTIA);
        await getLatestOwnershipDateListReq();
        await getOwnershipLongInvestorDataReq({
          pid: query.pid,
          period_of_report: setValue_latestOwnershipDate.value,
          change_comparison: setValue_changeComparisionMonth.value,
          filterRecords: true
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
    handleResetOwenerShip
  ]);

  return (
    <ErrorBoundary>
      <OwnershipLongInvestor
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
        LongFund={LongFund}
        longAccess={longAccess}
      />
    </ErrorBoundary>
  );
};

OwnershipLongInvestorContainer.propTypes = {
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
  ownershipLongInvestor_statusTop5: PropTypes.bool
};

OwnershipLongInvestorContainer.defaultProps = {
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
  ownershipLongInvestor_statusTop5: false
};

const selectLatestOwnershipDateList = (state) => state.company.latestOwnershipDateList;
const selectSetValue_latestOwnershipDate = (state) => state.company.setValue_latestOwnershipDate;
const selectChangeComparisionMonthList = (state) => state.company.changeComparisionMonthList;
const selectSetValue_changeComparisionMonths = (state) => state.company.setValue_changeComparisionMonth;
const selectownershipLongInvestor_Data = (state) => state.company.ownershipLongInvestor_Data;
const selectownershipLongInvestor_Heading = (state) => state.company.ownershipLongInvestor_Heading;
const selectownershipLongInvestor_Footer = (state) => state.company.ownershipLongInvestor_Footer;
const selectownershipLongInvestor_statusTop5 = (state) => state.company.ownershipLongInvestor_statusTop5;

const selectIsLoadingOwnership = (state) => state.company.isLoadingOwnership;
const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;
const SelectownershipLongShort_TrialStatus = (state) => state.company.ownershipLongShort_TrialStatus;
const SelectAllowDownload = (state) => state.company.allowDownload;
const selectLongFund = (state) => state.company.LongFund;
const selectLongAccess = (state) => state.company.longAccess;

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
  LongFund: selectLongFund(state),
  longAccess: selectLongAccess(state)
});

const mapDispatchToProps = {
  getLatestOwnershipDateListReq,
  handleSetValueLatestOwnershipDate,
  handleSetValueChangeComparisionMonth,
  getOwnershipLongInvestorDataReq,
  getProcedureRunningEstimateTimeReq,
  handleIsLoadingOwnership,
  handleResetOwenerShip
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnershipLongInvestorContainer));
