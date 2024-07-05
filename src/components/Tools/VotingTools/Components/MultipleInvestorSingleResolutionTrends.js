import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../../../GeneralForm/ProgressBar';
import Table from '../../../GeneralForm/Table';
import D3HistoricalTrendsLineChart from '../../../GeneralForm/D3HistoricalTrendsLineChart';
import {
  filters,
  setNextGroupColumnText,
} from '../../../../utils/AgGridFunctions';
import pathConst from '../../../../constants/PathsConstant';
import HistoricalTrendsPDF from './HistoricalTrendsPDF';
import msgConst from '../../../../constants/MessageConstans';
// import InvestorComparatorConstant from '../../../../constants/InvestorComparatorConstant';
// import PDFNavMenu from '../../../GeneralForm/PDFNavMenu';
// import resolutionTrackerToolConst from '../../../../constants/ResolutionTrackerToolConstant';
// import D3GroupbarChart from '../../../GeneralForm/D3GroupbarChart';
// import DropdownList from '../../../GeneralForm/DropdownList';

const MultipleInvestorSingleResolutionTrends = (props) => {
  const {
    isLoadHistoricalTrends,
    pRunningEstTimeForVotingDetails,
    lstHistoricalInvestors,
    isProposalType,
    setIsProposalType,
  } = props;
  return (
    <>
      {isLoadHistoricalTrends ? (
        <div className='vh-100'>
          <div className='h-50'>
            {pRunningEstTimeForVotingDetails !== undefined ? (
              <ProgressBar avgElapsedTime={pRunningEstTimeForVotingDetails} />
            ) : (
            <div className='mt-3'>
              {msgConst.LOADING}
            </div>
          )}
          </div>
        </div>
      ) : (
        <>
          <div className='row card mx-1 mt-4'>
            <HistoricalTrendsPDF
              {...props}
              isLoadHistoricalTrends={isLoadHistoricalTrends}
              isProposalType={isProposalType}
              setIsProposalType={setIsProposalType}
            />
          </div>
        </>
      )}
    </>
  );
};

MultipleInvestorSingleResolutionTrends.propTypes = {
  isLoadHistoricalTrends: PropTypes.bool,
  handleCloseInvestorDetails: PropTypes.func,
  handleHistoricalTrendsSelection: PropTypes.func,
  handleOnChangeHistoricalInvestor: PropTypes.func,
  lstDdlHistoricalsInvestors: PropTypes.array,
  lstStackBarChartData: PropTypes.array,
  lstLineChartData: PropTypes.array,
  DdlhistoricalInvestorSelection: PropTypes.array,
  lstHistoricalInvestors: PropTypes.array,
  pRunningEstTimeForVotingDetails: PropTypes.number,
  isShowHistoricalTrendsFor: PropTypes.bool,
  isShowHistoricalTrendsAbstain: PropTypes.bool,
  isShowHistoricalTrendsAgainst: PropTypes.bool,
};
MultipleInvestorSingleResolutionTrends.defaultProps = {
  handleCloseInvestorDetails: () => null,
  handleHistoricalTrendsSelection: () => null,
  handleOnChangeHistoricalInvestor: () => null,
  DdlhistoricalInvestorSelection: () => null,
  lstDdlHistoricalsInvestors: [],
  lstHistoricalInvestors: [],
  lstStackBarChartData: [],
  lstLineChartData: [],
  isLoadHistoricalTrends: true,
  pRunningEstTimeForVotingDetails: undefined,
  isShowHistoricalTrendsFor: true,
  isShowHistoricalTrendsAbstain: false,
  isShowHistoricalTrendsAgainst: false,
};

export default React.memo(MultipleInvestorSingleResolutionTrends);
