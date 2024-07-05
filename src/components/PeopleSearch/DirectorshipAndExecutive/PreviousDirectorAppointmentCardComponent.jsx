import React, { lazy } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  ACTIVIST_TAG,
  CHAIR_TAG,
  COMPANY_LOGO_PATH,
  COMPANY_OVERVIEW,
  FLAG_IMAGE_PATH,
  LEAD_DIRECTOR_TAG,
  PRESIDING_DIRECTOR_TAG
} from '../../../constants/PathsConstant';
import bn from '../../../utils/bemnames';
import { NUMBER_ONE } from '../../../constants/NumberConstants';

const Card = lazy(() => import('../../GeneralForm/Card'));

const bem = bn.create('peopleDirectorAndExecutive');

const PreviousDirectorAppointmentCardComponent = ({
  tenure_and_position,
  company_logo,
  company_name,
  country_image,
  country_name,
  industry_name,
  industry_sector_name,
  pid,
  useBlurryText,
  chair,
  activist,
  leaddir,
  pres_dir
}) => (
  <div className={bem.b('row py-2')}>
      <div className='mt-2'>
        {country_image && (
          <img
            src={`${FLAG_IMAGE_PATH}${country_image}`}
            alt={`${country_name} flag`}
            className={`flagCircleOnClose ${useBlurryText}`}
            title={country_name}
          />
        )}
      </div>
    <div className='col-12 mt-2'>
      <Card>
        <div className='row py-3'>
          {company_name && company_logo && (
            <div className={`col-md-2 col-lg-1 ${useBlurryText}`}>
              <img
                className='img-fluid'
                src={`${COMPANY_LOGO_PATH}${company_logo}`}
                alt={`${company_name} Logo`}
                onError={(event) => (event.target.style.display = 'none')}
              />
            </div>
          )}
          <div className='col-md-10 col-lg-11'>
            <div className='row'>
              <div className='col-12'>
                <Link className='titleSelection text-secondary' to={`${COMPANY_OVERVIEW}?pid=${pid}`}>
                  {company_name}
                </Link>
              </div>
            </div>

            <div className='row'>
              <div className='row my-3'>
                <div className='col-sm-12 col-md-6'>
                  <div className='row'>
                    {tenure_and_position && (
                      <>
                        <span className='col-6 col-md-4 pe-0 customSubHeadersInCards'>Tenure and Position:</span>
                        <span className={`col-6 col-md-8 ps-0 ${useBlurryText}`}>
                          <div style={{ whiteSpace: 'break-spaces' }}>{tenure_and_position.replaceAll('\r', '\n')}</div>
                          {chair === NUMBER_ONE ? (
                            <img
                              src={`${window.location.origin}${CHAIR_TAG}`}
                              alt='Chair'
                              title='Chair'
                              className={`w-auto ${useBlurryText}`}
                            />
                          ) : null}
                          {leaddir === NUMBER_ONE ? (
                            <img
                              src={`${window.location.origin}${LEAD_DIRECTOR_TAG}`}
                              alt='Lead Director'
                              title='Lead Director'
                              className={`w-auto ${useBlurryText}`}
                            />
                          ) : null}
                          {pres_dir === NUMBER_ONE ? (
                            <img
                              src={`${window.location.origin}${PRESIDING_DIRECTOR_TAG}`}
                              alt='Presiding Director'
                              title='Presiding Director'
                              className={`w-auto ${useBlurryText}`}
                            />
                          ) : null}
                          {activist === NUMBER_ONE ? (
                            <img
                              src={`${window.location.origin}${ACTIVIST_TAG}`}
                              alt='Activist'
                              title='Activist Nominee'
                              className={`w-auto ${useBlurryText}`}
                            />
                          ) : null}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className='col-sm-12 col-md-6 my-2'>
                  <div className='row'>
                    {industry_sector_name && (
                      <>
                        <span className='col-6 col-md-3 pe-0 customSubHeadersInCards'>Sector:</span>
                        <span className={`col-6 col-md-9 ps-0 ${useBlurryText}`}>{industry_sector_name}</span>
                      </>
                    )}
                  </div>
                  <div className='row'>
                    {industry_name && (
                      <>
                        <span className='col-6 col-md-3 pe-0 customSubHeadersInCards'>Industry Name:</span>
                        <span className={`col-6 col-md-9 ps-0 ${useBlurryText}`}>{industry_name}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default withRouter(React.memo(PreviousDirectorAppointmentCardComponent));
