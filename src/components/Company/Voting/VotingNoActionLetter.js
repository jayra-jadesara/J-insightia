import React from 'react';
import { Redirect, withRouter } from 'react-router';
import qs from 'qs';
import Page from '../../Page';
import '../../../styles/components/_popupTrialUser.scss';
import messageConst from '../../../constants/MessageConstans';
import NoActionLetterComponent from './Component/NoActionLetterComponent';

const VotingNoActionLetter = (props) => {
  const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  const title = props.issuerCompanyProfile !== undefined ? props.issuerCompanyProfile.Company_name : '';

  React.useEffect(() => {
    if (!props.loadingData) {
      setTimeout(() => {
        const doc = document.getElementById('loadItem');
        const loadedItem = document.createElement('div');
        doc && doc.appendChild(loadedItem);
        loadedItem.setAttribute('id', 'loadedItem');
      }, 1000);
    }
  }, [props.loadingData]);

  return (
    <Page key={1} className='pt-3'>
      {props.loadingData ? (
        messageConst.LOADING
      ) : (
        <>
        <div id='loadItem'>
          <NoActionLetterComponent
            {...props}
            includeCompanyColumn={false}
            includeLawyerColumn={false}
            excelPageTitle={`Voting - No Action Letters: ${title}`}
            cardTitle='Voting - No Action Letters'
            loadingDataNoactionLetters={!props.loadingData}
            TrialStatus={props.TrialUser}
            TrialUserDisableDownload={props.TrialUserDisableDownload}
          />
        </div>
        </>
      )}
    </Page>
  );
};

export default withRouter(React.memo(VotingNoActionLetter));
