import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import FAQComponent from '../FAQComponent';
import messageConst from '../../../constants/MessageConstans';
import ScrollToTopBtn from '../../GeneralForm/ScrollToTop';

const ActivismFAQ = (props) => {
  if (props.faqhelpHasRecord) {
    return <div className='pt-3 ps-4'>{messageConst.NORECORDS}</div>;
  }
  if (props.faqhelpIsLoading) {
    return <div className='pt-3 ps-4'>{messageConst.LOADING}</div>;
  }
  return (
    <Page key={1} className='pt-3'>
      {props.faqhelpData.map((e, index) => (
        <div key={`map${index + 1}`}>
          <FAQComponent
            faqhelpIsLoading={props.faqhelpIsLoading}
            faqhelpData={props.faqhelpData[index]}
            index={index}
          />
        </div>
      ))}
      <ScrollToTopBtn />
    </Page>
  );
};

ActivismFAQ.propTypes = {
  faqhelpData: PropTypes.array,
  faqhelpHasRecord: PropTypes.any.isRequired,
  faqhelpIsLoading: PropTypes.any.isRequired
};

ActivismFAQ.defaultProps = {
  faqhelpData: []
};

export default withRouter(React.memo(ActivismFAQ));
