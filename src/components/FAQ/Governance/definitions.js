import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Page from '../../Page';
import DefinitionsComponent from '../DefinitionsComponent';
import messageConst from '../../../constants/MessageConstans';
import ScrollToTopBtn from '../../GeneralForm/ScrollToTop';

const GovernanceDefinitions = (props) => {
  if (props.faqhelpHasRecord) {
    return <div className='pt-3 ps-4'>{messageConst.NORECORDS}</div>;
  }
  if (props.faqhelpIsLoading) {
    return <div className='pt-3 ps-4'>{messageConst.LOADING}</div>;
  }
  return (
    <Page key={1} className='pt-3'>
      {props.faqhelpData.map((e, index) => (
        <div key={`key_${index + 1}`}>
          <DefinitionsComponent
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

GovernanceDefinitions.propTypes = {
  faqhelpData: PropTypes.array,
  faqhelpHasRecord: PropTypes.any.isRequired,
  faqhelpIsLoading: PropTypes.any.isRequired
};

GovernanceDefinitions.defaultProps = {
  faqhelpData: []
};
export default withRouter(React.memo(GovernanceDefinitions));
