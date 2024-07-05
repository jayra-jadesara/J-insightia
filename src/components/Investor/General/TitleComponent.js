import PropTypes from 'prop-types';
import React from 'react';
import '../../../styles/components/_popupTrialUser.scss';
import bn from '../../../utils/bemnames';
import { history } from '../../../utils/navigation-util';
import pathConst from '../../../constants/PathsConstant';

const bem = bn.create('title');

const Title = (props) => {
  const { title } = props;
  const { breadcrumbs } = props;
  const { headers } = props;
  const { mobileHeaders } = props;
  return (
    <div className='px-3'>
      <div className={bem.e('header')}>
        {title && typeof title === 'string' ? <h1 className={bem.e('title')}>{title}</h1> : title}
        {title !== '' && breadcrumbs && (
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <a
                  href={pathConst.DASHBOARD}
                  onClick={(e) => {
                    e.preventDefault();
                    history.replace(pathConst.DASHBOARD);
                  }}
                >
                  Home
                </a>
              </li>
              {breadcrumbs.length &&
                breadcrumbs.map(({ name, active, isLink, url }, index) =>
                  isLink === true ? (
                    <li className='breadcrumb-item active' key={index} active={active} aria-current='page'>
                      <a
                        href={pathConst.DASHBOARD}
                        onClick={(e) => {
                          e.preventDefault();
                          history.replace(url);
                        }}
                      >
                        {name}
                      </a>
                    </li>
                  ) : (
                    <li className='breadcrumb-item active' key={index} active={active} aria-current='page'>
                      {name}
                    </li>
                  )
                )}
            </ol>
          </nav>
        )}
      </div>
      {headers}
      {mobileHeaders}
    </div>
  );
};

Title.propTypes = {
  breadcrumbs: PropTypes.array,
  headers: PropTypes.any.isRequired,
  mobileHeaders: PropTypes.any.isRequired,
  title: PropTypes.string
};

Title.defaultProps = {
  breadcrumbs: [],
  title: ''
};

export default Title;
