import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';
import ErrorBoundary from './ErrorBoundary';

const FooterCard = ({ title, textHeader, companyName, companyNumber, arrMedianJSON, TrialUser }) => (
  <Card title={title}>
    <ErrorBoundary>
    <div className={TrialUser ? 'blurrytext' : ''}>
      <div className='row'>
        <div className='col-6 m-0 mb-1 pb-0' />
        <div className='col-6 bg-primary text-white m-0 mb-1 pb-0'>{textHeader}</div>
      </div>
      <div className='row bg-alternate'>
        <div className='col-6 m-0 mb-1 pb-0'>{companyName}</div>
        <div className='col-6 m-0 mb-1 pb-0'>{companyNumber}</div>
      </div>
      <div className='row'>
        <div className='col-6 m-0 mb-1 pb-0' />
        <div className='col-6 bg-primary text-white m-0 mb-1 pb-0'>Median</div>
      </div>

      {arrMedianJSON &&
        arrMedianJSON.map((median, i) => {
          const rowClass = i % 2 ? 'row bg-alternate' : 'row';
          return (
            <div className={`${rowClass}`} key={`${title}_${median.peerName}_row${i + 1}`}>
              <div className='col-6 m-0 mb-1 pb-0'>{median.peerName}</div>
              <div className='col-3 m-0 mb-1 pb-0'>{median.peerNumber}</div>
              <div className='col-3 m-0 mb-1 pb-0'>{median.peerHealth}</div>
            </div>
          );
        })}
    </div>
    </ErrorBoundary>
  </Card>
);

FooterCard.propTypes = {
  arrMedianJSON: PropTypes.any,
  companyName: PropTypes.string,
  companyNumber: PropTypes.any,
  textHeader: PropTypes.string,
  title: PropTypes.string
};

FooterCard.defaultProps = {
  arrMedianJSON: undefined,
  companyName: '',
  companyNumber: undefined,
  textHeader: '',
  title: ''
};

export default React.memo(FooterCard);
