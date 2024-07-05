import React from 'react';

export const LOADING = 'Loading...';
export const NORECORDS = 'Records not found.';
export const DOWNLOADXLS = 'Download xls';
export const SUPPORT_TEAM_EMAIL_MSG = (
  <>
    <div>{NORECORDS}</div>
    <div>
      Email the team at{' '}
      <a className='text-secondary' href='mailto:insightia.support@diligent.com'>
      insightia.support@diligent.com
      </a>{' '}
      if you think there should be an item here.
    </div>
  </>
);

export default {
  LOADING,
  NORECORDS,
  DOWNLOADXLS,
  SUPPORT_TEAM_EMAIL_MSG,
};
