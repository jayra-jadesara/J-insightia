import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import bn from '../../utils/bemnames';

const bem = bn.create('magazinesreport');

const MoreInfoComponent = (props) => (
  <div key={props.data.id} className={bem.b('row')}>
    <div className='row newsMain fadeInAnimation newsVisited'>
      <div className='col-12 col-md-7'>
        <p className='d-none d-md-block' dangerouslySetInnerHTML={{ __html: props.data.more_info }} />
      </div>
    </div>
  </div>
);

MoreInfoComponent.propTypes = {
  data: PropTypes.object,
};

MoreInfoComponent.defaultProps = {
  data: {},
};

export default withRouter(MoreInfoComponent);
