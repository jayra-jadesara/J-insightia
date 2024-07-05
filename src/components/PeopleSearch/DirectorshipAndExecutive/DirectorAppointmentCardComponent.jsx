import React, { lazy } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  ACTIVIST_TAG,
  CEO_TAG,
  CHAIR_TAG,
  COMPANY_LOGO_PATH,
  COMPANY_OVERVIEW,
  FLAG_IMAGE_PATH,
  LEAD_DIRECTOR_TAG,
  PRESIDING_DIRECTOR_TAG,
  QUERY_PID
} from '../../../constants/PathsConstant';
import bn from '../../../utils/bemnames';
import { checkValuesToFixed, numberToCommaString } from '../../../utils/table-tools-util';
import { NUMBER_ONE } from '../../../constants/NumberConstants';
import useWindowDimensions from '../../GeneralForm/useWindowDimensions';

const Card = lazy(() => import('../../GeneralForm/Card'));
const bem = bn.create('peopleDirectorAndExecutive');

const DirectorAppointmentCardComponent = ({
  bio,
  tenure_and_position,
  company_logo,
  company_name,
  country_image,
  country_name,
  curr_indexes,
  industry_name,
  industry_sector_name,
  market_cap_size,
  market_cap_usd,
  pid,
  useBlurryText,
  ceo,
  chair,
  activist,
  leaddir,
  pres_dir
}) => {
  const { width } = useWindowDimensions();
  const breakpoint = 768;
  return (
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
                  <Link className='titleSelection text-secondary' to={`${COMPANY_OVERVIEW}${QUERY_PID}${pid}`}>
                    {company_name}
                  </Link>
                </div>
              </div>

              <div className='row'>
                <div className={width > breakpoint ? 'row my-3 pe-5' : 'row my-3'}>
                  <div className='col-sm-12 col-md-5 my-2'>
                    <div className='row' />
                    {tenure_and_position && (
                      <div className='row'>
                        <span className='col-6 col-md-4 pe-0 customSubHeadersInCards'>Tenure and Position:</span>
                        <span className={`col-6 col-md-8 ps-0 ${useBlurryText}`}>
                          <div style={{ whiteSpace: 'break-spaces' }}>{tenure_and_position.replaceAll('\r', '\n')}</div>
                          {chair === NUMBER_ONE && (
                            <img
                              src={`${window.location.origin}${CHAIR_TAG}`}
                              alt='Chair'
                              title='Chair'
                              className={`w-auto ${useBlurryText}`}
                            />
                          )}
                          {leaddir === NUMBER_ONE && (
                            <img
                              src={`${window.location.origin}${LEAD_DIRECTOR_TAG}`}
                              alt='Lead Director'
                              title='Lead Director'
                              className={`w-auto ${useBlurryText}`}
                            />
                          )}
                          {pres_dir === NUMBER_ONE && (
                            <img
                              src={`${window.location.origin}${PRESIDING_DIRECTOR_TAG}`}
                              alt='Presiding Director'
                              title='Presiding Director'
                              className={`w-auto ${useBlurryText}`}
                            />
                          )}
                          {activist === NUMBER_ONE && (
                            <img
                              src={`${window.location.origin}${ACTIVIST_TAG}`}
                              alt='Activist'
                              title='Activist Nominee'
                              className={`w-auto ${useBlurryText}`}
                            />
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-4 my-2'>
                    {industry_sector_name && (
                      <div className='row'>
                        <span className='col-6 col-md-3 pe-0 customSubHeadersInCards'>Sector:</span>
                        <span className={`col-6 col-md-9 ps-0 ${useBlurryText}`}>{industry_sector_name}</span>
                      </div>
                    )}
                    {industry_name && (
                      <div className='row'>
                        <span className='col-6 col-md-3 pe-0 customSubHeadersInCards'>Industry:</span>
                        <span className={`col-6 col-md-9 ps-0 ${useBlurryText}`}>{industry_name}</span>
                      </div>
                    )}
                  </div>

                  <div className='col-sm-12 col-md-3 my-2'>
                    {(market_cap_usd || market_cap_size) && (
                      <div className='row'>
                        <span className='col-6 col-md-7 pe-0 customSubHeadersInCards'>Market Cap (USD Mn):</span>
                        <span className={`col-6 col-md-5 ps-0 ${useBlurryText}`}>
                          {market_cap_usd ? numberToCommaString(checkValuesToFixed(market_cap_usd, 0)) : null}
                          {market_cap_size && market_cap_usd && `(${market_cap_size})`}
                          {market_cap_size && !market_cap_usd && `${market_cap_size}`}
                        </span>
                      </div>
                    )}

                    {curr_indexes && (
                      <div className='row'>
                        <span className='col-6 col-md-7 pe-0 customSubHeadersInCards'>Index:</span>
                        <span className={`col-6 col-md-5 ps-0 ${useBlurryText}`}>{curr_indexes.toString()}</span>
                      </div>
                    )}

                    <div className='row d-block d-sm-block d-md-none d-lg-none d-xl-none'>
                      {ceo === NUMBER_ONE && (
                        <img
                          src={`${window.location.origin}${CEO_TAG}`}
                          alt='CEO'
                          title='CEO'
                          className={`w-auto ${useBlurryText}`}
                        />
                      )}
                      {chair === NUMBER_ONE && (
                        <img
                          src={`${window.location.origin}${CHAIR_TAG}`}
                          alt='Chair'
                          title='Chair'
                          className={`w-auto ${useBlurryText}`}
                        />
                      )}
                      {leaddir === NUMBER_ONE && (
                        <img
                          src={`${window.location.origin}${LEAD_DIRECTOR_TAG}`}
                          alt='Lead Director'
                          title='Lead Director'
                          className={`w-auto ${useBlurryText}`}
                        />
                      )}
                      {pres_dir === NUMBER_ONE && (
                        <img
                          src={`${window.location.origin}${PRESIDING_DIRECTOR_TAG}`}
                          alt='Presiding Director'
                          title='Presiding Director'
                          className={`w-auto ${useBlurryText}`}
                        />
                      )}
                      {activist === NUMBER_ONE && (
                        <img
                          src={`${window.location.origin}${ACTIVIST_TAG}`}
                          alt='Activist'
                          title='Activist Nominee'
                          className={`w-auto ${useBlurryText}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row my-2'>
            <div className={`col-12 ${useBlurryText}`}>{bio}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(React.memo(DirectorAppointmentCardComponent));
