import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import UnderConstruction from '../../../pages/UnderConstruction';

const VotingLatest = (props) => {
  return (
    <Page key={1}>
      <div key={1} className='row'>
        <UnderConstruction />
      </div>
    </Page>
  );
};

VotingLatest.propTypes = {
  btnIdForExpandData: PropTypes.bool,
  handleSetBtnIdForExpandData: PropTypes.func,
  isLoading: PropTypes.bool,
  rowDataList: PropTypes.array,
  viewPDFFileName: PropTypes.string
};

VotingLatest.defaultProps = {
  btnIdForExpandData: false,
  handleSetBtnIdForExpandData: () => {},
  isLoading: false,
  rowDataList: [],
  viewPDFFileName: ''
};

export default withRouter(VotingLatest);
