import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import D3PieChartExample from '../../pages/D3PieChartExample';
import { pieChartDummyDataReq, doughnutChartDummyDataReq } from './DummyDataSlice';

const D3PieChartExampleContainer = ({ pieChartDummyDataReq, doughnutChartDummyDataReq, ...props }) => {
  React.useEffect(() => {
    function getData() {
      pieChartDummyDataReq();
      doughnutChartDummyDataReq();
    }
    getData();
  }, [pieChartDummyDataReq, doughnutChartDummyDataReq]);
  return <D3PieChartExample {...props} />;
};

D3PieChartExampleContainer.propTypes = {
  doughnutChartDummyDataReq: PropTypes.func.isRequired,
  pieChartDummyDataReq: PropTypes.func.isRequired
};

const selectPieChartDummayData = (state) => state.dummydata.pieChartDummayData;
const selectDoughnutChartDummyData = (state) => state.dummydata.doughnutChartDummyData;

const mapStateToProps = (state) => ({
  pieChartDummayData: selectPieChartDummayData(state),
  doughnutChartDummyData: selectDoughnutChartDummyData(state)
});

const mapDispatchToProps = {
  pieChartDummyDataReq,
  doughnutChartDummyDataReq
};

export default connect(mapStateToProps, mapDispatchToProps)(D3PieChartExampleContainer);
