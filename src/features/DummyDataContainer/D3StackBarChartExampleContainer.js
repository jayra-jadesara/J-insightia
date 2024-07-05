import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import D3StackBarChartExample from '../../pages/D3StackBarChartExample';
import { barchartDummyDataReq, stackBarchartDummyDataReq, sharePriceChartDummyDataReq } from './DummyDataSlice';

const D3StackBarChartExampleContainer = ({
  barchartDummyDataReq,
  stackBarchartDummyDataReq,
  sharePriceChartDummyDataReq,
  ...props
}) => {
  React.useEffect(() => {
    function getData() {
      barchartDummyDataReq();
      stackBarchartDummyDataReq();
      sharePriceChartDummyDataReq();
    }
    getData();
  }, [barchartDummyDataReq, stackBarchartDummyDataReq, sharePriceChartDummyDataReq]);
  return <D3StackBarChartExample {...props} />;
};

D3StackBarChartExampleContainer.propTypes = {
  barchartDummyDataReq: PropTypes.func.isRequired,
  sharePriceChartDummyDataReq: PropTypes.func.isRequired,
  stackBarchartDummyDataReq: PropTypes.func.isRequired
};

const selectBarchartDummyData = (state) => state.dummydata.barchartDummyData;
const selectStackBarChartDummyData = (state) => state.dummydata.stackBarChartDummyData;
const selectSharePriceChartDummyData = (state) => state.dummydata.sharePriceChartDummyData;

const mapStateToProps = (state) => ({
  barchartDummyData: selectBarchartDummyData(state),
  stackBarChartDummyData: selectStackBarChartDummyData(state),
  sharePriceChartDummyData: selectSharePriceChartDummyData(state)
});

const mapDispatchToProps = {
  barchartDummyDataReq,
  stackBarchartDummyDataReq,
  sharePriceChartDummyDataReq
};

export default connect(mapStateToProps, mapDispatchToProps)(D3StackBarChartExampleContainer);
