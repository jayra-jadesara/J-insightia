import React from 'react';
import PropTypes from 'prop-types';
import bn from '../../utils/bemnames';
import { NUMBER_HUNDRED } from '../../constants/NumberConstants';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('progressbar');

const ProgressBar = ({ avgElapsedTime }) => {
  const AvgElapsedTime = avgElapsedTime !== undefined ? avgElapsedTime : 10;
  const max = 100;
  const second = (AvgElapsedTime * 1000) / max;
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let unmounted = false;
    let newValue;
    const interval = setInterval(() => {
      if (!unmounted) {
        setValue((oldValue) => {
          if (oldValue === NUMBER_HUNDRED) {
            newValue = oldValue;
          } else {
            newValue = oldValue + 1;
          }

          if (newValue === max) {
            clearInterval(interval);
          }
          return newValue;
        });
      }
    }, second);

    return () => {
      unmounted = true;
    };
  }, [second]);

  return (
    <ErrorBoundary>
    <div className={bem.b('cr-page-spinner')}>
      <div className='progress w-50 h-4'>
        <div className='w-100'>
          <span className='loading-text show-bs-collapse'>Loading and processing your data...</span>
          <div
            className='progress-bar bg-info prog'
            role='progressbar'
            style={{ width: `${value}%` }}
            aria-valuenow={value}
            aria-valuemin='0'
            aria-valuemax={max}
          >
            {Math.round((value / max) * 100)}%
          </div>
        </div>
      </div>
    </div>
    </ErrorBoundary>
  );
};

ProgressBar.propTypes = {
  avgElapsedTime: PropTypes.number
};

ProgressBar.defaultProps = {
  avgElapsedTime: undefined
};

export default React.memo(ProgressBar);
