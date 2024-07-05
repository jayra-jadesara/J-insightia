import React from 'react';
import { withRouter } from 'react-router';
import MagazinesReportComponentPage from '../MagazinesReportComponentPage';
import Page from '../../Page';

const Activism13F = (props) => (
  <Page key={1}>
    <MagazinesReportComponentPage {...props} />
  </Page>
);

export default withRouter(Activism13F);
