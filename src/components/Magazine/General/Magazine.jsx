import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import '../../../styles/components/_popupTrialUser.scss';

import PDFViewer from './PDFViewer';

// THIS COMPONENT HOUSES SPECIAL REPORTS AS DEFAULT
const Magazine = (props) =>
// let query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
// if () {
//   return <Redirect to={pathConst.MAGAZINE_OVERVIEW} />;
} (
  <Page key={1}>
     <PDFViewer />
   </Page>
);
export default withRouter(Magazine);
