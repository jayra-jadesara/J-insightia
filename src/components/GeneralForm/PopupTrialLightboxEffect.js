import PropTypes from 'prop-types';
import React from 'react';
import bn from '../../utils/bemnames';
import '../../styles/_animations.scss';
import ErrorBoundary from './ErrorBoundary';

const bem = bn.create('popup-trial-user');

const PopupTrialUser = (props) => {
  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(true);
  // animatebottom
  return (
    <ErrorBoundary>
    <div>
      {showResults === false ? (
        <div className={bem.b('slideBottomToUp')}>
          <label role='presentation' onClick={onClick} className={bem.e('close')}>
            X
          </label>
          <label className={bem.e('test')}>
            The number of profile views for the {props.TrialLightboxSection === null ? 'X' : props.TrialLightboxSection}{' '}
            section has been exceeded. If you would like further information or a demo then please contact your account
            manager.
          </label>
        </div>
      ) : null}
    </div>
    </ErrorBoundary>
  );
};

PopupTrialUser.propTypes = {
  TrialLightboxSection: PropTypes.any.isRequired
};

export default React.memo(PopupTrialUser);
