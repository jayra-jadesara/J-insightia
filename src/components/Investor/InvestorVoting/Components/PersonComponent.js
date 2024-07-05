import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import useWindowDimensions from '../../../GeneralForm/useWindowDimensions';
import bn from '../../../../utils/bemnames';
import NewsTabConstant from '../../../../constants/NewsTagConstant';
import {
  CONTACT_IMG_PATH,
  INVESTOR_VOTING_PROFILE,
  LINKEDIN_LARGE_IMG,
  QUERY_INVESTOR,
} from '../../../../constants/PathsConstant';

const PersonComponent = ({
  firstname,
  surname,
  job_title,
  email,
  tel,
  city,
  LinkedIn_profile,
  bio,
  picture,
  investor,
  TrialStatus,
  imageExists,
  country_name,
}) => {
  const { width } = useWindowDimensions();
  const bem = bn.create('investorVotingProfile');
  const breakpoint = 768;

  const addDefaultSrc = (ev) => {
    ev.target.src = NewsTabConstant.PROFILE_DEFAULT_IMG_PATH;
  };

  let titleClass = '';
  if (width > breakpoint || (width > breakpoint && imageExists)) {
    titleClass = 'headerTitle col-8 col-md-11';
  } else if ((width < breakpoint && imageExists) || (width < breakpoint && !imageExists)) {
    titleClass = 'headerTitle col-9 col-md-11';
  } else {
    titleClass = 'headerTitle col-8 col-md-11';
  }

  return (
    <div className={bem.b('')}>
      <div
        className={
          TrialStatus
            ? 'row contacts rowSection pdfpagebreakinsideavoid blurrytext'
            : 'row contacts rowSection pdfpagebreakinsideavoid'
        }
      >
        {/* {imageExists && ( */}
        <div
          className={
            width > breakpoint
              ? 'col-4 col-md-2 p-2 m-0 pt-3 text-center'
              : 'col-4 col-md-2 ps-0 pe-0 m-0 pt-3 text-center'
          }
        >
          <img
            // src={`${process.env.PUBLIC_URL}${CONTACT_IMG_PATH}${encodeURIComponent(picture)}`}
            src={`${CONTACT_IMG_PATH}${encodeURIComponent(picture)}`}
            className={width > breakpoint ? 'contacts_img' : 'contacts_mobileImg'}
            onError={addDefaultSrc}
            alt='img'
          />
        </div>
        {/* )} */}
        <div className={imageExists ? 'col-8 col-md-10 p-1 m-0' : 'col-8 col-md-10 p-1 ps-3 m-0'}>
          <div className='row lineHeight_2'>
            <span className={titleClass}>{`${firstname} ${surname}`}</span>
            {LinkedIn_profile !== undefined && LinkedIn_profile !== null && LinkedIn_profile !== '' && (
              <a
                className={width > breakpoint ? 'text-right col-4 col-md-1' : 'text-right col-3 col-md-1'}
                target='_blank'
                rel='noopener noreferrer'
                href={TrialStatus ? `${INVESTOR_VOTING_PROFILE}${QUERY_INVESTOR}${investor}` : LinkedIn_profile}
              >
                <img src={LINKEDIN_LARGE_IMG} className='linkedInImg' alt='linkedInImg' />
              </a>
            )}
          </div>
          <div
            className={width > breakpoint ? 'd-block lineHeight_1_5' : 'd-block lineHeight_1_5 whitespace-break-spaces'}
          >
            <span className='subHeaderTitle'>{job_title}</span>
          </div>
          <div
            className={
              width > breakpoint
                ? 'lineHeight_1_5 row whitespace-break-spaces'
                : 'lineHeight_1_5 row pt-3 whitespace-break-spaces'
            }
          >
            <a
              className='d-block text-secondary wordbreak-break-allANDw-95'
              href={TrialStatus ? `${INVESTOR_VOTING_PROFILE}${QUERY_INVESTOR}${investor}` : `mailto:${email}`}
            >
              {email}
            </a>
            <span className='d-block'>
              {tel !== null && tel !== undefined ? `${tel}      ` : ''}
              {city !== undefined ? city : ''}
            </span>
            <span className='d-block'>{country_name !== undefined ? country_name : ''}</span>
            <span className='' dangerouslySetInnerHTML={{ __html: bio }} />
          </div>
        </div>
      </div>
    </div>
  );
};

PersonComponent.propTypes = {
  // title: PropTypes.string.isRequired,
  // country_name: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  job_title: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  tel: PropTypes.any,
  LinkedIn_profile: PropTypes.any,
  bio: PropTypes.any,
  picture: PropTypes.any,
  investor: PropTypes.any,
  TrialStatus: PropTypes.any,
  imageExists: PropTypes.any,
};

PersonComponent.defaultProps = {
  LinkedIn_profile: undefined,
  tel: undefined,
  bio: undefined,
  picture: undefined,
  investor: undefined,
  TrialStatus: undefined,
  imageExists: undefined,
};

export default withRouter(React.memo(PersonComponent));
