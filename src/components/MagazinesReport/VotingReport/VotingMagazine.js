import React from 'react';
import { withRouter } from 'react-router';
import MagazinesReportComponentPage from '../MagazinesReportComponentPage';
import Page from '../../Page';

const VotingMagazine = (props) => (
  <Page key={1}>
    <MagazinesReportComponentPage {...props} />
  </Page>
);

export default withRouter(VotingMagazine);
