import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GetToolTip } from '../../utils/general-util';
import { INFO_DOT } from '../../constants/PathsConstant';

const IWidget = ({ tooltipID = null, tooltipOverrideString = null }) => {
  const [tooltip, setTooltip] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchToolTip() {
      setTooltip(await GetToolTip(tooltipID));
      setIsLoading(false);
    }
    if (tooltipOverrideString !== null && tooltipOverrideString !== undefined) {
      setTooltip([{ client_facing_description: tooltipOverrideString }]);
      setIsLoading(false);
    } else {
      fetchToolTip();
    }
  }, [tooltipID, tooltipOverrideString]);

  return isLoading ? null : tooltip.length > 0 ? (
    tooltip[0].client_facing_description !== '' && tooltip[0].client_facing_description !== undefined ? (
      <img
        className='info'
        src={`${window.location.origin}${INFO_DOT}`}
        alt={tooltip[0].client_facing_description}
        title={tooltip[0].client_facing_description}
      />
    ) : null
  ) : null;
};

IWidget.propTypes = {
  tooltipID: PropTypes.number,
  tooltipOverrideString: PropTypes.string
};

IWidget.defaultProps = {
  tooltipID: 0,
  tooltipOverrideString: ''
};

export default React.memo(IWidget);
