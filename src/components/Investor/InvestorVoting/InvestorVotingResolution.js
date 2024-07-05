import React from 'react';
import qs from 'qs';
import { withRouter } from 'react-router';
import Page from '../../Page';
import InvestorComparatorFilter from '../../Tools/VotingTools/InvestorComparatorFilter';
import MultipleResolutionForVotingRationale from './Components/MultipleResolutionForVotingRationale';
import SingleInvestorSingleResolutionDetail from '../../Tools/VotingTools/Components/SingleInvestorSingleResolutionDetail';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import InvestorComparatorConstant from '../../../constants/InvestorComparatorConstant';
import { downloadExcelByJsonFn } from '../../../utils/exportExcel-util';
import ErrorBoundary from '../../../components/GeneralForm/ErrorBoundary';

const InvestorVotingByProposal = (props) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const handleOnVotingdetailsClick = async (res) => {
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.RESOLUTION_SEARCH_BY_INVESTOR_INSIGHTIA
    );
    const dataResolutionTtype = {
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      investorSearchId: props.invId,
      startDate: props.isInvCompDateChecked ? props.startInvCompDate : null,
      endDate: props.isInvCompDateChecked ? props.endInvCompDate : null,
      meetingType:
        props.meetingTypeSelection !== undefined
          ? props.meetingTypeSelection.map((c) => c.value).toString()
          : '',
      proponent:
        props.individualProponentSelection !== undefined &&
        props.isProponentGroup
          ? props.individualProponentSelection.map((c) => c.value).toString()
          : '',
      proposalSponsor:
        props.sponsorSelection !== undefined
          ? props.sponsorSelection.value
          : null,
      proposalTypeTopLevel:
        res.payload !== false &&
        res.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL
          ? res.payload.response
          : null,
      ProposalTypeSubLevel:
        res.payload !== false &&
        res.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL
          ? res.payload.response
          : null,
      proposalType:
        res.payload !== false &&
        res.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE
          ? res.payload.response
          : null,
    };
    await props.resolutionSearchByInvestorReq(dataResolutionTtype);
  };

  React.useEffect(() => {
    if (!props.isLoading) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.isLoading]);

  return (
    <Page key={1} className='cr-InvestorVotingByProposal pt-3 pb-3'>
      <div className='text-primary pb-2'>
      {!query.print &&
        <InvestorComparatorFilter
          {...props}
          onSearch={props.onSearch}
          searchTitle=''
          status={props.TrialProductStatus}
          isShowInvestorSelection={false}
          isShowExcelDownloadBtn
        />
      }

        <MultipleResolutionForVotingRationale
          isLoading={props.isLoading}
          procedureRunningEstimateTime={props.procedureRunningEstimateTime}
          lstResolutionsByInvestorFilter={props.lstResolutionsByInvestorFilter}
          handleInvestorComparatorSelection={
            props.handleInvestorComparatorSelection
          }
          handleOnInvestordetailsClick={handleOnVotingdetailsClick}
          getResolutionsTypeIdByNameReq={props.getResolutionsTypeIdByNameReq}
          handleResetInvestorComparatorTool={
            props.handleResetInvestorComparatorTool
          }
          handleInvestorTrends={props.handleInvestorTrends}
          handleResetLoader={props.handleResetLoader}
          currentResolutionTypeSelection={props.currentResolutionTypeSelection}
          // Trial
          TrialUserDisableDownload={props.TrialUserDisableDownload}
          TrialStatus={props.TrialStatus}
          TrialProductStatus={props.TrialProductStatus}
          distinctProfile={props.distinctProfile}
          downloadExcelByJsonFn={downloadExcelByJsonFn}
          lstExcelDownload_ResolutionsByInvestorFilter={
            props.lstExcelDownload_ResolutionsByInvestorFilter
          }
        />

        {/* Voting Detail */}
        {props.isShowInvestorDetails && (
          <ErrorBoundary hasCard cardtitle='Voting Details'>
            <SingleInvestorSingleResolutionDetail
              isLoadingVotingDetails={props.isLoadingVotingDetails}
              handleCloseVoringDetails={() => {
                props.handleCloseInvestorDetails();
                props.handleCloseVoringDetails();
              }}
              pRunningEstTimeForVotingDetails={
                props.procedureRunningEstimateTime
              }
              lstVotingDetails={props.lstVotingDetails}
              // Trial
              TrialUserDisableDownload={props.TrialUserDisableDownload}
              TrialStatus={props.TrialStatus}
              TrialProductStatus={props.TrialProductStatus}
              distinctProfile={props.distinctProfile}
            />
          </ErrorBoundary>
        )}
      </div>
    </Page>
  );
};

export default withRouter(InvestorVotingByProposal);
