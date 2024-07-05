import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Notes from '../../pages/NotesWidgetExample';
import {
  handleResetLoading,
} from './NotesSlice';
import ErrorBoundary from '../../components/GeneralForm/ErrorBoundary';

const NotesContainer = ({ handleResetLoading, children }) => {
  useEffect(() => {
    handleResetLoading();
  }, [handleResetLoading]);

  return (
    <ErrorBoundary>
  <Notes children={children} />
  </ErrorBoundary>

  );
};

const SelectPreferencesIsLoading = (state) => state.preferences.preferencesIsLoading;

const mapStateToProps = (state) => ({
  preferencesIsLoading: SelectPreferencesIsLoading(state)
});

const mapDispatchToProps = {
  handleResetLoading
};

NotesContainer.propTypes = {
  handleResetLoading: PropTypes.func,
  children: PropTypes.object
};

NotesContainer.defaultProps = {
  children: {},
  handleResetLoading: () => null
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesContainer));
