import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import VotingFAQ from '../../components/FAQ/Voting/faq';
import {
  getdata_FAQS_definitionReq,
  handleResetLoading,
  handleResetHasRecord
} from './FAQHelpSlice';
import productConst from '../../constants/ProductConstants';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const VotingFAQContainer = ({
  handleResetLoading,
  handleResetHasRecord,
  location,
  getdata_FAQS_definitionReq,
  ...props
}) => {
  useEffect(() => {
    const abortController = new AbortController();
    handleResetHasRecord(false);
    handleResetLoading(true);
    getdata_FAQS_definitionReq({
      ProductID: productConst.VOTING,
      AdditionalSectionID: productConst.FAQ
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [handleResetLoading, handleResetHasRecord, getdata_FAQS_definitionReq]);

  return (
    <ErrorBoundary>
      <VotingFAQ {...props} />
    </ErrorBoundary>
  );
};

VotingFAQContainer.propTypes = {
  getdata_FAQS_definitionReq: PropTypes.func.isRequired,
  handleResetHasRecord: PropTypes.func.isRequired,
  handleResetLoading: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const SelectFaqhelpData = (state) => state.faqhelp.faqhelpData;
const SelectFaqhelpIsLoading = (state) => state.faqhelp.faqhelpIsLoading;
const SelectFaqhelpHasRecord = (state) => state.faqhelp.faqhelpHasRecord;

const mapStateToProps = (state) => ({
  faqhelpData: SelectFaqhelpData(state),
  faqhelpIsLoading: SelectFaqhelpIsLoading(state),
  faqhelpHasRecord: SelectFaqhelpHasRecord(state)
});

const mapDispatchToProps = {
  getdata_FAQS_definitionReq,
  handleResetLoading,
  handleResetHasRecord
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VotingFAQContainer)
);
