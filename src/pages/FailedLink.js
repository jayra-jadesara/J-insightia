import React from 'react';
import { withRouter } from 'react-router-dom';

const FailedLink = () => (
  <div>
    <h5>
      Unfortunately we believe that the link is no longer active. You can get more details by contacting our research
      team at <a href='mailto:insightia.support@diligent.com'>insightia.support@diligent.com</a>. Clicking OK will take you to the link
    </h5>
  </div>
);

export default withRouter(FailedLink);
