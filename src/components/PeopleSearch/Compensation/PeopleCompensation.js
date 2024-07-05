import React from 'react';
import qs from 'qs';
import { Redirect, withRouter } from 'react-router';
import Page from '../../Page';
import UnderConstruction from '../../../pages/UnderConstruction';
import { PEOPLE_SEARCH } from '../../../constants/PathsConstant';

const PeopleCompensation = ({ location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (!query.director_id) {
    return <Redirect to={PEOPLE_SEARCH} />;
  }

  return (
    <Page key={1}>
      <div className='pt-3'>
        <UnderConstruction />
      </div>
    </Page>
  );
};

export default withRouter(React.memo(PeopleCompensation));
