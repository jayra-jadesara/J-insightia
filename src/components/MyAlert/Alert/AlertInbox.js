import React, { useState } from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import MultipleAlerts from '../Components/MultipleAlerts';
import { MD_MIN_WIDTH } from '../../../constants/ScreenSizeConstant';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';
import DropdownList from '../../GeneralForm/DropdownList';
import bn from '../../../utils/bemnames';
import EventElements from '../Components/eventElements';
import LightBoxPDFViewer from '../../GeneralForm/LightBoxPDFViewer';
import { DOCS_INSIGHTIA_REDLINE_REPORTS } from '../../../constants/PathsConstant';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('alertInbox');

const AlertInbox = (props) => {
  const [isHide, setIsHide] = useState(false);

  // pdf viewer
  const [isPDFModal, setIsPDFModal] = useState(false);
  const [pdfFileName, setPDFFileName] = useState('');
  const [pdfTitleName, setPDFTitleName] = useState('');
  const { width } = useWindowDimensions();

  const handleOnHide = () => {
    setIsHide(false);
  };

  const initialisePDFModal = (fileName, desc) => {
    setIsPDFModal(true);
    setPDFFileName(fileName);
    setPDFTitleName(desc);
  };
  const handlePDFModal = () => {
    setIsPDFModal(!isPDFModal);
  };

  return (
    <Page key={1} className={bem.b('row')}>
      {width > MD_MIN_WIDTH ? (
        <>
          <div className='col-xl-6 col-md-6 col-sm-12'>
            <div className='row pt-2 mb-5'>
              <div className='col-xl-6 col-md-6 col-sm-12 mb-3'>
                <DropdownList
                  handleChange={async (e) => {
                    await props.handleAlertByName(e);
                  }}
                  isMulti={false}
                  options={props.lstAlertName}
                  Dvalue={props.selectedLstAlertName}
                  maxHeight={420}
                  placeholder='Select Alert By Name...'
                />
              </div>
              <div className='col-xl-6 col-md-6 col-sm-12 mb-3'>
                <DropdownList
                  handleChange={async (e) => {
                    await props.handleAlertByType(e);
                  }}
                  isMulti={false}
                  options={props.lstAlertByType}
                  Dvalue={props.selectedLstAlertByType}
                  maxHeight={420}
                  placeholder='Select Alert By Type...'
                />
              </div>
              <div className='cr-alertInbox row mt-2'>
                <div className='col-xs-12 col-sm-12 col-lg-12 col-xl-12 p-0 position-reliatve'>
                  <MultipleAlerts
                    newsDetails={props.lstAlertDetails}
                    getElementDetailReq={props.getElementDetailReq}
                    setIsHide={setIsHide}
                    updateAlertStatusReq={props.updateAlertStatusReq}
                    selectedLstAlertName={props.selectedLstAlertName}
                    selectedLstAlertByType={props.selectedLstAlertByType}
                    getInboxAlertByUserReq={props.getInboxAlertByUserReq}
                    arrayIndex={props.arrayIndex}
                    lstAlertElementId={props.lstAlertElementId}
                    handleResetState={props.handleResetState}
                    handleResetelementDetail={props.handleResetelementDetail}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-6 col-md-6 col-sm-12 pt-2'>
            <ErrorBoundary>
              <EventElements
                lstElementDetail={props.lstElementDetail}
                elementTypeId={props.elementTypeId}
                cmp_pid={props.cmp_pid}
                investor_id={props.investor_id}
                country_flag={props.country_flag}
                filling_header={props.filling_header}
                filing_date={props.filing_date}
                module_name={props.module_name}
                match={props.match}
                history={props.history}
                location={props.history}
                isPDFModal={isPDFModal}
                setIsPDFModal={setIsPDFModal}
                pdfFileName={pdfFileName}
                setPDFFileName={setPDFFileName}
                pdfTitleName={pdfTitleName}
                setPDFTitleName={setPDFTitleName}
                initialisePDFModal={initialisePDFModal}
                alertData={props.alertData}
              />
            </ErrorBoundary>
          </div>
        </>
      ) : (
        <>
          {!isHide ? (
            <>
              <div className='col-xl-12 col-md-12 col-sm-12'>
                <div className='row pt-2 mb-5'>
                  <div className='col-xl-6 col-md-6 col-sm-12 mt-2 mb-3'>
                    <DropdownList
                      handleChange={async (e) => {
                        await props.handleAlertByName(e);
                      }}
                      isMulti={false}
                      options={props.lstAlertName}
                      Dvalue={props.selectedLstAlertName}
                      maxHeight={420}
                      placeholder='Select Alert By Name...'
                    />
                  </div>
                  <div className='col-xl-6 col-md-6 col-sm-12 mt-2 mb-3'>
                    <DropdownList
                      handleChange={async (e) => {
                        await props.handleAlertByType(e);
                      }}
                      isMulti={false}
                      options={props.lstAlertByType}
                      Dvalue={props.selectedLstAlertByType}
                      maxHeight={420}
                      placeholder='Select Alert By Type...'
                    />
                  </div>
                  <div className='cr-alertInbox row'>
                    <div className='col-xs-12 col-sm-12 col-lg-12 col-xl-12 p-0 position-reliatve mt-1'>
                      <MultipleAlerts
                        newsDetails={props.lstAlertDetails}
                        getElementDetailReq={props.getElementDetailReq}
                        setIsHide={setIsHide}
                        updateAlertStatusReq={props.updateAlertStatusReq}
                        selectedLstAlertName={props.selectedLstAlertName}
                        selectedLstAlertByType={props.selectedLstAlertByType}
                        getInboxAlertByUserReq={props.getInboxAlertByUserReq}
                        arrayIndex={props.arrayIndex}
                        lstAlertElementId={props.lstAlertElementId}
                        handleResetState={props.handleResetState}
                        handleResetelementDetail={props.handleResetelementDetail}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='col-xl-12 col-md-12 col-sm-12'>
                <div className='row pt-2 mb-5'>
                  <div className='col-3'>
                    <div className='article-button btn btn-primary btn-sm' onClick={handleOnHide}>
                      Back
                    </div>
                  </div>
                  <div className='mt-2'>
                    <EventElements
                      lstElementDetail={props.lstElementDetail}
                      elementTypeId={props.elementTypeId}
                      cmp_pid={props.cmp_pid}
                      investor_id={props.investor_id}
                      country_flag={props.country_flag}
                      filling_header={props.filling_header}
                      filing_date={props.filing_date}
                      module_name={props.module_name}
                      match={props.match}
                      history={props.history}
                      location={props.history}
                      isPDFModal={isPDFModal}
                      setIsPDFModal={setIsPDFModal}
                      pdfFileName={pdfFileName}
                      setPDFFileName={setPDFFileName}
                      pdfTitleName={pdfTitleName}
                      setPDFTitleName={setPDFTitleName}
                      initialisePDFModal={initialisePDFModal}
                      alertData={props.alertData}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
      <LightBoxPDFViewer
        handleCloseModelPopup={handlePDFModal}
        viewModalPopup={isPDFModal}
        handleSetBtnIdForExpandData={handlePDFModal}
        viewPDFFileName={`${DOCS_INSIGHTIA_REDLINE_REPORTS}${pdfFileName}`}
        pdfTitle={pdfTitleName}
        IsShowCard
        isShowFooter
      />
    </Page>
  );
};

export default withRouter(React.memo(AlertInbox));
