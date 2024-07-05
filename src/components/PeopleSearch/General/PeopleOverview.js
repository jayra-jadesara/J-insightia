import PropTypes from 'prop-types';
import React, { lazy } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import { PEOPLE_SEARCH } from '../../../constants/PathsConstant';
import { NUMBER_ZERO, NUMBER_ONE } from '../../../constants/NumberConstants';
import {
  numberToCommaString,
} from '../../../utils/table-tools-util';

const Card = lazy(() => import('../../GeneralForm/Card'));
const PeopleOverview = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  if (!query.director_id) {
    return <Redirect to={PEOPLE_SEARCH} />;
  }

  if (props.isLoadingOverviewPeople) {
    setTimeout(() => {
      const doc = document.getElementById('loadItem');
      const loadedItem = document.createElement('div');
      doc && doc.appendChild(loadedItem);
      loadedItem.setAttribute('id', 'loadedItem');
    }, 1000);
  }

  if (props.isLoadingOverviewPeople) {
    return <div className='mt-5 m-2'>Looading...</div>;
  }

  return (
    <Page key={1}>
      <>
        <div className='row mt-3'>
          {props.dataGovRole.length > 0 && (
            <div className='col-4'>
              <Card title='Governance Roles'>
                <div className='row'>
                  <div className='col-6'>Gender :</div>
                  <div className='col-6'>{props.dataGovRole[NUMBER_ZERO].Gender}</div>
                </div>
                <div className='row'>
                  <div className='col-6'>Current Age :</div>
                  <div className='col-6'>{props.dataGovRole[NUMBER_ZERO].Age}</div>
                </div>
                <div className='row'>
                  <div className='col-6'># Public Boards :</div>
                  <div className='col-6'>{props.dataGovRole[NUMBER_ZERO].Public_boards}</div>
                </div>
              </Card>
            </div>
          )}
          {props.dataCompensation.length > 0 && (
            <div className='col-4'>
              <Card title='Compensation'>
                <div className='row'>
                  <div className='col-6'>Total Realised Compensation :</div>
                  <div className='col-6'>{numberToCommaString(props.dataCompensation[NUMBER_ZERO].Total_Realised_Compensation)}</div>
                </div>
              </Card>
            </div>
          )}
        </div>
        <div id='loadItem' />
      </>
    </Page>
  );
};

PeopleOverview.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(React.memo(PeopleOverview));
