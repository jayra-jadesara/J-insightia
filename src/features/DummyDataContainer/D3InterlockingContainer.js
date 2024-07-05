import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import D3InterlockingExample from '../../pages/D3InterlockingExample';
import { interLockingDummyDataReq } from './DummyDataSlice';

const D3InterlockingContainer = ({ interLockingDummyDataReq, ...props }) => {
  React.useEffect(() => {
    function getData() {
      interLockingDummyDataReq();
    }
    getData();
  }, [interLockingDummyDataReq]);
  return <D3InterlockingExample {...props} />;
};

D3InterlockingContainer.propTypes = {
  interLockingDummyDataReq: PropTypes.func.isRequired
};

const selectInterlockingDummyData = (state) => state.dummydata.interlockingDummyData;

const mapStateToProps = (state) => ({
  interlockingDummyData: selectInterlockingDummyData(state)
});

const mapDispatchToProps = {
  interLockingDummyDataReq
};

export default connect(mapStateToProps, mapDispatchToProps)(D3InterlockingContainer);
