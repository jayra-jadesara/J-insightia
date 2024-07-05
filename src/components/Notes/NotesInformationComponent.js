import React from 'react';
import PropTypes from 'prop-types';

// Preset placeholders and style for the notes widget body
const NotesInformation = ({ cardTitle, cardBody }) => (
  <div>
    <div className='row'>
      <div className='col-3 col-md-3 col-lg-3 text-primary font-weight-bold'>{cardTitle}</div>
      <div className='col-9 col-md-9 col-lg-9'>
        <div>{cardBody}</div>
      </div>
    </div>
  </div>
);

NotesInformation.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  cardBody: PropTypes.string.isRequired
};

export default React.memo(NotesInformation);
