import PropTypes from 'prop-types';
import React, { lazy, useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';
import CompensationCardComponent from './compensationCardComponent';
import { NUMBER_ZERO, NUMBER_ONE } from '../../../constants/NumberConstants';
import DropdownList from '../../GeneralForm/DropdownList';
import { PEOPLE_OVERVIEW, QUERY_DIRECTOR } from '../../../constants/PathsConstant';
import messageConst from '../../../constants/MessageConstans';

const Card = lazy(() => import('../../GeneralForm/Card'));
const CompensationPeople = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const [useBlurryText, setUseBlurryText] = useState('');

  useEffect(() => {
    props.handleTrialStatusCell(props.TrialStatus);
    if (props.TrialStatus) {
      setUseBlurryText('blurrytext');
    }
  }, [props.TrialStatus]);

  if (props.people_data && !props.people_data.compensation) {
    return <Redirect to={`${PEOPLE_OVERVIEW}${QUERY_DIRECTOR}${query.director_id}`} />;
  }

  if (
    (props.lstNonExecutiveAppointment && props.lstNonExecutiveAppointment.length > 0) ||
    (props.lstHistoricalAppointment && props.lstHistoricalAppointment.length > 0)
  ) {
    setTimeout(() => {
      const doc = document.getElementById('loadItem');
      const loadedItem = document.createElement('div');
      doc && doc.appendChild(loadedItem);
      loadedItem.setAttribute('id', 'loadedItem');
    }, 1000);
  }

  if (props.lstNonExecutiveAppointment === undefined && props.lstHistoricalAppointment === undefined) {
    return <div className='mt-5 m-2'>{messageConst.LOADING}</div>;
  }
  if (props.lstNonExecutiveAppointment.length === 0 && props.lstHistoricalAppointment.length === 0) {
    return <div className='mt-5 m-2'>{messageConst.NORECORDS}</div>;
  }

  return (
    <Page {...props} key={1}>
      <ErrorBoundary>
        <>
          <div className='row ps-3 my-3 pt-2 align-items-center'>
            <>
              <div className='col-md-12 m-0' />
              <div className='col-md-1 col-6 font-weight-bold text-primary m-0'>Period :</div>
              <div className="col-md-2 col-6 m-0">
                <DropdownList
                  handleChange={async (e) => {
                    if (e !== null && e.value !== props.compensationYearSelected.value) {
                      await props.handleYearOnChange(e);
                    }
                    if (e === null) await props.handleYearOnChange(null);
                  }}
                  Dvalue={props.compensationYearSelected}
                  options={props.compensationPeriods}
                  placeholder='Enter year'
                  disabled={props.isLoadingPeopleCompensation || props.TrialStatus}
                />
              </div>
            </>
          </div>
          {!props.isLoadingPeopleCompensation && (
            <>
              <div className='mt-3'>
                {props.lstNonExecutiveAppointment && props.lstNonExecutiveAppointment.length > NUMBER_ZERO && (
                  <Card title='Executive Appointments'>
                    {props.lstNonExecutiveAppointment.map((data, index) => (
                      <CompensationCardComponent
                        table={NUMBER_ZERO}
                        data={data}
                        index={index}
                        availYears={props.availYears1}
                        yearGrid={props.yearGrid}
                        TrialStatus={props.TrialStatus}
                        useBlurryText={useBlurryText}
                      />
                    ))}
                  </Card>
                )}
              </div>
              <div className='mt-3'>
                {props.lstHistoricalAppointment && props.lstHistoricalAppointment.length > NUMBER_ZERO && (
                  <Card title='Non-Executive Appointments'>
                    {props.lstHistoricalAppointment.map((data, index) => (
                      <CompensationCardComponent
                        table={NUMBER_ONE}
                        data={data}
                        index={index}
                        availYears={props.availYears2}
                        yearGrid={props.yearGrid}
                        TrialStatus={props.TrialStatus}
                        useBlurryText={useBlurryText}
                      />
                    ))}
                  </Card>
                )}
              </div>
            </>
          )}
          <div id='loadItem' />
        </>
      </ErrorBoundary>
    </Page>
  );
};

CompensationPeople.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(React.memo(CompensationPeople));
