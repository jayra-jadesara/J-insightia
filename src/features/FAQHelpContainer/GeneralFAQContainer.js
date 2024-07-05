import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GeneralFAQ from '../../components/FAQ/General/faq';
import {
  getdata_FAQS_definitionReq,
  handleResetLoading,
  handleResetHasRecord
} from './FAQHelpSlice';
import productConst from '../../constants/ProductConstants';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const GeneralFAQContainer = ({
  location,
  handleResetHasRecord,
  getdata_FAQS_definitionReq,
  handleResetLoading,
  ...props
}) => {
  useEffect(() => {
    const abortController = new AbortController();
    handleResetHasRecord(false);
    handleResetLoading(true);
    getdata_FAQS_definitionReq({
      ProductID: productConst.GENERAL,
      AdditionalSectionID: productConst.FAQ
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [getdata_FAQS_definitionReq, handleResetHasRecord, handleResetLoading]);

  return (
    <ErrorBoundary>
      <GeneralFAQ {...props} />
    </ErrorBoundary>
  );
};

GeneralFAQContainer.propTypes = {
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
  connect(mapStateToProps, mapDispatchToProps)(GeneralFAQContainer)
);
