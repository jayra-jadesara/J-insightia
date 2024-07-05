import PropTypes from 'prop-types';
import React, { lazy, useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import {
  ADVISOR_SEARCH,
  CONTACT_IMG_PATH
} from '../../../constants/PathsConstant';
import { LOADING } from '../../../constants/MessageConstans';
import '../../../styles/components/_popupTrialUser.scss';
import D3StackBarChart from '../../GeneralForm/D3StackBarChart';
import D3PieChart from '../../GeneralForm/D3PieChart';
import VotingProfileContacts from '../../Investor/InvestorVoting/VotingProfile/VotingProfileContacts';
import NoActionLetterComponent from '../../Company/Voting/Component/NoActionLetterComponent';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const Card = lazy(() => import('../../GeneralForm/Card'));

const AdvisersVotingOverview = (props) => {
  const {
    instructions,
    exclusionsApproved,
    proponentWithdrew,
    lstAdvisorVotingWindandInstrByYear,
    lstLawfrmYearData,
    lstLawYearsContacts,
    lstAdvisorVotingDetailInfoProponentTable,
    lstlawFirmProposalTypes,
    isLoadingVotingNoAction,
    procedureRunningEstimateTime
  } = props;
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [jsonNew, setJsonNew] = useState([]);

  const getImageOrFallback = (path, fallback) =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(path);
      img.onerror = () => resolve(fallback);
      if (!img.complete) {
        return false;
      }
      return true;
    });

  useEffect(() => {
    async function getAll() {
      const jsonImgExists = [];
      for (const obj of lstLawYearsContacts) {
        const pathUrl = `${
          window.location.origin
        }${CONTACT_IMG_PATH}${encodeURIComponent(obj.picture)}`;
        const link = await getImageOrFallback(pathUrl, '');
        jsonImgExists.push({ ...obj, imageExists: link !== '' });
      }
      setJsonNew(jsonImgExists);
    }
    getAll();
  }, [lstLawYearsContacts]);

  if (!query.company_id || query.company_id === undefined || query.company_id === 'undefined') {
    return <Redirect to={ADVISOR_SEARCH} />;
  }

  React.useEffect(() => {
    if (!isLoadingVotingNoAction) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [isLoadingVotingNoAction]);

  return (
    <Page key={1}>
      {isLoadingVotingNoAction ? (
        LOADING
      ) : (
        <>
          <div className='row' id='loadItem'>
            <div className='text-center d-flex col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-2 mt-3'>
              <Card title='Instructions'>
                <div className={props.TrialStatus ? 'row blurrytext' : 'row'}>
                  <span className='ovr-text col-12'>{instructions}</span>
                </div>
              </Card>
            </div>
            <div className='text-center d-flex col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-2 mt-3'>
              <Card title='Exclusion Approved (%)'>
                <div className={props.TrialStatus ? 'row blurrytext' : 'row'}>
                  <span className='ovr-text col-12'>{exclusionsApproved}</span>
                </div>
              </Card>
            </div>
            <div className='text-center d-flex col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-2 mt-3'>
              <Card title='Proponents Withdrawn (%)'>
                <div className={props.TrialStatus ? 'row blurrytext' : 'row'}>
                  <span className='ovr-text col-12'>{proponentWithdrew}</span>
                </div>
              </Card>
            </div>
            {lstAdvisorVotingWindandInstrByYear.length > 0 && (
              <div className='text-center d-flex col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 chart mt-3' style={{ height: '300px' }}>
                <ErrorBoundary hasCard cardtitle='Instructions Won Per Year'>
                  <D3StackBarChart
                    IsShowCard
                    hideExcelDownloadIcon
                    cardtitle='Instructions Won Per Year'
                    data={lstAdvisorVotingWindandInstrByYear}
                    keys={['Wins', 'Instructions']}
                    xkey='ActYear'
                    //setting to 100 to high barlabels 
                    barLabelShowMoreThan={100}
                    isDummyData={props.TrialStatus}
                    //Bar value to calvulated to %
                    dataLegends={['Wins', 'Instructions']}
                    isShowLegend
                  />
                </ErrorBoundary>
              </div>
            )}
          </div>
          <div className='row pt-2'>
            {lstLawfrmYearData.length > 0 && (
              <div className='text-center col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-3'>
                <ErrorBoundary hasCard cardtitle='SEC Rule Breakdown'>
                  <D3StackBarChart
                    IsShowCard
                    hideExcelDownloadIcon
                    cardtitle='SEC Rule Breakdown'
                    data={lstLawfrmYearData}
                    keys={[
                      'exclusions_approved',
                      'exclusions_denied',
                      'proponent_withdrew'
                    ]}
                    xkey='RulesValue'
                    isYscaleSetRight
                    isSetBarPercentage
                    dataLegends={[
                      'Exclusions Approved',
                      'Exclusions Denied',
                      'Proponent Withdrew'
                    ]}
                    isShowLegend
                    isValueToFixed
                    barLabelShowMoreThan={0.5}
                    isDummyData={props.TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            )}
            {lstlawFirmProposalTypes.length > 0 && (
              <div className='text-center col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-3'>
                <ErrorBoundary hasCard cardtitle='Proposal Detail Breakdown'>
                  <D3PieChart
                    data={lstlawFirmProposalTypes}
                    cardtitle='Proposal Detail Breakdown'
                    isComp={false}
                    isInvest={false}
                    innerRadius={60}
                    outerRadius={120}
                    height={350}
                    isDynamicViewbox
                    isDynamicLegendFontSize
                    TrialUser={props.TrialStatus}
                  />
                </ErrorBoundary>
              </div>
            )}
          </div>
          <div className='pt-2'>
            <ErrorBoundary hasCard cardtitle='Contacts'>
              <VotingProfileContacts
                tableContacts={lstLawYearsContacts}
                dataContactDetails={jsonNew}
                TrialStatus={props.TrialStatus}
              />
            </ErrorBoundary>
          </div>
          <div className='row pt-2'>
            <div className='col-12'>
              {lstAdvisorVotingDetailInfoProponentTable.length > 0 && (
                <ErrorBoundary hasCard cardtitle='No Action Letters'>
                  <NoActionLetterComponent
                    includeCompanyColumn
                    includeLawyerColumn
                    TrialStatus={props.TrialStatus}
                    TrialUserDisableDownload={props.TrialUserDisableDownload}
                    allowDownload={false}
                    excelPageTitle='No action letters'
                    cardTitle='No Action Letters'
                    noActionLettersList={lstAdvisorVotingDetailInfoProponentTable}
                    procedureRunningEstimateTime={procedureRunningEstimateTime}
                    loadingDataNoactionLetters={
                      lstAdvisorVotingDetailInfoProponentTable.length > 0
                    }
                  />
                </ErrorBoundary>
              )}
            </div>
          </div>
        </>
      )}
    </Page>
  );
};

AdvisersVotingOverview.propTypes = {
  location: PropTypes.object
};

AdvisersVotingOverview.defaultProps = {
  location: {}
};

export default withRouter(AdvisersVotingOverview);
