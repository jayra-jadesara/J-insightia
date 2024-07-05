import PropTypes, { array } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import OwnershipLongFund from '../../../components/Company/Ownership/OwnershipLongFund';
import {
  getOwnershipLongFundDataReq,
  handleIsLoadingOwnership,
  handleResetOwenerShip
} from '../CompanySlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { GETOWNERSHIPLONGFUNDDATA_INSIGHTIA } from '../../../constants/ProcedureConstant';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const OwnershipLongFundContainer = ({
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
  handleResetOwenerShip,
  LongFund
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
          GETOWNERSHIPLONGFUNDDATA_INSIGHTIA
        );
        await getOwnershipLongFundDataReq({
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
    getOwnershipLongFundDataReq,
    getProcedureRunningEstimateTimeReq,
    handleIsLoadingOwnership,
    handleResetOwenerShip
  ]);

  return (
    <ErrorBoundary>
    <OwnershipLongFund
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
      LongFund={LongFund}
    />
    </ErrorBoundary>
  );
};

OwnershipLongFundContainer.propTypes = {
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

OwnershipLongFundContainer.defaultProps = {
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
  state.company.ownershipLongFund_Data;
const selectOwnershipLongFund_Heading = (state) =>
  state.company.ownershipLongFund_Heading;
const selectOwnershipLongFund_Footer = (state) =>
  state.company.ownershipLongFund_Footer;
const selectOwnershipLongFund_statusTop5 = (state) =>
  state.company.ownershipLongFund_statusTop5;

const selectIsLoadingOwnership = (state) => state.company.isLoadingOwnership;
const SelectProcedureRunningEstimateTime = (state) =>
  state.headerTitle.procedureRunningEstimateTime;
const SelectownershipLongShort_TrialStatus = (state) =>
  state.company.ownershipLongShort_TrialStatus;
const SelectAllowDownload = (state) => state.company.allowDownload;
const selectLongFund = (state) => state.company.LongFund;

const mapStateToProps = (state) => ({
  ownershipLongFund_Data: selectOwnershipLongFund_Data(state),
  ownershipLongFund_Heading: selectOwnershipLongFund_Heading(state),
  ownershipLongFund_Footer: selectOwnershipLongFund_Footer(state),
  ownershipLongFund_statusTop5: selectOwnershipLongFund_statusTop5(state),

  allowDownload: SelectAllowDownload(state),
  ownershipLongShort_TrialStatus: SelectownershipLongShort_TrialStatus(state),
  isLoadingOwnership: selectIsLoadingOwnership(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  LongFund: selectLongFund(state),
});

const mapDispatchToProps = {
  getOwnershipLongFundDataReq,
  getProcedureRunningEstimateTimeReq,
  handleIsLoadingOwnership,
  handleResetOwenerShip
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OwnershipLongFundContainer)
);
