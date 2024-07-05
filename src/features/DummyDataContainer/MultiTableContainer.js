import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import MultiTable from '../../components/GeneralForm/MultiTable';
import {
  listTopTwentyActivistActivityReq,
  companiesTargetedTrendsOverviewReq,
  latestActivistDemandsReq,
  handleActiveTab,
  timeLinesReq,
  activeActivistsTrendsOverviewReq
} from './DummyDataSlice';

const MultiTableContainer = ({
  listTopTwentyActivistActivityReq,
  latestActivistDemandsReq,
  timeLinesReq,
  activeActivistsTrendsOverviewReq,
  companiesTargetedTrendsOverviewReq,
  ...props
}) => {
  React.useEffect(() => {
    function getData() {
      listTopTwentyActivistActivityReq();
      latestActivistDemandsReq();
      timeLinesReq();
      activeActivistsTrendsOverviewReq();
      companiesTargetedTrendsOverviewReq();
    }
    getData();
  }, [
    listTopTwentyActivistActivityReq,
    companiesTargetedTrendsOverviewReq,
    latestActivistDemandsReq,
    timeLinesReq,
    activeActivistsTrendsOverviewReq
  ]);
  return <MultiTable {...props} />;
};

MultiTableContainer.propTypes = {
  activeActivistsTrendsOverviewReq: PropTypes.func.isRequired,
  companiesTargetedTrendsOverviewReq: PropTypes.func.isRequired,
  latestActivistDemandsReq: PropTypes.func.isRequired,
  listTopTwentyActivistActivityReq: PropTypes.func.isRequired,
  timeLinesReq: PropTypes.func.isRequired
};

const selectListTopTwentyActivistActivity = (state) => state.dummydata.listTopTwentyActivistActivity;
const selectListActivistDemands = (state) => state.dummydata.listActivistDemands;
const selectTimeLinesRecordSet = (state) => state.dummydata.timeLinesRecordSet;
const selectActiveActivistTradeOverview = (state) => state.dummydata.activeActivistTradeOverview;
const selectCompaniesTargetTradeOverview = (state) => state.dummydata.companiesTargetTradeOverview;

// tab
const selectActiveListTopTwentyActivistActivity = (state) => state.dummydata.activeListTopTwentyActivistActivity;
const selectActiveLetestActivistDemand = (state) => state.dummydata.activeLetestActivistDemand;
const selectActiveTimelines = (state) => state.dummydata.activeTimelines;
const selectActiveLetestActivisamStatestics = (state) => state.dummydata.activeLetestActivisamStatestics;

const mapStateToProps = (state) => ({
  listTopTwentyActivistActivity: selectListTopTwentyActivistActivity(state),
  listActivistDemands: selectListActivistDemands(state),
  timeLinesRecordSet: selectTimeLinesRecordSet(state),
  activeActivistTradeOverview: selectActiveActivistTradeOverview(state),
  companiesTargetTradeOverview: selectCompaniesTargetTradeOverview(state),

  // tab
  activeListTopTwentyActivistActivity: selectActiveListTopTwentyActivistActivity(state),
  activeLetestActivistDemand: selectActiveLetestActivistDemand(state),
  activeTimelines: selectActiveTimelines(state),
  activeLetestActivisamStatestics: selectActiveLetestActivisamStatestics(state)
});

const mapDispatchToProps = {
  listTopTwentyActivistActivityReq,
  handleActiveTab,
  latestActivistDemandsReq,
  timeLinesReq,
  activeActivistsTrendsOverviewReq,
  companiesTargetedTrendsOverviewReq
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiTableContainer);
