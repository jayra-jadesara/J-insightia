import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import MagazineSearchFilter from './Search/MagazineSearchFilter';
import MagazinesReportComponentPage from '../MagazinesReportComponentPage';

const SearchAllReports = (props) => (
  <Page key={1} className='pt-3'>
    <MagazineSearchFilter
      location={props.location}
      history={props.history}
      handleSearchResults={props.handleSearchResults}
      handleMagazineIsLoading={props.handleMagazineIsLoading}
    />
    {!props.isLoading && <MagazinesReportComponentPage {...props} />}
  </Page>
);

export default withRouter(SearchAllReports);
