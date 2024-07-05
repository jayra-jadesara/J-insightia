import React from 'react';
import { withRouter } from 'react-router';
import MagazinesReportComponentPage from '../MagazinesReportComponentPage';
import Page from '../../Page';

const LatestMagazine = (props) => (
  <Page key={1} className='pt-3'>
    <MagazinesReportComponentPage {...props} />
  </Page>
);

export default withRouter(LatestMagazine);
