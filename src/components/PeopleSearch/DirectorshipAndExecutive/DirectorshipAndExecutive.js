import PropTypes from 'prop-types';
import React, { lazy, useEffect, useLayoutEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import {
  PEOPLE_SEARCH,
  GOVERNANCE_OVERVIEW,
  QUERY_PID,
} from '../../../constants/PathsConstant';
import bn from '../../../utils/bemnames';
import DirectorAppointmentCardComponent from './DirectorAppointmentCardComponent';
import CollapseComponent from '../../GeneralForm/CollapseComponent';
import PreviousDirectorAppointmentCardComponent from './PreviousDirectorAppointmentCardComponent';
import numConst from '../../../constants/NumberConstants';
import msgConst from '../../../constants/MessageConstans';
import ErrorBoundary from '../../GeneralForm/ErrorBoundary';

const Card = lazy(() => import('../../GeneralForm/Card'));
const Table = lazy(() => import('../../GeneralForm/Table'));
const D3GanttChart = lazy(() => import('../../GeneralForm/D3GanttChart'));
const bem = bn.create('peopleDirectorAndExecutive');

const DirectorshipAndExecutive = ({
  location,
  person_info,
  director_appointment_info,
  director_appointment_info2,
  textBlur,
  tblCurrentDirector,
  tblPastDirector,
  lstActivistEmployee,
  tblOnBoardActivist,
  ganttChartData,
}) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const [useBlurryText, setUseBlurryText] = useState('');

  useEffect(() => {
    if (textBlur) {
      setUseBlurryText('blurrytext');
    }
  }, [textBlur]);

  if (!query.director_id) {
    return <Redirect to={PEOPLE_SEARCH} />;
  }

  if (
    person_info.length === numConst.EMPTY_TABLE_LENGTH &&
    director_appointment_info.length === numConst.EMPTY_TABLE_LENGTH &&
    director_appointment_info2 === numConst.NUMBER_ZERO
  ) {
    return null;
  }

  const gridOptionCurrentDirector = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'company_name',
        minWidth: 180,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a rel="noopener noreferrer" class="text-secondary" target='_blank' 
                href="${GOVERNANCE_OVERVIEW}${QUERY_PID}${params.data.pid}">
                ${params.data.company_name}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Role',
        field: 'role',
        minWidth: 70,
        maxWidth: 100,
      },
      {
        headerName: 'Tenure',
        field: 'tenure',
        minWidth: 70,
        maxWidth: 100,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: [],
    groupHeaderHeight: 50,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData:
      tblCurrentDirector !== undefined &&
      tblCurrentDirector.map((x) => ({ ...x })),
  };
  const gridOptionPastDirector = {
    colDefsMedalsIncluded: [
      {
        headerName: 'Company',
        field: 'company_name',
        minWidth: 180,
        cellRenderer: (params) => {
          const eDiv = document.createElement('div');
          eDiv.innerHTML = `<a rel="noopener noreferrer" class="text-secondary" 
                href="${GOVERNANCE_OVERVIEW}${QUERY_PID}${params.data.pid}">
                ${params.data.company_name}</a>`;
          return eDiv;
        },
      },
      {
        headerName: 'Role',
        field: 'role',
        minWidth: 70,
      },
      {
        headerName: 'Tenure',
        field: 'tenure',
        minWidth: 70,
      },
    ],
    colDefsMedalsExcluded: [],
    pinColumns: [],
    groupHeaderHeight: 50,
    paggination: { isPagging: false },
    isfloatingFilter: false,
    rowData:
      tblPastDirector !== undefined && tblPastDirector.map((x) => ({ ...x })),
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      const doc = document.getElementById('loadItem');
      const loadedItem = document.createElement('div');
      doc && doc.appendChild(loadedItem);
      loadedItem.setAttribute('id', 'loadedItem');
    }, 1000);
  }, []);

  return (
    <Page key={1}>
      <div className={bem.b('')} id='loadItem'>
        {person_info.length > 0 ? (
          <div className='row my-3'>
            {(person_info[0].age ||
              person_info[0].gender ||
              person_info[0].Ethnicity_name) && (
              <div className='col-sm-12 col-md'>
                <Card title='Profile'>
                  {person_info[0].age ? (
                    <div className='row'>
                      <span className='col customSubHeadersInCards'>Age: </span>
                      <span className={`col-4 ${useBlurryText}`}>
                        {' '}
                        {person_info[0].age}{' '}
                      </span>
                    </div>
                  ) : null}
                  {person_info[0].gender ? (
                    <div className='row'>
                      <span className='col customSubHeadersInCards'>
                        Gender:{' '}
                      </span>
                      <span className={`col-4 ${useBlurryText}`}>
                        {' '}
                        {person_info[0].gender}{' '}
                      </span>
                    </div>
                  ) : null}
                  {person_info[0].Ethnicity_name ? (
                    <div className='row'>
                      <span className='col customSubHeadersInCards'>
                        Ethnicity:{' '}
                      </span>
                      <span className={`col-4 ${useBlurryText}`}>
                        {' '}
                        {person_info[0].Ethnicity_name}
                      </span>
                    </div>
                  ) : null}
                </Card>
              </div>
            )}
            {(person_info[0].number_boards !== null ||
              person_info[0].number_exec !== null) && (
              <div className='col-sm-12 col-md'>
                <Card title='Current Board Roles'>
                  {person_info[0].number_boards !== null && (
                    <div className='row form-inline'>
                      <span className='col customSubHeadersInCards'>
                        # Public Boards:
                      </span>
                      <span className={`col-2 col-xxl-4 ${useBlurryText}`}>
                        {person_info[0].number_boards}
                      </span>
                    </div>
                  )}
                  {/* removed temporarily until we get data in the future */}
                  {/* {person_info[0].number_exec !== null && <div className="row form-inline">
                <span className="col customSubHeadersInCards"># Public Executive Roles:</span>
                <span className={`col-2 col-xxl-4 ${useBlurryText}`}>{person_info[0].number_exec}</span>
              </div>} */}
                </Card>
              </div>
            )}
            {director_appointment_info.length > 0 && (
              <div className='pt-2'>
                <CollapseComponent isOpen={true} Heading='Current Companies'>
                  {director_appointment_info.map((appointment, i) => (
                    <ErrorBoundary>
                      <DirectorAppointmentCardComponent
                        key={`CardComponent${i + 1}`}
                        bio={appointment.bio}
                        director_end_date={appointment.Director_end_date}
                        director_start_date={appointment.Director_since}
                        Current_position={appointment.Current_positions}
                        tenure_and_position={appointment.tenure_and_position}
                        company_logo={appointment.company_logo}
                        company_name={appointment.Company_name}
                        country_image={appointment.country_image}
                        country_name={appointment.country_name}
                        curr_indexes={appointment.curr_indexes}
                        industry_name={appointment.industry_name}
                        industry_sector_name={appointment.industry_sector_name}
                        market_cap_size={appointment.market_cap_size}
                        market_cap_usd={appointment.market_cap_usd}
                        pid={appointment.pid}
                        ceo={appointment.ceo}
                        chair={appointment.chair}
                        activist={appointment.activist}
                        leaddir={appointment.leaddir}
                        pres_dir={appointment.pres_dir}
                        useBlurryText={useBlurryText}
                      />
                    </ErrorBoundary>
                  ))}
                </CollapseComponent>
              </div>
            )}

            {director_appointment_info2.length > 0 && (
              <div className='pt-2'>
                <CollapseComponent isOpen={true} Heading='Previous Companies'>
                  {director_appointment_info2.map((appointment, i) => (
                    <ErrorBoundary key={`ErrorBoundary_Component${i + 1}`}>
                      <PreviousDirectorAppointmentCardComponent
                        key={`component${i + 1}`}
                        Current_position={appointment.Current_positions}
                        tenure_and_position={appointment.tenure_and_position}
                        company_logo={appointment.company_logo}
                        company_name={appointment.Company_name}
                        country_image={appointment.country_image}
                        country_name={appointment.country_name}
                        curr_indexes={appointment.curr_indexes}
                        industry_name={appointment.industry_name}
                        industry_sector_name={appointment.industry_sector_name}
                        market_cap_size={appointment.market_cap_size}
                        market_cap_usd={appointment.market_cap_usd}
                        pid={appointment.pid}
                        useBlurryText={useBlurryText}
                      />
                    </ErrorBoundary>
                  ))}
                </CollapseComponent>
              </div>
            )}
          </div>
        ) : (
          <div className='mt-3 m-1'>{msgConst.NORECORDS}</div>
        )}
      </div>
    </Page>
  );
};

DirectorshipAndExecutive.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(React.memo(DirectorshipAndExecutive));
