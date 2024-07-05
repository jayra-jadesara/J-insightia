import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import InboxAlerts from '../../../components/MyAlert/Alert/AlertInbox';
import {
  getAlerModulAccessReq,
  getAlertInboxNameReq,
  getAlertFilingDetailReq,
  getAlertInboxTypeReq,
  getInboxAlertByUserReq,
  handleAlertByType,
  handleAlertByName,
  getElementDetailReq,
  updateAlertStatusReq,
  handleResetState,
  handleResetelementDetail
} from './InboxAlertSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const InboxAlertContainer = ({
  getAlerModulAccessReq,
  getAlertInboxNameReq,
  getAlertFilingDetailReq,
  getAlertInboxTypeReq,
  getInboxAlertByUserReq,
  handleAlertByType,
  handleAlertByName,
  getElementDetailReq,
  updateAlertStatusReq,
  handleResetState,
  handleResetelementDetail,
  ...props
}) => {
  useEffect(() => {
    getAlerModulAccessReq();
    getAlertFilingDetailReq();
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const abortController = new AbortController();
    getAlertInboxNameReq({
      element_type_id: props.selectedLstAlertByType !== null ? props.selectedLstAlertByType.value : null
    });
    getAlertInboxTypeReq({ alert_id: props.selectedLstAlertName !== null ? props.selectedLstAlertName.value : null });
    if (props.lstAlertDetails === undefined) {
      getInboxAlertByUserReq({
        alert_id: props.selectedLstAlertName !== null ? props.selectedLstAlertName.value : null,
        element_type_id: props.selectedLstAlertByType !== null ? props.selectedLstAlertByType.value : null,
        cancelToken: source.token
      });
    }
    return function cleanup() {
      abortController.abort();
      source.cancel();
    };
  }, [props.selectedLstAlertByType, props.selectedLstAlertName]);

  return (
    <ErrorBoundary>
    <InboxAlerts
      handleAlertByType={handleAlertByType}
      handleAlertByName={handleAlertByName}
      getElementDetailReq={getElementDetailReq}
      getInboxAlertByUserReq={getInboxAlertByUserReq}
      getAlertInboxTypeReq={getAlertInboxTypeReq}
      getAlertInboxNameReq={getAlertInboxNameReq}
      updateAlertStatusReq={updateAlertStatusReq}
      handleResetState={handleResetState}
      handleResetelementDetail={handleResetelementDetail}
      {...props}
    />
    </ErrorBoundary>
  );
};
const selectLstAlertName = (state) => state.inboxAlert.lstAlertName;
const selectDdlLstAlertName = (state) => state.inboxAlert.ddlLstAlertName;
const selectLstFiling = (state) => state.inboxAlert.lstFiling;
const selectLstAlertByType = (state) => state.inboxAlert.lstAlertByType;
const selectLstAlertInboxByUser = (state) => state.inboxAlert.lstAlertInboxByUser;
const selectSelectedLstAlertName = (state) => state.inboxAlert.selectedLstAlertName;
const selectSelectedLstAlertByType = (state) => state.inboxAlert.selectedLstAlertByType;
const selectLstAlertElementID = (state) => state.inboxAlert.lstAlertElementId;
const selectLstAlertDetails = (state) => state.inboxAlert.lstAlertDetails;
const selectLstElementDetail = (state) => state.inboxAlert.lstElementDetail;
const selectElementTypeId = (state) => state.inboxAlert.elementTypeId;
const selectPid = (state) => state.inboxAlert.cmp_pid;
const selectInvestorId = (state) => state.inboxAlert.investor_id;
const selectCountryFlag = (state) => state.inboxAlert.country_flag;
const selectFilling_header = (state) => state.inboxAlert.filling_header;
const selectFiling_date = (state) => state.inboxAlert.filing_date;
const selectModule_name = (state) => state.inboxAlert.module_name;
const selectArrayIndex = (state) => state.inboxAlert.arrayIndex;
const selectAlertData = (state) => state.inboxAlert.alertData;

const mapStateToProps = (state) => ({
  module_name: selectModule_name(state),
  lstAlertName: selectLstAlertName(state),
  ddlLstAlertName: selectDdlLstAlertName(state),
  lstFiling: selectLstFiling(state),
  lstAlertInboxByUser: selectLstAlertInboxByUser(state),
  lstAlertByType: selectLstAlertByType(state),
  selectedLstAlertName: selectSelectedLstAlertName(state),
  selectedLstAlertByType: selectSelectedLstAlertByType(state),
  lstAlertElementId: selectLstAlertElementID(state),
  lstAlertDetails: selectLstAlertDetails(state),
  lstElementDetail: selectLstElementDetail(state),
  elementTypeId: selectElementTypeId(state),
  cmp_pid: selectPid(state),
  investor_id: selectInvestorId(state),
  country_flag: selectCountryFlag(state),
  filling_header: selectFilling_header(state),
  filing_date: selectFiling_date(state),
  arrayIndex: selectArrayIndex(state),
  alertData: selectAlertData(state)
});

InboxAlertContainer.propTypes = {};

InboxAlertContainer.defaultProps = {};

const mapDispatchToProps = {
    getAlerModulAccessReq,
    getAlertInboxNameReq,
    getAlertFilingDetailReq,
    getAlertInboxTypeReq,
    getInboxAlertByUserReq,
    handleAlertByType,
    handleAlertByName,
    getElementDetailReq,
    updateAlertStatusReq,
    handleResetState,
    handleResetelementDetail

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InboxAlertContainer));
