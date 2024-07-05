import PropTypes, { array } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import OwnershipShortFund from '../../../components/Company/Ownership/OwnershipShortFund';
import {
  getOwnershipShortFundDataReq,
  handleIsLoadingOwnership,
  handleResetOwenerShip
} from '../CompanySlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { GETOWNERSHIPSHORTFUNDDATA_INSIGHTIA } from '../../../constants/ProcedureConstant';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const OwnershipShortFundContainer = ({
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
  handleResetOwenerShip,
  ShortFund
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
        await getProcedureRunningEstimateTimeReq(
          GETOWNERSHIPSHORTFUNDDATA_INSIGHTIA
        );
        await getOwnershipShortFundDataReq({
          pid: query.pid,
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
    getOwnershipShortFundDataReq,
    getProcedureRunningEstimateTimeReq,
    handleIsLoadingOwnership,
    handleResetOwenerShip
  ]);

  return (
    <ErrorBoundary>
      <OwnershipShortFund
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
        ShortFund={ShortFund}
      />
    </ErrorBoundary>
  );
};

OwnershipShortFundContainer.propTypes = {
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

OwnershipShortFundContainer.defaultProps = {
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
  state.company.ownershipShortFund_Data;
const selectownershipShortFund_Heading = (state) =>
  state.company.ownershipShortFund_Heading;
const selectownershipShortFund_Footer = (state) =>
  state.company.ownershipShortFund_Footer;
const selectownershipShortFund_statusTop5 = (state) =>
  state.company.ownershipShortFund_statusTop5;

const selectIsLoadingOwnership = (state) => state.company.isLoadingOwnership;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectownershipLongShort_TrialStatus = (state) =>
  state.company.ownershipLongShort_TrialStatus;
const SelectAllowDownload = (state) => state.company.allowDownload;
const selectShortFund = (state) => state.company.ShortFund;

const mapStateToProps = (state) => ({
  ownershipShortFund_Data: selectownershipShortFund_Data(state),
  ownershipShortFund_Heading: selectownershipShortFund_Heading(state),
  ownershipShortFund_Footer: selectownershipShortFund_Footer(state),
  ownershipShortFund_statusTop5: selectownershipShortFund_statusTop5(state),

  allowDownload: SelectAllowDownload(state),
  ownershipLongShort_TrialStatus: SelectownershipLongShort_TrialStatus(state),
  isLoadingOwnership: selectIsLoadingOwnership(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  ShortFund: selectShortFund(state)
});

const mapDispatchToProps = {
  getOwnershipShortFundDataReq,
  getProcedureRunningEstimateTimeReq,
  handleIsLoadingOwnership,
  handleResetOwenerShip
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OwnershipShortFundContainer)
);
