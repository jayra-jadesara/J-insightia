import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import pathConst from '../../../constants/PathsConstant';
import '../../../styles/components/_popupTrialUser.scss';

const PDFViewer = (props) =>
// let query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
// if () {
//   return <Redirect to={pathConst.MAGAZINE_OVERVIEW} />;
} (
  <Page key={1}>
     <div>PDF VIEWER COMPONENT</div>
   </Page>
);
export default withRouter(PDFViewer);
