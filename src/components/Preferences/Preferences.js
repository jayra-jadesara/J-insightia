import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Page from '../Page';
import PreferencesComponent from './PreferencesComponent';
import DefaultPreferences from './DefaultPreferences';
import EmailPreferences from './EmailPreferences';
import UserPreferences from './UserPreferences';
import ScrollToTopBtn from '../GeneralForm/ScrollToTop';
import messageConst from '../../constants/MessageConstans';
import ErrorBoundary from '../GeneralForm/ErrorBoundary';

const Preferences = (props) => {
  let listItems = [];
  listItems = [
    {
      heading: 'Company and Investor Peer Groups',
      children: <DefaultPreferences {...props} />
    },
    { heading: 'User', children: <UserPreferences {...props} /> },
    {
      heading: 'Emails and Newsletters',
      children: <EmailPreferences {...props} />
    }
  ];

  return (
    <>
      <Page key={1} className='pt-3'>
        {props.preferencesIsLoading
          ? messageConst.LOADING
          : listItems.map((e, index) => (
              <div key={`key_${index + 1}`}>
                <ErrorBoundary hasCard cardtitle={e.heading ? e.heading : ''}>
                <PreferencesComponent Heading={e.heading} index={index}>
                  <div className='pt-3'>{e.children}</div>
                </PreferencesComponent>
                </ErrorBoundary>
              </div>
            ))}
      </Page>
      <ScrollToTopBtn />
    </>
  );
};

Preferences.propTypes = {
  preferencesIsLoading: PropTypes.bool
};

Preferences.defaultProps = {
  preferencesIsLoading: false
};

export default withRouter(React.memo(Preferences));
