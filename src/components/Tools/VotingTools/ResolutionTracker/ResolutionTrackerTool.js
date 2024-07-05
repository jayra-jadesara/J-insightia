import React, { useState } from 'react';
import { withRouter } from 'react-router';
import qs from 'qs';
import bn from '../../../../utils/bemnames';
import Page from '../../../Page';
import InvestorComparatorFilter from '../InvestorComparatorFilter';
import MultipleResolutionTracker from './Components/MultipleResolutionTracker';
import ProcedureConstant from '../../../../constants/ProcedureConstant';
import SingleResolutionResultsDetail from './Components/SingleResolutionResultsDetail';
import SingleResolutionResultsTrends from './Components/SingleResolutionResultsTrends';
import InvestorComparatorConstant from '../../../../constants/InvestorComparatorConstant';

const bem = bn.create('investor-comparator');

const ResolutionTrackerTool = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [filterData, setFilterData] = useState(undefined);
  const [multiresolutionTableData, setMultiresolutionTableData] =
    useState(null);

  const onSearch = async () => {
    await props.handleResetLoader();
    await props.handleClearResult();
    await props.handleResetInvestorComparatorTool();
    await props.handleResetInvestorTrackerSearch();
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.RESOLUTIONS_BY_INVEST_FILTER_INSIGHTIA
    );
    const data = {
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      investorSearchId:
        props.invCompInvestorPeerGroupSelection !== undefined
          ? props.invCompInvestorPeerGroupSelection.value
          : null,
      meetingType:
        props.meetingTypeSelection !== undefined
          ? props.meetingTypeSelection.map((c) => c.value).toString()
          : '',
      sponsor:
        props.sponsorSelection !== undefined
          ? props.sponsorSelection.value
          : '',
      startDate: props.isInvCompDateChecked ? props.startInvCompDate : null,
      endDate: props.isInvCompDateChecked ? props.endInvCompDate : null,
      proponent: props.isProponentGroup
        ? props.individualProponentSelection !== undefined &&
          props.isProponentGroup
          ? props.individualProponentSelection.map((c) => c.value).toString()
          : ''
        : props.groupProponentSelection !== undefined &&
          props.isProponentGroup === false
        ? props.groupProponentSelection.map((c) => c.value).toString()
        : '',
    };
    setFilterData(data);
    // setMultiresolutionTableData(null);
    props.resolutionsByInvestorTrackerFilterReq(data);
  };
  const handleOnInvestorTrackerdetailsClick = async (res) => {
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.GETPROXYRESOLUTIONSEARCH_INSIGHTIA
    );

    const dataResolutionTtype = {
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      startDate: props.isInvCompDateChecked ? props.startInvCompDate : null,
      endDate: props.isInvCompDateChecked ? props.endInvCompDate : null,
      meetingType:
        props.meetingTypeSelection !== undefined
          ? props.meetingTypeSelection.map((c) => c.value).toString()
          : '',
      proponent: props.isProponentGroup
        ? props.individualProponentSelection !== undefined &&
          props.isProponentGroup
          ? props.individualProponentSelection.map((c) => c.value).toString()
          : ''
        : props.groupProponentSelection !== undefined &&
          props.isProponentGroup === false
        ? props.groupProponentSelection.map((c) => c.value).toString()
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
    await props.investorTrackerResultDetailsReq(dataResolutionTtype);
    await props.investorTrackerResultDetailsFullDataReq(dataResolutionTtype);
  };

  const handleOnHistoricalTrendsClick = async (res) => {
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.RESOLUTION_FILTER_BY_TOTAL_VOTES_GRAPH_YTD_INSIGHTIA
    );

    const chartData = {
      ProposalType:
        res.payload !== false &&
        res.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE
          ? res.payload.response
          : null,
      ProposalTopLevel:
        res.payload !== false &&
        res.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_TOP_LAVEL
          ? res.payload.response
          : null,
      ProposalSubLavel:
        res.payload !== false &&
        res.payload.req.lavel ===
          InvestorComparatorConstant.INVESTOR_COMPARATOR_PROPOSAL_TYPE_SUB_LAVEL
          ? res.payload.response
          : null,
      MeetingType:
        props.meetingTypeSelection !== undefined
          ? props.meetingTypeSelection.map((c) => c.value).toString()
          : '',
      Proponent: props.isProponentGroup
        ? props.individualProponentSelection !== undefined &&
          props.isProponentGroup
          ? props.individualProponentSelection.map((c) => c.value).toString()
          : ''
        : props.groupProponentSelection !== undefined &&
          props.isProponentGroup === false
        ? props.groupProponentSelection.map((c) => c.value).toString()
        : '',
      ProposalSponsor:
        props.sponsorSelection !== undefined
          ? props.sponsorSelection.value
          : null,
      CopampanySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      management_recc: null,
      outcome: null,
    };

    props.resolutionTrackerFilterByHistoricalTrendsReq(chartData);
  };

  return (
    <Page key={1} className={bem.b()}>
      <div
        className={
          !query.print ? 'text-primary pt-2 pb-5' : 'text-primary pt-2'
        }
      >
        {!query.print && (
          <>
            <p>Choose your filter and click the resolution type </p>
            <p>
              This tool is made to compare statistics across aggregate voting
              results for particular resolution types.. You have the choice to
              go further and see the statistics on what the past trends have
              been for that resolution type and what individual company results
              were for that resolution type
            </p>
          </>
        )}
        <>
          {!query.print && (
            // <>
            <InvestorComparatorFilter
              {...props}
              isShowInvestorSelection={false}
              isSaveSearchModal
              onSearch={onSearch}
              filterHeading='Resolution Filter'
              searchTitle='Resolution Tracker Filter:'
              status={props.status}
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
            />
          )}
          <MultipleResolutionTracker
            handleResetLoader={props.handleResetLoader}
            currentResolutionTypeSelection={
              props.currentResolutionTypeSelection
            }
            isResolutionByInvestorFilterLoading={
              props.isResolutionByInvestorFilterLoading
            }
            procedureRunningEstimateTime={props.procedureRunningEstimateTime}
            lstResolutionByInvestorfilterData={
              props.lstResolutionByInvestorfilterData
            }
            handleInvestorTrackerOptionsSelection={
              props.handleInvestorTrackerOptionsSelection
            }
            handleOnInvestorTrackerdetailsClick={
              handleOnInvestorTrackerdetailsClick
            }
            getResolutionsTypeIdByNameReq={props.getResolutionsTypeIdByNameReq}
            handleOnHistoricalTrendsClick={handleOnHistoricalTrendsClick}
            handleResetHistoricalTrendsSelection={
              props.handleResetHistoricalTrendsSelection
            }
            handleResetHistoricalDetailsSelection={
              props.handleResetHistoricalDetailsSelection
            }
            filterData={filterData}
            setFilterData={setFilterData}
            multiresolutionTableData={multiresolutionTableData}
            setMultiresolutionTableData={setMultiresolutionTableData}
            {...props}
          />

          {props.isShowResultDetails && (
            <div className='row mt-5'>
              <SingleResolutionResultsDetail
                {...props}
                handleCloseResultsDetail={props.handleCloseResultsDetail}
                lstResultDetails={props.lstResultDetails}
                lstResultDetailsFullDataForExcel={
                  props.lstResultDetailsFullDataForExcel
                }
                pRunningEstTimeForSingleResDetails={
                  props.procedureRunningEstimateTime
                }
                isLoadingResultDetailsData={props.isLoadingResultDetailsData}
                getResolutionsTypeIdByNameReq={
                  props.getResolutionsTypeIdByNameReq
                }
                trialUserDisableDownload={props.trialUserDisableDownload}
                filterData={filterData}
                setFilterData={setFilterData}
              />
            </div>
          )}

          {(props.isShowHistoricalTrends || query.print) && (
            <div>
              <div>
                <SingleResolutionResultsTrends
                  {...props}
                  handleCloseResultsDetail={props.handleCloseResultsDetail}
                  isLoadingHistoricalTrendsData={
                    props.isLoadingHistoricalTrendsData
                  }
                  pRunningEstTimeForSingleResDetails={
                    props.procedureRunningEstimateTime
                  }
                  lstHistoricalChartData={props.lstHistoricalChartData}
                  lstHistoricalTrendsTotalVotesAnalysisSummary={
                    props.lstHistoricalTrendsTotalVotesAnalysisSummary
                  }
                  lstHistoricalTrendsTotalVotesAnalysisDetails={
                    props.lstHistoricalTrendsTotalVotesAnalysisDetails
                  }
                  isSelectedFullYearData={props.isSelectedFullYearData}
                  isSelectedYearToDateData={props.isSelectedYearToDateData}
                  isSelectedProxySeasonData={props.isSelectedProxySeasonData}
                  handleOnClickIsSelectedFullYearData={
                    props.handleOnClickIsSelectedFullYearData
                  }
                  ddlCalculationMethod={props.ddlCalculationMethod}
                  ddlCalculationMethodSelection={
                    props.ddlCalculationMethodSelection
                  }
                  handleOnChangedCalculationMethod={
                    props.handleOnChangedCalculationMethod
                  }
                  lstResolutionType={props.lstResolutionType}
                  filterData={filterData}
                  setFilterData={setFilterData}
                  multiresolutionTableData={multiresolutionTableData}
                  setMultiresolutionTableData={setMultiresolutionTableData}
                />
              </div>
            </div>
          )}
        </>
      </div>
    </Page>
  );
};

export default withRouter(ResolutionTrackerTool);
