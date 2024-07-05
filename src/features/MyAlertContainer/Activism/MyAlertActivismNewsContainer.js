import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MyAlertActivismNews from '../../../components/MyAlert/Activism/MyAlertActivismNews';

const MyAlertActivismNewsContainer = ({}) => {
  //   useEffect(() => {
  //     const abortController = new AbortController();
  //     async function getAll() {}
  //     getNewsAccess();
  //     return function cleanup() {
  //       abortController.abort();
  //     };
  //   }, []);
  return <MyAlertActivismNews />;
};

ActivismLatestNewsContainer.propTypes = {};

// const SelectAllLatestActivismNews = (state) => state.news.allLatestActivismNews;
const mapStateToProps = (state) => ({
  //   allLatestActivismNews: SelectAllLatestActivismNews(state),
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAlertActivismNewsContainer));
