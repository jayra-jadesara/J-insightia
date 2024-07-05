import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import Page from '../../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import NoActionLetterFilter from './NoActionLetterFilter';
import NoActionLetterComponent from '../../../Company/Voting/Component/NoActionLetterComponent';
import NoActionLetterAnalysis from './NoActionLetterAnalysis';
import { NUMBER_ZERO, NUMBER_ONE } from '../../../../constants/NumberConstants';
import ProcedureConstant from '../../../../constants/ProcedureConstant';

const CHECKED_ALL = 'checked all';

const NoActionDataAndAnalyticsTool = (props) => {
  const onSearch = useCallback(
    async (e, e1) => {
      await props.getProcedureRunningEstimateTimeReq(
        ProcedureConstant.NO_ACTION_LETTER_ANALYSIS_DATA
      );
      await props.getNoActionTrackInfoReq({
        index_id: '',
        start_date: props.isDateChecked ? props.startInvCompDate : null,
        end_date: props.isDateChecked ? props.endInvCompDate : null,
        proposal_type_top: '',
        proposal_type_sub: '',
        proposal_type:
          e1 !== undefined ? e1 : props.selection_ByShareholderProposalType,
        industry_id: '',
        proponent:
          e !== undefined && e.value !== null
            ? e.value.toString()
            : props.individualProponentSelection.value.toString(),
        Resolutions_Filter: null,
        meeting_id: null,
        company_search_id:
          props.companySearchOptionSelection !== undefined
            ? props.companySearchOptionSelection.value
            : null,
      });
      await props.getVotingToolNoActionLetterAnalysisDataReq({
        proposal_type:
          e1 !== undefined
            ? e1
            : props.selection_ByShareholderProposalType !== ''
            ? props.selection_ByShareholderProposalType
            : null,
        proponent:
          e !== undefined
            ? e.value.toString()
            : props.individualProponentSelection.value.toString() === ''
            ? null
            : props.individualProponentSelection.value.toString(),
        start_date: props.isDateChecked ? props.startInvCompDate : null,
        end_date: props.isDateChecked ? props.endInvCompDate : null,
      });
    },
    [props]
  );

  return (
    <Page key='1'>
      <NoActionLetterFilter
        {...props}
        onSearch={onSearch}
        filterHeading='No Action Filters'
        isShowInvestorSelection={false}
        searchTitle='No Action Filters:'
      />
      <div>
        {props.outcomeFieldsSelection === NUMBER_ZERO && (
          <NoActionLetterComponent
            {...props}
            includeCompanyColumn
            onSearch={onSearch}
            TrialStatus={props.TrialStatus_NoActionLetter}
            allowDownload={props.allowDownload_NoActionLetter}
            procedureRunningEstimateTime={props.procedureRunningEstimateTime}
            excelPageTitle='No action letters'
            loadingDataNoactionLetters={props.loadingDataNoactionLetters}
            TrialStatusDisableDownload={props.trialUserDisableDownload}
            //// save search
            isShowFilterSavesearchModal
            onSavedSearches_btnApply={props.onSavedSearches_btnApply}
            onSavedSearches_btnDelete={props.onSavedSearches_btnDelete}
            onSavedSearches_Create={props.onSavedSearches_Create}
            onSavedSearches_Update={props.onSavedSearches_Update}
            isShow_SaveThisSearch_Modal={props.isShow_SaveThisSearch_Modal}
            handleShow_SaveThisSearch_Modal={
              props.handleShow_SaveThisSearch_Modal
            }
            saveSearchTextboxVal={props.saveSearchTextboxVal}
            handleSaveSearchTextboxValue={props.handleSaveSearchTextboxValue}
            saveSearch_list={props.saveSearch_list}
            saveSearchDDLList={props.saveSearchDDLList}
            saveSearchedDDLSelection={props.saveSearchedDDLSelection}
            // cardTitle="No Action Letters"
          />
        )}
        {props.outcomeFieldsSelection === NUMBER_ONE && (
          <NoActionLetterAnalysis {...props} />
        )}
      </div>
    </Page>
  );
};

export default withRouter(NoActionDataAndAnalyticsTool);
