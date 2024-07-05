import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EventElements from '../../../components/MyAlert/Components/eventElements';
import {
    getAlerModulAccessReq,
    getAlertInboxNameReq,
    getAlertFilingDetailReq,
    getSampleDataReq
} from './MyAlertSlice';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';


const EventElementContainer = ({
    getAlerModulAccessReq,
    getAlertInboxNameReq,
    getAlertFilingDetailReq,
    getSampleDataReq,
    lstSampleData,
    ...props
    }) => {


    useEffect(() => {
        getAlerModulAccessReq();
        getAlertInboxNameReq();
        getAlertFilingDetailReq();
        getSampleDataReq();
    }, [])


    return (
        <ErrorBoundary>
        <EventElements
        lstSampleData ={lstSampleData}
        props ={props}
        />
          </ErrorBoundary>

    )
};

const selectLstAlertName = (state) => state.myAlert.lstAlertName;
const selectDdlLstAlertName = (state) => state.myAlert.ddlLstAlertName;
const selectLstFiling = (state) => state.myAlert.lstFiling;

//
const selectLstSampleData = (state) => state.myAlert.lstSampleData;

const mapStateToProps = (state) => ({
  lstAlertName: selectLstAlertName(state),
  ddlLstAlertName: selectDdlLstAlertName(state),
  lstFiling: selectLstFiling(state),
  lstSampleData: selectLstSampleData(state)
});

const mapDispatchToProps = {
  getAlerModulAccessReq,
  getAlertInboxNameReq,
  getAlertFilingDetailReq,
  getSampleDataReq
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventElementContainer));
