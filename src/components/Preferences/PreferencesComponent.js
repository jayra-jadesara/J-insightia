import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import CollapseComponent from '../GeneralForm/CollapseComponent';
import bn from '../../utils/bemnames';
import ErrorBoundary from '../GeneralForm/ErrorBoundary';

const bem = bn.create('faqhelp');

const PreferencesComponent = (props) => (
  <div className={bem.b('')}>
    <ErrorBoundary>
    <CollapseComponent Heading={props.Heading} index={props.index}>
      <ErrorBoundary>
        {props.children}
      </ErrorBoundary>
    </CollapseComponent>
    </ErrorBoundary>
  </div>
);

PreferencesComponent.propTypes = {
  Heading: PropTypes.element.isRequired,
  children: PropTypes.array,
  index: PropTypes.number
};

PreferencesComponent.defaultProps = {
  children: [],
  index: 0
};

export default withRouter(React.memo(PreferencesComponent));
