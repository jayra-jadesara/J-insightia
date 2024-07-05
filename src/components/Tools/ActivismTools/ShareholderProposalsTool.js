import React from 'react';
import { withRouter } from 'react-router';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import UnderConstruction from '../../../pages/UnderConstruction';

const ShareholderProposalsTool = (props) => (
  <Page {...props} key={1}>
    {' '}
    <UnderConstruction />
  </Page>
);

export default withRouter(React.memo(ShareholderProposalsTool));
