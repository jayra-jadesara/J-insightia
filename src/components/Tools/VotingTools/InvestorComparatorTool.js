import React, { useState } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router';
import bn from '../../../utils/bemnames';
import Page from '../../Page';
import InvestorComparatorFilter from './InvestorComparatorFilter';
import MultipleResolution from './Components/MultipleResolution';
import MultipleInvestorSingleResolutionDetail from './Components/MultipleInvestorSingleResolutionDetail';
import SingleInvestorSingleResolutionDetail from './Components/SingleInvestorSingleResolutionDetail';
import MultipleInvestorSingleResolutionTrends from './Components/MultipleInvestorSingleResolutionTrends';
import InvestorSingleResolutionVotingPower from './Components/MultipleInvestorSingleResolutionVotingPower';
import '../../../styles/components/_popupTrialUser.scss';
import ProcedureConstant from '../../../constants/ProcedureConstant';
import InvestorComparatorConstant from '../../../constants/InvestorComparatorConstant';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const bem = bn.create('investor-comparator');

const InvestorComparatorTool = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });

  const [isProposalType, setIsProposalType] = useState({
    lavel: null,
    proposalType: null,
  });
  const [filterData, setFilterData] = useState(null);

  const onSearch = async () => {
    await props.handleClearResult();
    await props.handleResetLoader();
    await props.handleResetInvestorComparatorTool_HistoricalTrends();
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.INVESTOR_COMPARATOR_DATA
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
        props.meetingTypeSelection !== null &&
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
    props.resolutionsByInvestorFilterReq(data);
  };

  const handleOnInvestordetailsClick = async (res) => {
    await props.handleResetLoader();
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.RESOLUTIONS_BYNEWTARGET_INSIGHTIA
    );

    const dataResolutionTtype = {
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      investorSearchId:
        props.invCompInvestorPeerGroupSelection !== undefined
          ? props.invCompInvestorPeerGroupSelection.value
          : null,
      startDate: props.isInvCompDateChecked ? props.startInvCompDate : null,
      endDate: props.isInvCompDateChecked ? props.endInvCompDate : null,
      meetingType:
        props.meetingTypeSelection !== null &&
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
    await props.resolutionsByInvestorDetailstReq(dataResolutionTtype);
  };

  const handleOnVotingdetailsClick = async (investorId) => {
    await props.handleResetLoader();
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.RESOLUTION_SEARCH_BY_INVESTOR_INSIGHTIA
    );

    const dataResolutionTtype = {
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      investorSearchId: investorId,
      startDate: props.isInvCompDateChecked ? props.startInvCompDate : null,
      endDate: props.isInvCompDateChecked ? props.endInvCompDate : null,
      meetingType:
        props.meetingTypeSelection !== null &&
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
      proposalTypeTopLevel: props.selectedInvestorDetailsProposalTopLevelTypeId,
      ProposalTypeSubLevel: props.selectedInvestorDetailsProposalSubLevelTypeId,
      proposalType: props.selectedInvestorDetailsProposalTypeId,
    };
    await props.resolutionSearchByInvestorReq(dataResolutionTtype);
  };

  const handleOnloadHistoricalTrends = async (res) => {
    await props.handleResetLoader();
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.GETHISTORICALTRENDS_INSIGHTIA
    );

    const dataResolutionTtype = {
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      investorSearchId:
        props.invCompInvestorPeerGroupSelection !== undefined
          ? props.invCompInvestorPeerGroupSelection.value
          : null,
      meetingType:
        props.meetingTypeSelection !== null &&
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
    // props.getHistoricalTrendsReq(dataResolutionTtype);
    // props.investorComparatorhistoricalTrendsChartYTDDataReq(
    //   dataResolutionTtype
    // );
    // props.investorComparatorhistoricalTrendsChartProxySeasonDataReq(
    //   dataResolutionTtype
    // );
    props.getHistoricalTrendsChartDataInvestorComparatorReq(
      dataResolutionTtype
    );
  };

  const handleOnVotingPowerclick = async () => {
    await props.handleResetLoader();
    await props.getProcedureRunningEstimateTimeReq(
      ProcedureConstant.GETINVESTORVOTINGPOWER_INSIGHTIA
    );

    const dataVotingPower = {
      companySearchId:
        props.companySearchOptionSelection !== undefined
          ? props.companySearchOptionSelection.value
          : null,
      investorSearchId:
        props.invCompInvestorPeerGroupSelection !== undefined
          ? props.invCompInvestorPeerGroupSelection.value
          : null,
      startDate: props.startInvCompDate,
      endDate: props.endInvCompDate,
      meetingType:
        props.meetingTypeSelection !== null &&
        props.meetingTypeSelection !== undefined
          ? props.meetingTypeSelection.map((c) => c.value).toString()
          : '',
      proponent:
        props.individualProponentSelection !== undefined &&
        props.isProponentGroup
          ? props.individualProponentSelection.map((c) => c.value).toString()
          : '',
      proposalSponsor: null,
      proposalTypeTopLevel: null,
      ProposalTypeSubLevel: null,
      proposalType: null,
    };
    await props.getInvestorVotingPowerReq(dataVotingPower);
  };

  return (
    <Page key={1} className={bem.b()}>
      <ErrorBoundary>
        <div className='text-primary pt-2 pb-2'>
          <p>
            Choose your filter and click the resolution type to compare
            investors
          </p>
          <p>
            This tool is made to compare how resolution types were voted by
            different investors. You have the choice to go further and see the
            statistics on how different investors voted on that resolution type,
            what the past trends have been for that resolution type or look into
            the correlation of voting power across different institutions
          </p>
          <p>
            *Vote percentages are based on all voting within the Proxy Insight
            database. If you require percentages by aggregate voting (which is
            not disclosed in all markets) please view Resolution Tracker.
          </p>
          <InvestorComparatorFilter
            {...props}
            onSearch={onSearch}
            isSaveSearchModal
            searchTitle=''
          />

          <MultipleResolution
            {...props}
            isLoading={props.isLoading_InvestorVotingByProposal}
            procedureRunningEstimateTime={props.procedureRunningEstimateTime}
            lstResolutionsByInvestorFilter={
              props.lstResolutionsByInvestorFilter
            }
            handleInvestorComparatorSelection={
              props.handleInvestorComparatorSelection
            }
            handleOnInvestordetailsClick={handleOnInvestordetailsClick}
            getResolutionsTypeIdByNameReq={props.getResolutionsTypeIdByNameReq}
            handleResetInvestorComparatorTool={
              props.handleResetInvestorComparatorTool
            }
            handleResetInvestorComparatorTool_HistoricalTrends={
              props.handleResetInvestorComparatorTool_HistoricalTrends
            }
            handleInvestorTrends={props.handleInvestorTrends}
            handleOnloadHistoricalTrends={handleOnloadHistoricalTrends}
            handleOnVotingPowerclick={handleOnVotingPowerclick}
            handleResetLoader={props.handleResetLoader}
            currentResolutionTypeSelection={
              props.currentResolutionTypeSelection
            }
            isShowInvestorDetails={props.isShowInvestorDetails}
            isLoadHistoricalTrends={props.isLoadHistoricalTrends}
            isShowVotingPower={props.isShowVotingPower}
            isShowInvestorTrends={props.isShowInvestorTrends}
            handleCloseInvestorDetails={props.handleCloseInvestorDetails}
            isLoadingVotingDetails={props.isLoadingVotingDetails}
            isLoadingInvestorDetails={props.isLoadingInvestorDetails}
            isProposalType={isProposalType}
            setIsProposalType={setIsProposalType}
          />

          {/* Investor Details section - click on 'More Detail' Button */}
          {props.isShowInvestorDetails && (
            <MultipleInvestorSingleResolutionDetail
              {...props}
              handleCloseInvestorDetails={props.handleCloseInvestorDetails}
              pRunningEstTimeForSingleResDetails={
                props.procedureRunningEstimateTime
              }
              lstResolutionInvDetails={props.lstResolutionInvDetails}
              isLoadingInvestorDetails={props.isLoadingInvestorDetails}
              handleInvestorDetailsSelection={
                props.handleInvestorDetailsSelection
              }
              handleOnVotingdetailsClick={handleOnVotingdetailsClick}
              handleResetLoader={props.handleResetLoader}
              trialUserDisableDownload={props.trialUserDisableDownload}
              isProposalType={isProposalType}
              setIsProposalType={setIsProposalType}
            />
          )}

          {/* Investor Details sub section (Voting Details section - click on 'Voting Data' Button) */}
          {props.isShowVotingDetails && (
            <SingleInvestorSingleResolutionDetail
              {...props}
              isLoadingVotingDetails={props.isLoadingVotingDetails}
              handleCloseVoringDetails={props.handleCloseVoringDetails}
              pRunningEstTimeForVotingDetails={
                props.procedureRunningEstimateTime
              }
              lstVotingDetails={props.lstVotingDetails}
              trialUserDisableDownload={props.trialUserDisableDownload}
              isProposalType={isProposalType}
              setIsProposalType={setIsProposalType}
            />
          )}

          {/* Historical Trends section - click on 'Trends' Button */}
          {(props.isShowInvestorTrends || query.print) && (
            <MultipleInvestorSingleResolutionTrends
              {...props}
              isLoadHistoricalTrends={props.isLoadHistoricalTrends}
              handleCloseInvestorDetails={props.handleCloseInvestorDetails}
              pRunningEstTimeForVotingDetails={
                props.procedureRunningEstimateTime
              }
              lstDdlHistoricalsInvestors={props.lstDdlHistoricalsInvestors}
              handleOnChangeHistoricalInvestor={
                props.handleOnChangeHistoricalInvestor
              }
              handleOnClickIsSelectedFullYearData={
                props.handleOnClickIsSelectedFullYearData
              }
              DdlhistoricalInvestorSelection={
                props.DdlhistoricalInvestorSelection
              }
              lstHistoricalInvestors={props.lstHistoricalInvestors}
              handleHistoricalTrendsSelection={
                props.handleHistoricalTrendsSelection
              }
              isShowHistoricalTrendsFor={props.isShowHistoricalTrendsFor}
              isShowHistoricalTrendsAbstain={
                props.isShowHistoricalTrendsAbstain
              }
              isShowHistoricalTrendsAgainst={
                props.isShowHistoricalTrendsAgainst
              }
              lstStackBarChartData={props.lstStackBarChartData}
              lstLineChartData={props.lstLineChartData}
              trialUserDisableDownload={props.trialUserDisableDownload}
              //
              isSelectedCalendarYearData={props.isSelectedCalendarYearData}
              isSelectedYearToDateData={props.isSelectedYearToDateData}
              isSelectedProxySeasonData={props.isSelectedProxySeasonData}
              isProposalType={isProposalType}
              setIsProposalType={setIsProposalType}
              filterData={filterData}
              setFilterData={setFilterData}
            />
          )}

          {/* Voting Power section - click on 'Voting Power' Button */}
          {props.isShowVotingPower && (
            <InvestorSingleResolutionVotingPower
              {...props}
              isLoadVotingPowerData={props.isLoadVotingPowerData}
              pRunningEstTimeForVotingDetails={
                props.procedureRunningEstimateTime
              }
              handleCloseInvestorDetails={props.handleCloseInvestorDetails}
              lstVotingInvestorPower={props.lstVotingInvestorPower}
              lstVotingPvaImpact={props.lstVotingPvaImpact}
              trialUserDisableDownload={props.trialUserDisableDownload}
              isProposalType={isProposalType}
              setIsProposalType={setIsProposalType}
            />
          )}
        </div>
      </ErrorBoundary>
    </Page>
  );
};

export default withRouter(React.memo(InvestorComparatorTool));
