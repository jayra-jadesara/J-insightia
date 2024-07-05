import PropTypes, { array } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import qs from 'qs';
import OwnershipShortInvestor from '../../../components/Company/Ownership/OwnershipShortInvestor';
import { getOwnershipShortInvestorDataReq, handleIsLoadingOwnership, handleResetOwenerShip } from '../CompanySlice';
import { getProcedureRunningEstimateTimeReq } from '../../General/TitleSlice';
import { GETOWNERSHIPSHORTINVESTORDATA_INSIGHTIA } from '../../../constants/ProcedureConstant';
import pathConst from '../../../constants/PathsConstant';
import { isIdNotNullOrUndefined } from '../../../utils/general-util';

import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const OwnershipShortInvestorContainer = ({
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
  handleResetOwenerShip,
  ShortFund,
  shortAccess
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
        await getProcedureRunningEstimateTimeReq(GETOWNERSHIPSHORTINVESTORDATA_INSIGHTIA);
        await getOwnershipShortInvestorDataReq({
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
    getOwnershipShortInvestorDataReq,
    getProcedureRunningEstimateTimeReq,
    handleIsLoadingOwnership,
    handleResetOwenerShip
  ]);

  return (
    <ErrorBoundary>
      <OwnershipShortInvestor
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
        ShortFund={ShortFund}
        shortAccess={shortAccess}
      />
    </ErrorBoundary>
  );
};

OwnershipShortInvestorContainer.propTypes = {
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

OwnershipShortInvestorContainer.defaultProps = {
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

const selectOwnershipShortInvestor_Data = (state) => state.company.ownershipShortInvestor_Data;
const selectOwnershipShortInvestor_Heading = (state) => state.company.ownershipShortInvestor_Heading;
const selectOwnershipShortInvestor_Footer = (state) => state.company.ownershipShortInvestor_Footer;
const selectOwnershipShortInvestor_statusTop5 = (state) => state.company.ownershipShortInvestor_statusTop5;

const selectIsLoadingOwnership = (state) => state.company.isLoadingOwnership;
const SelectProcedureRunningEstimateTime = (state) => state.headerTitle.procedureRunningEstimateTime;
const SelectownershipLongShort_TrialStatus = (state) => state.company.ownershipLongShort_TrialStatus;
const SelectAllowDownload = (state) => state.company.allowDownload;
const selectShortFund = (state) => state.company.ShortFund;
const selectShortAccess = (state) => state.company.shortAccess;
const mapStateToProps = (state) => ({
  ownershipShortInvestor_Data: selectOwnershipShortInvestor_Data(state),
  ownershipShortInvestor_Heading: selectOwnershipShortInvestor_Heading(state),
  ownershipShortInvestor_Footer: selectOwnershipShortInvestor_Footer(state),
  ownershipShortInvestor_statusTop5: selectOwnershipShortInvestor_statusTop5(state),

  allowDownload: SelectAllowDownload(state),
  ownershipLongShort_TrialStatus: SelectownershipLongShort_TrialStatus(state),
  isLoadingOwnership: selectIsLoadingOwnership(state),
  procedureRunningEstimateTime: SelectProcedureRunningEstimateTime(state),
  ShortFund: selectShortFund(state),
  shortAccess: selectShortAccess(state)
});

const mapDispatchToProps = {
  getOwnershipShortInvestorDataReq,
  getProcedureRunningEstimateTimeReq,
  handleIsLoadingOwnership,
  handleResetOwenerShip
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnershipShortInvestorContainer));
