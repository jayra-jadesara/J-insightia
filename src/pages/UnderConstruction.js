import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/components/_underconstruction.scss';

import { LINK_LABEL } from '../constants/NotFoundPageConstant';
import bn from '../utils/bemnames';
import { DASHBOARD } from '../constants/PathsConstant';

const bem = bn.create('underconstruction');

const UnderConstruction = () => (
  <div className={bem.b('')}>
    <div className='col-xs-12 col-sm-12 col-lg-12'>
      <div className='constructionCard'>
        <div className='text-center mx-auto text-sm-center text-md-center text-lg-center text-xl-center'>
          <h1 className='heroText'>UNDER CONSTRUCTION</h1>
          <div className='p'>
            <p>Hello! We&rsquo;re currently building this section. Please come back later.</p>
            <p className='psub'>&mdash; The React Team</p>
            <Link className='text-secondary' to={DASHBOARD}>
              {LINK_LABEL}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(UnderConstruction);
